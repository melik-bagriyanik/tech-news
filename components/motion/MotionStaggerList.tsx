'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/motion';

interface MotionStaggerListProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function MotionStaggerList({ children, className }: MotionStaggerListProps) {
  return (
    <motion.ul className={className} variants={staggerContainer} initial="hidden" animate="visible">
      {children}
    </motion.ul>
  );
}

interface MotionStaggerItemProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function MotionStaggerItem({ children, className }: MotionStaggerItemProps) {
  return (
    <motion.li className={className} variants={staggerItem}>
      {children}
    </motion.li>
  );
}
