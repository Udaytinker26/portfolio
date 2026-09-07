import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'
import { images } from '../data/images'
import ArchitectureVisual from './ArchitectureVisual'
import EditorialImage from './EditorialImage'

type ProjectModalProps = {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.documentElement.style.overflow = ''
    }
  }, [project, onClose])

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/80 p-3 backdrop-blur-sm sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            className="h-full w-full max-w-5xl overflow-y-auto border border-line bg-bg px-6 py-12 sm:px-12 sm:py-20 lg:px-20"
            initial={{ clipPath: 'inset(6% 6% 94% 6% round 4px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 4px)', opacity: 1 }}
            exit={{ clipPath: 'inset(6% 6% 94% 6% round 4px)', opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{project.category}</span>
                <h2
                  className="font-display mt-4 font-semibold uppercase leading-[0.95] tracking-tight text-fg"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
                >
                  {project.title}
                </h2>
                {project.subtitle && (
                  <p className="mt-3 font-mono text-sm uppercase tracking-[0.1em] text-muted">{project.subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close project details"
                data-cursor="link"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{project.overview}</p>

            <EditorialImage
              src={images.projects[project.id]}
              alt={project.title}
              gradient
              rounded
              className="mt-14 aspect-[16/9] sm:mt-20"
              fallback={
                <>
                  <div className="bg-grid absolute inset-0 opacity-50" />
                  <span className="font-display select-none text-[8rem] font-semibold leading-none text-fg/[0.06] sm:text-[12rem]">
                    {project.number}
                  </span>
                </>
              }
            />

            <div className="mt-10 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-fg">
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-20">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Key Features</h3>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-base leading-relaxed text-muted">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-20">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Architecture</h3>
              <div className="mt-7">
                <ArchitectureVisual project={project} />
              </div>
            </div>

            <a
              href="https://github.com/Udaytinker26"
              target="_blank"
              rel="noreferrer"
              data-cursor="external"
              className="mt-16 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg underline-grow"
            >
              View on GitHub <ExternalLink size={13} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
