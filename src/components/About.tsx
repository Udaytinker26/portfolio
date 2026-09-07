import { motion } from 'framer-motion'
import { personal } from '../data/personal'
import { images } from '../data/images'
import EditorialImage from './EditorialImage'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

export default function About() {
  return (
    <section id="about" className="relative border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={easeOut}
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted"
        >
          <span className="text-accent">01</span>
          <span aria-hidden="true">—</span>
          <span>About</span>
        </motion.div>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.02)}
          className="font-display mt-8 max-w-5xl font-semibold uppercase leading-[0.98] tracking-tight text-fg"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
        >
          {personal.aboutHeading.split(' ').map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={fadeUp}
              transition={easeOut}
              className="mr-[0.28em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <div className="mt-24 flex flex-col gap-16 sm:mt-28 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
          <div className="grid gap-12 sm:grid-cols-[1fr_1.5fr] lg:max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={easeOut}
              className="font-mono text-xs uppercase leading-loose tracking-[0.15em] text-muted/80"
            >
              B.Tech Computer Science<br />
              Software Engineering<br />
              Full-Stack Development<br />
              AI / Machine Learning<br />
              Reliable Systems<br />
              Collaborative Engineering
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...easeOut, delay: 0.1 }}
              className="text-xl leading-relaxed text-muted sm:text-2xl"
            >
              {personal.aboutParagraph}
            </motion.p>
          </div>

          {images.showProfileImage && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ ...easeOut, delay: 0.15 }}
              className="w-full shrink-0 lg:-mt-14 lg:w-80"
            >
              <EditorialImage
                src={images.profile}
                alt={personal.name}
                cursor="image"
                className="aspect-[4/5] w-full"
                fallback={
                  <div className="bg-grid flex h-full w-full flex-col items-center justify-center gap-2">
                    <span className="font-display text-5xl font-semibold text-fg/15">
                      {personal.firstName[0]}
                      {personal.lastName[0]}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted/50">Profile</span>
                  </div>
                }
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
