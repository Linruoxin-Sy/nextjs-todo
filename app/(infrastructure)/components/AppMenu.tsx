'use client';

import StaggeredMenu from '@/app/(infrastructure)/components/StaggeredMenu';

const menuItems = [{ label: 'Home', ariaLabel: 'Go to home page', link: '/' }];

export default function AppMenu() {
  return (
    <div className="fixed top-0 left-0 h-dvh">
      <StaggeredMenu
        position="left"
        items={menuItems}
        displayItemNumbering={true}
        menuButtonColor="var(--foreground)"
        openMenuButtonColor="var(--foreground)"
        changeMenuColorOnOpen={true}
        colors={['#B497CF', '#5227FF']}
        accentColor="#5227FF"
      />
    </div>
  );
}
