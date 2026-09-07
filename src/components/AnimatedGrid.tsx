import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function AnimatedGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    const element = ref.current
    if (!element) return
    const onMove = (event: PointerEvent) => {
      element.style.setProperty('--grid-x', `${event.clientX}px`)
      element.style.setProperty('--grid-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  return <div ref={ref} className="animated-grid" aria-hidden="true" />
}
