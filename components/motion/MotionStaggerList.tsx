import type { CSSProperties, ReactNode } from 'react';

interface MotionStaggerListProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function MotionStaggerList({ children, className }: MotionStaggerListProps) {
  const classes = className ? `animate-stagger ${className}` : 'animate-stagger';
  return <ul className={classes}>{children}</ul>;
}

interface MotionStaggerItemProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly index?: number;
}

export function MotionStaggerItem({ children, className, index = 0 }: MotionStaggerItemProps) {
  const style = { '--stagger-index': index } as CSSProperties;
  return (
    <li className={className} style={style}>
      {children}
    </li>
  );
}
