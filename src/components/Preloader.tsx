import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { personal } from '../data/personal'

type PreloaderProps = {
  onFinish: () => void
}

const SAFETY_TIMEOUT = 4000
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Preloader({ onFinish }: PreloaderProps) {
  const [progress, setProgress] = useState(() => (prefersReducedMotion() ? 100 : 0))
  const [done, setDone] = useState(prefersReducedMotion)
  const [scrambledName, setScrambledName] = useState(personal.name.toUpperCase())
  const progressRef = useRef(progress)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const timer = window.setInterval(() => {
      setProgress((value) => {
        const next = Math.min(value + Math.random() * 18 + 6, 100)
        progressRef.current = next
        return next
      })
      setScrambledName((current) => current.split('').map((character, index) => {
        if (index < Math.floor((progressRef.current / 100) * current.length)) return personal.name.toUpperCase()[index] ?? character
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }).join(''))
    }, 110)

    const safety = window.setTimeout(() => {
      window.clearInterval(timer)
      setProgress(100)
    }, SAFETY_TIMEOUT)

    return () => {
      window.clearInterval(timer)
      window.clearTimeout(safety)
    }
  }, [])

  useEffect(() => {
    if (progress >= 100 && !done) {
      const timeout = window.setTimeout(() => setDone(true), 300)
      return () => window.clearTimeout(timeout)
    }
  }, [progress, done])

  const rounded = Math.round(progress)

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-bg"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-display text-xl font-medium tracking-tight text-fg sm:text-2xl">
              {scrambledName}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">{personal.role}</span>
          </div>

          <div className="relative mt-8 h-20 overflow-hidden">
            <motion.span
              key={rounded}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display block text-6xl font-semibold tabular-nums tracking-tight text-fg sm:text-7xl"
            >
              {rounded}
            </motion.span>
          </div>

          <div className="mt-2 h-px w-48 bg-line">
            <motion.div className="h-px bg-accent" style={{ width: `${rounded}%` }} transition={{ ease: 'linear' }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
