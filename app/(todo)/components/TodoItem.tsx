'use client';

import { useState } from 'react';

import { AppButton } from '@/app/(shared)/components/AppButton';
import { deleteTodo, updateTodo } from '@/app/(todo)/actions';
import EditTodoDialog from '@/app/(todo)/components/EditTodoDialog';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import type { Todo } from '@/drizzle/schemas';

export default function TodoItem({ todo }: { todo: Todo }) {
  const [open, setOpen] = useState(false);
  const titleId = `todo-title-${todo.id}`;

  return (
    <li className="relative flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
      <Dialog open={open} onOpenChange={setOpen}>
        {/* 透明覆盖层按钮：铺满整个 item，让整行都可点击打开弹窗 */}
        <DialogTrigger
          aria-labelledby={titleId}
          className="absolute inset-0 cursor-pointer rounded-lg transition-colors hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        />

        <EditTodoDialog todo={todo} onClose={() => setOpen(false)} />
      </Dialog>

      {/* 标题：pointer-events-none 让点击穿透到覆盖层按钮 */}
      <span
        id={titleId}
        className={`pointer-events-none relative min-w-0 flex-1 truncate ${
          todo.completed
            ? 'text-muted-foreground line-through'
            : 'text-card-foreground'
        }`}
      >
        {todo.title}
      </span>

      {/* 操作按钮：z-10 位于覆盖层之上，点击不会触发弹窗 */}
      <div className="relative z-10 flex shrink-0 items-center gap-2">
        <form
          action={updateTodo.bind(null, todo.id, {
            completed: !todo.completed,
          })}
        >
          <AppButton
            type="submit"
            variant={todo.completed ? 'secondary' : 'default'}
            size="sm"
          >
            {todo.completed ? 'Undo' : 'Done'}
          </AppButton>
        </form>

        <form action={deleteTodo.bind(null, todo.id)}>
          <AppButton type="submit" variant="destructive" size="sm">
            Delete
          </AppButton>
        </form>
      </div>
    </li>
  );
}
