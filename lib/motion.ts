import type { Transition, Variants } from 'framer-motion';

export const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1];

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.85, y: 8, transition: { duration: 0.15, ease: EASE_OUT } },
};
