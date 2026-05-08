import type { CSSProperties, ReactNode } from 'react';

interface MotionFadeUpProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly as?: 'div' | 'section' | 'header' | 'footer' | 'article';
}

export function MotionFadeUp({ children, className, delay = 0, as: Tag = 'div' }: MotionFadeUpProps) {
  const style = delay
    ? ({ '--fade-up-delay': `${delay}s` } as CSSProperties)
    : undefined;
  const classes = className ? `animate-fade-up ${className}` : 'animate-fade-up';

  return (
    <Tag className={classes} style={style}>
      {children}
    </Tag>
  );
}
