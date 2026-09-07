import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsTouchDevice } from '../hooks/useMediaQuery'
import { useReducedMotion } from '../hooks/useReducedMotion'

type CursorVariant = 'default' | 'link' | 'project' | 'image' | 'cta' | 'talk' | 'cv' | 'external'

const LABELS: Record<Exclude<CursorVariant, 'default' | 'link'>, string[]> = {
  project: ['VIEW', 'PROJECT →'],
  image: ['EXPLORE'],
  cta: ['OPEN →'],
  talk: ["LET'S", 'TALK'],
  cv: ['OPEN', 'CV'],
  external: ['OPEN ↗'],
}


export default function CustomCursor() {
  const isTouch = useIsTouchDevice()
  const reducedMotion = useReducedMotion()
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [visible, setVisible] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const dotX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.2 })

  const trailX1 = useSpring(x, { stiffness: 700, damping: 42, mass: 0.35 })
  const trailY1 = useSpring(y, { stiffness: 700, damping: 42, mass: 0.35 })
  const trailX2 = useSpring(x, { stiffness: 420, damping: 42, mass: 0.45 })
  const trailY2 = useSpring(y, { stiffness: 420, damping: 42, mass: 0.45 })
  const trailX3 = useSpring(x, { stiffness: 260, damping: 40, mass: 0.55 })
  const trailY3 = useSpring(y, { stiffness: 260, damping: 40, mass: 0.55 })
  const trailX4 = useSpring(x, { stiffness: 160, damping: 38, mass: 0.65 })
  const trailY4 = useSpring(y, { stiffness: 160, damping: 38, mass: 0.65 })

  const trail = [
    { x: trailX1, y: trailY1 },
    { x: trailX2, y: trailY2 },
    { x: trailX3, y: trailY3 },
    { x: trailX4, y: trailY4 },
  ]

  const disabled = isTouch || reducedMotion

  useEffect(() => {
    if (disabled) return
    document.documentElement.classList.add('has-custom-cursor')
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [disabled])

  useEffect(() => {
    if (disabled) return

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visible) setVisible(true)
    }
    const onOver = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest?.('[data-cursor]') as HTMLElement | null
      const kind = target?.getAttribute('data-cursor') as CursorVariant | null
      setVariant(kind ?? 'default')
    }
    const onLeaveWindow = () => setVisible(false)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', onLeaveWindow)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseleave', onLeaveWindow)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [disabled, visible, x, y])

  if (disabled) return null

  const isLabeled =
    variant === 'project' ||
    variant === 'image' ||
    variant === 'cta' ||
    variant === 'talk' ||
    variant === 'cv' ||
    variant === 'external'
  const isLink = variant === 'link'

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[995] h-24 w-24 rounded-full bg-accent/10 blur-2xl"
        style={{ x: trailX4, y: trailY4, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 0.8 : 0, scale: pressed ? 0.8 : 1 }}
      />
      {trail.map((point, index) => (
        <motion.div
          key={index}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[996] rounded-full bg-accent"
          style={{
            x: point.x,
            y: point.y,
            translateX: '-50%',
            translateY: '-50%',
            width: 5 - index * 0.7,
            height: 5 - index * 0.7,
            opacity: visible && !isLabeled ? 0.22 - index * 0.045 : 0,
          }}
        />
      ))}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full bg-fg"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          opacity: visible && !isLabeled ? 1 : 0,
        }}
        animate={{ scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[998] flex items-center justify-center rounded-full border border-fg/70 text-center font-mono uppercase leading-tight text-fg"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isLabeled ? 92 : isLink ? 56 : 30,
          height: isLabeled ? 92 : isLink ? 56 : 30,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.88 : 1,
          backgroundColor: isLabeled ? 'rgba(111,140,255,0.12)' : 'rgba(0,0,0,0)',
          borderColor: isLabeled ? 'var(--color-accent)' : 'rgba(244,243,239,0.7)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {isLabeled && (
          <span className="flex flex-col gap-0.5 text-[9px] tracking-[0.1em]">
            {LABELS[variant].map((line) => (
              <span key={line}>{line}</span>
            ))}
          </span>
        )}
      </motion.div>
    </>
  )
}
