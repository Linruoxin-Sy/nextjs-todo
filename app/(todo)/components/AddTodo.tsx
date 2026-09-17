import { AppButton } from '@/app/(shared)/components/AppButton';
import { createTodo } from '@/app/(todo)/actions';
import { Input } from '@/components/ui/input';

export default function AddTodo() {
  return (
    <form action={createTodo} className="flex gap-2">
      <Input
        type="text"
        name="title"
        required
        autoComplete="off"
        placeholder="Write your todo here..."
      />
      <AppButton type="submit">Add</AppButton>
    </form>
  );
}
