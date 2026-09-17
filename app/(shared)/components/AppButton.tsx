'use client';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useFormStatus } from 'react-dom';
import type { ComponentProps } from 'react';

type AppButtonProps = ComponentProps<typeof Button>;

export function AppButton(props: AppButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} disabled={pending || props.disabled}>
      {pending ? <Spinner /> : (props.children ?? 'Add')}
    </Button>
  );
}
