import { motion } from 'framer-motion'
import type { Project } from '../data/projects'

function FlowColumn({ steps, label }: { steps: string[]; label?: string }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      {label && <span className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-accent sm:mb-8">{label}</span>}
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-md border border-line bg-bg px-6 py-4 text-center font-mono text-xs uppercase tracking-[0.1em] text-fg sm:px-8 sm:py-5 sm:text-sm"
          >
            {step}
          </motion.div>
          {index < steps.length - 1 && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, delay: index * 0.12 + 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'top' }}
              className="my-2 h-10 w-px bg-line sm:h-14"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function ArchitectureVisual({ project }: { project: Project }) {
  if (project.architectureBranches?.length) {
    return (
      <div className="flex flex-col gap-16 rounded-lg border border-line bg-bg-raised/40 p-8 sm:flex-row sm:gap-10 sm:p-16">
        {project.architectureBranches.map((branch) => (
          <FlowColumn key={branch.label} steps={branch.steps} label={branch.label} />
        ))}
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-line bg-bg-raised/40 p-8 sm:p-16">
      <FlowColumn steps={project.architecture} />
    </div>
  )
}
