'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath, unstable_cache, updateTag } from 'next/cache';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { db } from '@/drizzle';
import { todos, type Todo } from '@/drizzle/schemas';

/** todo 列表缓存的 tag：任意写操作后统一失效 */
const TODOS_CACHE_TAG = 'todos';

async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * 缓存 todo 查询（Next Data Cache）。
 *
 * - `headers()` 必须在缓存作用域外读取，只把 userId 当作参数传进来
 *   （缓存函数内部不允许读 headers/cookies）；keyParts 带 userId 也避免
 *   不同用户共用同一个缓存条目。
 * - 不设 revalidate TTL：失效完全交给写操作的 updateTag，避免出现
 *   “过期后先返回旧值” 的窗口。
 */
const getCachedTodos = unstable_cache(
  async (userId: string) =>
    db.select().from(todos).where(eq(todos.userId, userId)),
  ['todos'],
  { tags: [TODOS_CACHE_TAG] },
);

export async function getTodos(): Promise<Todo[]> {
  const session = await getSession();

  if (!session) return [];

  const rows = await getCachedTodos(session.user.id);

  // 缓存命中时 Date 会被序列化成 string（未命中时还是 Date），
  // 这里统一还原，保证返回类型在运行时也是诚实的。
  return rows.map((row) => ({
    ...row,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  }));
}

/**
 * 写操作后失效缓存。
 *
 * - `updateTag` 只能在 Server Action 里用，且会让下一次读取直接等待新数据
 *   （读己之写），适合 todo 这种“改完必须立刻看到”的场景；
 *   换成 `revalidateTag(tag, 'max')` 则是 stale-while-revalidate，会先返回旧值。
 * - `revalidatePath` 负责刷掉 `/` 的客户端路由缓存。
 */
function revalidateTodos() {
  updateTag(TODOS_CACHE_TAG);
  revalidatePath('/');
}

export async function createTodo(formData: FormData) {
  const title = formData.get('title')?.toString().trim() ?? '';

  if (!title) return;

  const session = await getSession();

  if (!session) return;

  await db.insert(todos).values({ title, userId: session.user.id });

  revalidateTodos();
}

export async function updateTodo(
  id: string,
  values: { title?: string; completed?: boolean },
) {
  const session = await getSession();

  if (!session) return;

  const { title, completed } = values;

  // 显式传了 title 但为空 → 不写库
  if (title !== undefined && !title.trim()) return;

  await db
    .update(todos)
    .set({
      ...(title !== undefined ? { title: title.trim() } : {}),
      ...(completed !== undefined ? { completed } : {}),
      updatedAt: new Date(),
    })
    .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)));

  revalidateTodos();
}

export async function deleteTodo(id: string) {
  const session = await getSession();

  if (!session) return;

  await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)));

  revalidateTodos();
}
