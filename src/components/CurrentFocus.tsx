import { motion } from 'framer-motion'
import { personal } from '../data/personal'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function CurrentFocus() {
  return (
    <section className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">06</span>
          <span aria-hidden="true">—</span>
          <span>Current Focus</span>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.06)}
          className="mt-20 divide-y divide-line border-y border-line sm:mt-24"
        >
          {personal.currentFocus.map((item, index) => (
            <motion.div
              key={item}
              variants={fadeUp}
              transition={easeOut}
              className="group flex items-center gap-8 py-8 sm:py-12"
            >
              <span className="font-mono text-xs text-muted/50">0{index + 1}</span>
              <span
                className="font-display font-semibold uppercase tracking-tight text-muted transition-all duration-300 group-hover:translate-x-3 group-hover:text-fg"
                style={{ fontSize: 'clamp(1.75rem, 5vw, 4rem)' }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
