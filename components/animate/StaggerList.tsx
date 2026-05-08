import type { CSSProperties, ReactNode } from 'react';

interface StaggerListProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function StaggerList({ children, className }: StaggerListProps) {
  const classes = className ? `animate-stagger ${className}` : 'animate-stagger';
  return <ul className={classes}>{children}</ul>;
}

interface StaggerItemProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly index?: number;
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  const style = { '--stagger-index': index } as CSSProperties;
  return (
    <li className={className} style={style}>
      {children}
    </li>
  );
}
