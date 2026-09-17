'use server';

import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { db } from '@/drizzle';
import { todos } from '@/drizzle/schemas';

async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function getTodos() {
  const session = await getSession();

  if (!session) return [];

  return await db.select().from(todos).where(eq(todos.userId, session.user.id));
}

export async function createTodo(formData: FormData) {
  const title = formData.get('title')?.toString().trim() ?? '';

  if (!title) return;

  const session = await getSession();

  if (!session) return;

  await db.insert(todos).values({ title, userId: session.user.id });

  revalidatePath('/');
}

export async function updateTodo(
  id: string,
  values: { title?: string; completed?: boolean },
) {
  const session = await getSession();

  if (!session) return;

  await db
    .update(todos)
    .set({ ...values, updatedAt: new Date() })
    .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)));

  revalidatePath('/');
}

export async function deleteTodo(id: string) {
  const session = await getSession();

  if (!session) return;

  await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, session.user.id)));

  revalidatePath('/');
}
