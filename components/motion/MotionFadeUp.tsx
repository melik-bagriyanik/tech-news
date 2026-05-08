'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';

interface MotionFadeUpProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly as?: 'div' | 'section' | 'header' | 'footer' | 'article';
}

export function MotionFadeUp({ children, className, delay = 0, as = 'div' }: MotionFadeUpProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
