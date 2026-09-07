import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { certifications } from '../data/education'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function Certifications() {
  return (
    <section className="border-t border-line bg-bg px-5 py-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Certifications</div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.06)}
          className="mt-16 divide-y divide-line border-y border-line"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.name}
              variants={fadeUp}
              transition={easeOut}
              className="group flex items-center justify-between gap-4 py-7 transition-colors hover:bg-bg-raised/40 sm:py-9"
            >
              <div className="flex items-center gap-5 sm:gap-6">
                <Award size={18} className="shrink-0 text-muted/60 transition-colors group-hover:text-accent" />
                <span className="font-display text-2xl font-medium uppercase tracking-tight text-fg sm:text-3xl">
                  {cert.name}
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted sm:text-xs">
                {cert.issuer}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
