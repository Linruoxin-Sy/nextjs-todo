'use client';

import { authClient } from '@/lib/auth-client';

type AppSignInProps = {
  children: React.ReactNode;
};

export function AppSignIn({ children }: AppSignInProps) {
  const { data: session } = authClient.useSession();

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

export default AppSignIn;
