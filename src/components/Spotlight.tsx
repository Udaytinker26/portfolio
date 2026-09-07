import { useEffect, useRef, type ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type SpotlightProps = {
  children: ReactNode
  className?: string
}

export default function Spotlight({ children, className = '' }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const element = ref.current
    if (!element) return
    const onMove = (event: PointerEvent) => {
      element.style.setProperty('--spotlight-x', `${event.clientX}px`)
      element.style.setProperty('--spotlight-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  return <div ref={ref} className={`spotlight ${className}`}>{children}</div>
}
