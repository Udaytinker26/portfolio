import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { Plus } from 'lucide-react'
import { experiences } from '../data/experience'
import { easeOut } from '../animations/transitions'

function ExperienceItem({ experience, reverse }: { experience: (typeof experiences)[number]; reverse: boolean }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ ...easeOut, delay: 0.05 }}
      className={`relative grid gap-8 pl-10 transition-opacity duration-500 sm:pl-16 lg:gap-16 ${
        experience.current ? 'opacity-100' : 'opacity-60 hover:opacity-100'
      } ${reverse ? 'lg:grid-cols-[1fr_320px]' : 'lg:grid-cols-[320px_1fr]'}`}
    >
      <span
        className={`absolute left-[11px] top-2 h-3 w-3 -translate-x-1/2 rounded-full border-2 sm:left-[27px] ${
          experience.current ? 'border-accent bg-accent' : 'border-line bg-bg'
        }`}
        aria-hidden="true"
      />

      <div className={`flex flex-col gap-3 ${reverse ? 'lg:order-2 lg:items-end lg:text-right' : ''}`}>
        <span className="font-display text-3xl font-semibold uppercase tracking-tight text-fg sm:text-4xl">
          {experience.period}
        </span>
        {experience.current && (
          <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Current
          </span>
        )}
        <h3 className="font-display mt-2 text-3xl font-semibold uppercase leading-[0.95] tracking-tight text-fg sm:text-5xl">
          {experience.role}
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted sm:text-sm">
          {experience.company} — {experience.location}
        </p>
      </div>

      <div className={reverse ? 'lg:order-1' : ''}>
        <div className={`flex flex-wrap gap-2 ${reverse ? 'lg:justify-end' : ''}`}>
          {experience.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className={`mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl ${reverse ? 'lg:ml-auto' : ''}`}>
          {experience.summary}
        </p>

        <button
          onClick={() => setExpanded((v) => !v)}
          data-cursor="link"
          className={`mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg underline-grow ${reverse ? 'lg:ml-auto lg:flex' : ''}`}
        >
          {expanded ? 'Show less' : 'Full scope of work'}
          <Plus size={13} className={`transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl space-y-3 overflow-hidden"
            >
              {experience.points.map((point) => (
                <li key={point} className={`flex gap-3 text-sm leading-relaxed text-muted sm:text-base ${reverse ? 'lg:ml-auto lg:justify-end lg:text-right' : ''}`}>
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/60" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.8', 'end 0.4'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">03</span>
          <span aria-hidden="true">—</span>
          <span>Experience</span>
        </div>

        <h2
          className="font-display mt-8 max-w-3xl font-semibold uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
          The work behind
          <br />
          the work.
        </h2>

        <div ref={containerRef} className="relative mt-24 space-y-28 sm:mt-32 sm:space-y-36">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-line sm:left-[27px]" aria-hidden="true" />
          <motion.div
            className="absolute left-[11px] top-2 w-px bg-accent sm:left-[27px]"
            style={{ height: lineHeight }}
            aria-hidden="true"
          />
          {experiences.map((experience, index) => (
            <ExperienceItem key={experience.id} experience={experience} reverse={index % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
