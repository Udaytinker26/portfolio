import { motion } from 'framer-motion'
import { education } from '../data/education'
import { easeOut } from '../animations/transitions'

export default function Education() {
  return (
    <section
      id="education"
      className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">05</span>
          <span aria-hidden="true">—</span>
          <span>Education</span>
        </div>

        <div className="mt-20 grid gap-16 sm:mt-24 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={easeOut}
          >
            <h2
              className="font-display max-w-2xl font-semibold uppercase leading-[0.95] tracking-tight text-fg"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              {education.degree}
            </h2>

            <p className="mt-4 font-mono text-sm uppercase tracking-[0.1em] text-muted sm:text-base">
              {education.institution} &middot; {education.period}
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted"
                >
                  {course}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={easeOut}
            className="flex flex-col items-start border-t border-line pt-8 lg:items-end lg:border-t-0 lg:border-l lg:pl-20 lg:pt-0"
          >
            <span className="font-display text-8xl font-semibold tracking-tight text-fg sm:text-9xl">
              {education.cgpa.toFixed(2)}
            </span>

            <span className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {education.cgpaScale}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}