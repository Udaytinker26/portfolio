import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ArchitectureVisual from './ArchitectureVisual'
import { fadeUp } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function ArchitectureSection() {
  return (
    <section className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted">System Design</div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={easeOut}
          className="font-display mt-8 max-w-4xl font-semibold uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
        >
          How I think
          <br />
          about intelligent
          <br />
          systems.
        </motion.h2>

        <div className="mt-28 space-y-32 sm:mt-36 sm:space-y-40">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={easeOut}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-fg sm:text-3xl">
                  {project.title}
                </h3>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{project.number}</span>
              </div>
              <div className="mt-10 sm:mt-14">
                <ArchitectureVisual project={project} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
