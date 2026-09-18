'use client';

import StaggeredMenu from '@/app/(infrastructure)/components/StaggeredMenu';

const menuItems = [{ label: 'Home', ariaLabel: 'Go to home page', link: '/' }];

export default function AppMenu() {
  return (
    // 必须给容器一个"确定"的宽度（inset-0 => left/right 都为 0）。
    // 只写 left-0 时，fixed + width:auto 会 shrink-to-fit，而内部全是 absolute 子元素，
    // 于是容器宽度算成 0；StaggeredMenu 在 ≤1024px 用 width:100% 的面板就会塌成 0 宽。
    <div className="fixed top-0 left-0 h-dvh w-full md:w-80 lg:w-120">
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
