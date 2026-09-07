import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { personal } from '../data/personal'
import { useScrollProgress } from '../hooks/useScrollProgress'
import Magnetic from './Magnetic'

const NAV_ITEMS = [
  { id: 'work', label: 'WORK' },
  { id: 'about', label: 'ABOUT' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Navbar() {
  const { scrolled } = useScrollProgress()
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const ids = ['hero', ...NAV_ITEMS.map((item) => item.id)]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <button
            data-cursor="link"
            onClick={() => scrollTo('hero')}
            className="font-display text-sm font-semibold uppercase tracking-[0.08em] text-fg"
            aria-label="Back to top"
          >
            {personal.name}
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                data-cursor="link"
                onClick={() => scrollTo(item.id)}
                className="group relative font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
              >
                <span className={active === item.id ? 'text-fg' : ''}>{item.label}</span>
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                    active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic className="hidden md:block">
              <a
                data-cursor="cv"
                href={personal.resumeUrl}
                download
                className="underline-grow font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
              >
                CV ↗
              </a>
            </Magnetic>

            <button
              className="relative z-[60] flex h-9 w-9 items-center justify-center text-fg md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              data-cursor="link"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              exit={{ clipPath: 'inset(0 0 100% 0)' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <nav className="flex flex-col gap-2" aria-label="Mobile">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="flex items-center gap-4 border-b border-line py-4 text-left"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * index + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-mono text-xs text-muted">0{index + 1}</span>
                    <span className="font-display text-3xl uppercase tracking-tight text-fg">{item.label}</span>
                  </motion.button>
                ))}
                <motion.a
                  href={personal.resumeUrl}
                  download
                  className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-accent"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * NAV_ITEMS.length + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Download Resume <ArrowUpRight size={14} />
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
