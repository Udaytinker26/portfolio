import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { toolboxStages, toolboxTools } from '../data/skills'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function EngineeringToolbox() {
  return (
    <section className="border-t border-line bg-bg px-5 py-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Engineering Toolbox</div>

        <h2
          className="font-display mt-8 max-w-2xl font-semibold uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          From code to deploy.
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer(0.08)}
          className="mt-16 flex flex-col items-center gap-2 sm:flex-row sm:justify-between sm:gap-0"
        >
          {toolboxStages.map((stage, index) => (
            <motion.div key={stage} variants={fadeUp} transition={easeOut} className="flex items-center gap-2 sm:gap-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-line bg-bg-raised/50 px-6 py-5 sm:px-8">
                <span className="font-mono text-[10px] text-muted/60">0{index + 1}</span>
                <span className="font-display text-sm font-semibold uppercase tracking-tight text-fg sm:text-base">
                  {stage}
                </span>
              </div>
              {index < toolboxStages.length - 1 && (
                <ArrowRight size={16} className="hidden shrink-0 text-accent sm:block" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ ...easeOut, delay: 0.2 }}
          className="mt-14 flex flex-wrap justify-center gap-3 border-t border-line pt-10"
        >
          {toolboxTools.map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
