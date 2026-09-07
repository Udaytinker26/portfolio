import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'

type CounterProps = {
  value: number
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export default function Counter({ value, suffix = '', decimals = 0, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const progress = useMotionValue(0)
  const spring = useSpring(progress, { stiffness: 90, damping: 18, mass: 0.45 })
  const displayValue = useTransform(spring, (current) => current * value)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    progress.set(value)
  }, [inView, progress, value])

  useEffect(() => displayValue.on('change', setDisplay), [displayValue])

  return (
    <motion.span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  )
}
