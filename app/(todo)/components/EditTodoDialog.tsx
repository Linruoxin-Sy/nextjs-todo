'use client';

import { useTransition, type FormEvent } from 'react';
import { toast } from 'sonner';

import { updateTodo } from '@/app/(todo)/actions';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import type { Todo } from '@/drizzle/schemas';

/**
 * 编辑 todo 标题的弹窗内容。
 *
 * Dialog Root / Trigger 由 TodoItem 持有（受控），本组件必须渲染在 <Dialog> 内部：
 * DialogContent 通过 context 读取 open 状态，并自带 Portal / Overlay / 关闭按钮。
 *
 * Input 使用非受控 defaultValue：base-ui 关闭时会卸载 popup 内容，
 * 每次打开都会重新挂载，因此不需要手动 reset。
 */
export default function EditTodoDialog({
  todo,
  onClose,
}: {
  todo: Todo;
  onClose: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // 在进入 transition 前同步读取表单值
    const title =
      new FormData(event.currentTarget).get('title')?.toString().trim() ?? '';

    // 空标题由 required 兜底；没改动就直接关闭
    if (!title || title === todo.title) {
      onClose();
      return;
    }

    startTransition(async () => {
      try {
        await updateTodo(todo.id, { title });
        onClose();
        toast.success('Todo updated');
      } catch {
        toast.error('Failed to update todo');
      }
    });
  }

  return (
    <DialogContent>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>Update the title of this todo.</DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor={`todo-edit-title-${todo.id}`}>
              Title
            </FieldLabel>
            <Input
              id={`todo-edit-title-${todo.id}`}
              name="title"
              defaultValue={todo.title}
              required
              autoComplete="off"
              disabled={isPending}
            />
          </Field>
        </FieldGroup>

        <DialogFooter>
          <DialogClose render={<Button variant="outline" type="button" />}>
            Cancel
          </DialogClose>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
