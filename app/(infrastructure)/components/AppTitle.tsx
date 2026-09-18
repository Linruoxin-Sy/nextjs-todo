'use client';

import { TextAnimate } from '@/components/ui/text-animate';

export default function AppTitle() {
  return (
    <>
      {/* Height placeholder so fixed title does not overlap following content */}
      <div
        aria-hidden="true"
        className="invisible text-center text-2xl md:text-3xl lg:text-5xl py-2"
      >
        <span className="inline-block px-8 py-2">TODOS</span>
      </div>
      <h1 className="fixed top-0 left-0 right-0 z-50 text-center text-2xl md:text-3xl lg:text-5xl py-2 pointer-events-none">
        <span className="inline-block px-8 py-2 text-foreground backdrop-blur-md bg-background/30 border border-border shadow-lg rounded-xl pointer-events-auto">
          <TextAnimate animation="blurInUp" by="character" once>
            TODOS
          </TextAnimate>
        </span>
      </h1>
    </>
  );
}
