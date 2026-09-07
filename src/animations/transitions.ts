import type { Transition } from 'framer-motion'

export const easeOut: Transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
export const easeOutFast: Transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
export const spring: Transition = { type: 'spring', stiffness: 260, damping: 28, mass: 0.6 }
export const springSoft: Transition = { type: 'spring', stiffness: 120, damping: 18, mass: 0.7 }
export const cursorSpring: Transition = { type: 'spring', stiffness: 500, damping: 40, mass: 0.4 }
