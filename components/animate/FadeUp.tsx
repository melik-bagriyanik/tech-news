import type { CSSProperties, ReactNode } from 'react';

interface FadeUpProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly as?: 'div' | 'section' | 'header' | 'footer' | 'article';
}

export function FadeUp({ children, className, delay = 0, as: Tag = 'div' }: FadeUpProps) {
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
