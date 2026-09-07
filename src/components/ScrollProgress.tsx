import { motion, useScroll, useSpring } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SECTION_COUNT = 6

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 })
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useReducedMotion()

  if (!isDesktop || reducedMotion) return null

  return (
    <div
      aria-hidden="true"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <span className="font-mono text-[9px] text-muted/50">01</span>
      <div className="relative h-40 w-px bg-line">
        <motion.div className="absolute inset-x-0 top-0 w-px origin-top bg-accent" style={{ scaleY, height: '100%' }} />
      </div>
      <span className="font-mono text-[9px] text-muted/50">0{SECTION_COUNT}</span>
    </div>
  )
}
