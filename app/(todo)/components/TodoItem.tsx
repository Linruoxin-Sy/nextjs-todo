'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { AppButton } from '@/app/(shared)/components/AppButton';
import { deleteTodo, updateTodo } from '@/app/(todo)/actions';
import { Spinner } from '@/components/ui/spinner';
import type { Todo } from '@/drizzle/schemas';

export default function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      try {
        await updateTodo(todo.id, { completed: !todo.completed });
      } catch {
        toast.error('Failed to update the todo. Please try again.');
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteTodo(todo.id);
      } catch {
        toast.error('Failed to delete the todo. Please try again.');
      }
    });
  }

  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3">
      <span
        className={
          todo.completed
            ? 'text-muted-foreground line-through'
            : 'text-card-foreground'
        }
      >
        {todo.title}
      </span>

      <div className="flex shrink-0 items-center gap-2">
        <AppButton
          variant={todo.completed ? 'secondary' : 'default'}
          size="sm"
          disabled={isPending}
          onClick={handleToggle}
        >
          {isPending ? <Spinner /> : todo.completed ? 'Undo' : 'Done'}
        </AppButton>

        <AppButton
          variant="destructive"
          size="sm"
          disabled={isPending}
          onClick={handleDelete}
        >
          {isPending ? <Spinner /> : 'Delete'}
        </AppButton>
      </div>
    </li>
  );
}
