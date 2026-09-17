import AddTodo from '@/app/(todo)/components/AddTodo';
import TodoList from '@/app/(todo)/components/TodoList';

export default function Page() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}
