import { motion } from 'framer-motion'
import { stats } from '../data/personal'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function Stats() {
  return (
    <section className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
          By The Numbers
        </span>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.08)}
          className="mt-16 grid grid-cols-2 gap-x-6 gap-y-16 sm:mt-20 sm:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              transition={easeOut}
              className="flex flex-col gap-4"
            >
              <span
                className="font-display font-semibold tracking-tight text-fg"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
              >
                {stat.value.toFixed(stat.decimals ?? 0)}
                {stat.suffix}
              </span>

              <span className="font-mono text-[10px] uppercase leading-snug tracking-[0.15em] text-muted sm:text-xs">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}