import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Node = { x: number; y: number; vx: number; vy: number; r: number }

const NODE_COUNT = 46
const LINK_DIST = 130
const CURSOR_RADIUS = 160

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frame = 0

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim() || '#6f8cff'

    const seed = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = width < 480 ? Math.round(NODE_COUNT * 0.55) : NODE_COUNT
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.8,
      }))
    }

    const onMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(244, 243, 239, ${0.08 * (1 - dist / LINK_DIST)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      nodes.forEach((node) => {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(244, 243, 239, 0.5)'
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      const mouse = mouseRef.current

      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        const dx = node.x - mouse.x
        const dy = node.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < CURSOR_RADIUS) {
          const force = (1 - dist / CURSOR_RADIUS) * 0.5
          node.x += (dx / (dist || 1)) * force
          node.y += (dy / (dist || 1)) * force
        }
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DIST) {
            const nearCursor = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y) < CURSOR_RADIUS
            ctx.strokeStyle = nearCursor
              ? `${accent}${Math.round((1 - dist / LINK_DIST) * 90 + 40).toString(16).padStart(2, '0')}`
              : `rgba(244, 243, 239, ${0.09 * (1 - dist / LINK_DIST)})`
            ctx.lineWidth = nearCursor ? 1.1 : 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      nodes.forEach((node) => {
        const dist = Math.hypot(node.x - mouse.x, node.y - mouse.y)
        const near = dist < CURSOR_RADIUS
        ctx.beginPath()
        ctx.fillStyle = near ? accent : 'rgba(244, 243, 239, 0.55)'
        ctx.arc(node.x, node.y, near ? node.r + 0.6 : node.r, 0, Math.PI * 2)
        ctx.fill()
      })

      frame = requestAnimationFrame(tick)
    }

    seed()
    window.addEventListener('resize', seed)
    window.addEventListener('mousemove', onMove, { passive: true })
    container.addEventListener('mouseleave', onLeave)

    if (reducedMotion) {
      drawStatic()
    } else {
      frame = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', seed)
      window.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion])

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
    </div>
  )
}
