import { motion } from 'framer-motion'
import { personal } from '../data/personal'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function EngineeringFocus() {
  return (
    <section className="border-t border-line bg-bg px-5 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Engineering Focus</span>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={staggerContainer(0.06)}
          className="flex flex-wrap gap-x-8 gap-y-2"
        >
          {personal.engineeringFocus.map((item, index) => (
            <motion.span
              key={item}
              variants={fadeUp}
              transition={easeOut}
              className="font-display text-2xl font-semibold uppercase tracking-tight text-muted transition-colors hover:text-fg sm:text-3xl"
            >
              {item}
              {index < personal.engineeringFocus.length - 1 && (
                <span className="ml-8 hidden text-accent sm:inline">/</span>
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
