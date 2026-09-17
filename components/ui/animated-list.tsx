'use client';

import React, { type ComponentPropsWithoutRef } from 'react';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

export interface AnimatedListItemProps {
  children: React.ReactNode;
  /** 该子项入场动画的延迟（秒） */
  delay?: number;
}

export function AnimatedListItem({
  children,
  delay = 0,
}: AnimatedListItemProps) {
  const animations: MotionProps = {
    initial: { opacity: 0, y: 8, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15 } },
    transition: { type: 'spring', stiffness: 350, damping: 40, delay },
  };

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  /** 相邻子项入场动画之间的错开间隔（毫秒），默认 100 */
  delay?: number;
}

/** 交错延迟的最大步数，避免超长列表末尾等待过久 */
const MAX_STAGGER_STEPS = 10;

export const AnimatedList = React.memo(
  ({ children, className, delay = 100, ...props }: AnimatedListProps) => {
    const childrenArray = React.Children.toArray(children);
    const step = Math.max(delay, 0) / 1000; // 毫秒 -> 秒

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence>
          {childrenArray.map((item, index) => (
            <AnimatedListItem
              key={(item as React.ReactElement).key}
              delay={Math.min(index, MAX_STAGGER_STEPS) * step}
            >
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = 'AnimatedList';
