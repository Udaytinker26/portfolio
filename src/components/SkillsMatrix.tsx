import { useState } from 'react'
import { motion } from 'framer-motion'
import { skillCategories, skillsMatrix } from '../data/skills'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function SkillsMatrix() {
  const [hovered, setHovered] = useState<string | null>(null)
  const hoveredSkill = skillsMatrix.find((skill) => skill.name === hovered) ?? null

  return (
    <section className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">02</span>
          <span aria-hidden="true">—</span>
          <span>Technical Stack</span>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="font-display max-w-3xl font-semibold uppercase leading-[0.95] tracking-tight text-fg" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}>
            The systems
            <br />
            behind the work.
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hoveredSkill ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="hidden min-w-[240px] flex-col gap-1.5 border-l border-accent/40 pl-5 text-right lg:flex"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
              {hoveredSkill?.category ?? ''}
            </span>
            <span className="font-mono text-xs uppercase leading-snug tracking-[0.08em] text-muted">
              {hoveredSkill?.description ?? ''}
            </span>
          </motion.div>
        </div>

        <div className="mt-24 space-y-16 sm:mt-28 sm:space-y-20">
          {skillCategories.map((category) => {
            const items = skillsMatrix.filter((skill) => skill.category === category)
            return (
              <div key={category} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted/60">{category}</span>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={staggerContainer(0.03)}
                  className="mt-7 flex flex-wrap gap-x-10 gap-y-5 sm:gap-x-14 sm:gap-y-6"
                  onMouseLeave={() => setHovered(null)}
                >
                  {items.map((skill) => {
                    const isDimmed = hovered !== null && hovered !== skill.name
                    return (
                      <motion.button
                        key={skill.name}
                        variants={fadeUp}
                        transition={easeOut}
                        data-cursor="link"
                        onMouseEnter={() => setHovered(skill.name)}
                        onFocus={() => setHovered(skill.name)}
                        onBlur={() => setHovered(null)}
                        className="font-display text-3xl font-medium uppercase tracking-tight transition-all duration-300 sm:text-4xl lg:text-5xl"
                        style={{
                          color: hovered === skill.name ? 'var(--color-accent)' : 'var(--color-fg)',
                          opacity: isDimmed ? 0.22 : 1,
                        }}
                      >
                        {skill.name}
                      </motion.button>
                    )
                  })}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
