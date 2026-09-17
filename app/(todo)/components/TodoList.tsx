import { getTodos } from '@/app/(todo)/actions';
import TodoItem from '@/app/(todo)/components/TodoItem';
import { AnimatedList } from '@/components/ui/animated-list';

export default async function TodoList() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return (
      <p className="text-muted-foreground mt-4 text-sm">
        No todos yet. Add one above to get started.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      <AnimatedList delay={100}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatedList>
    </ul>
  );
}
