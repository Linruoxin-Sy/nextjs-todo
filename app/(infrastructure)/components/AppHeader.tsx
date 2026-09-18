'use client';

import AppSignIn from '@/app/(auth)/components/AppSignIn';
import AppMenu from '@/app/(infrastructure)/components/AppMenu';
import AppTitle from '@/app/(infrastructure)/components/AppTitle';
import { UserButton } from '@/components/auth/user/user-button';

export default function AppHeader() {
  return (
    <header className="flex items-center justify-between">
      <AppSignIn>
        <AppMenu />
      </AppSignIn>
      <AppTitle />
      <AppSignIn>
        <div className="fixed top-0 right-0 z-50 m-2">
          <UserButton className="w-14 md:w-fit" />
        </div>
      </AppSignIn>
    </header>
  );
}
