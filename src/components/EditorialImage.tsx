import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

type EditorialImageProps = {
  src?: string
  alt: string
  fallback: ReactNode
  overlay?: ReactNode
  className?: string
  interactive?: boolean
  cursor?: 'image' | 'project' | 'link'
  rounded?: boolean
  gradient?: boolean
}

export default function EditorialImage({
  src,
  alt,
  fallback,
  overlay,
  className = '',
  interactive = false,
  cursor = 'image',
  rounded = true,
  gradient = false,
}: EditorialImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Observed on the unclipped wrapper: the reveal itself uses clip-path on an
  // inner layer, and an element's own clip-path zeroes its rendered area, which
  // would make IntersectionObserver report it as permanently non-intersecting.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.5 })

  const showImage = Boolean(src) && !errored

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!interactive || reducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 20)
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 20)
  }
  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor={cursor}
      className={`relative overflow-hidden border border-line bg-bg-raised ${rounded ? 'rounded-lg' : ''} ${className}`}
    >
      <motion.div
        initial={false}
        animate={{ clipPath: inView || reducedMotion ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{ opacity: showImage && loaded ? 0 : 1 }}
        >
          {fallback}
        </div>

        {showImage && (
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            style={interactive && !reducedMotion ? { x: springX, y: springY, scale: 1.08 } : undefined}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.04]"
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {gradient && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-70" />
        )}
      </motion.div>

      {overlay && <div className="pointer-events-none absolute inset-0">{overlay}</div>}
    </div>
  )
}
