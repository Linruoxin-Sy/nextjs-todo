import { AppButton } from '@/app/(shared)/components/AppButton';
import { deleteTodo, updateTodo } from '@/app/(todo)/actions';
import type { Todo } from '@/drizzle/schemas';

export default function TodoItem({ todo }: { todo: Todo }) {
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
