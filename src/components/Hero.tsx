import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { personal } from '../data/personal'
import { images } from '../data/images'
import HeroVisual from './HeroVisual'
import EditorialImage from './EditorialImage'
import Magnetic from './Magnetic'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { GradientText } from './GradientText'

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 150])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -80])

  return (
    <section id="hero" className="relative min-h-[112vh] overflow-hidden bg-bg pt-32">
      <motion.div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30" style={{ y: gridY }} aria-hidden="true" />
      <div className="hero-glow pointer-events-none absolute -right-40 top-0 h-[640px] w-[640px]" aria-hidden="true" />

      <div className="absolute inset-0 hidden lg:block">
        <div className="mx-auto h-full max-w-[1600px] px-12">
          <motion.div className="relative ml-auto h-full w-[46%] opacity-40" style={{ y: visualY }}>
            <HeroVisual />
            {images.showHeroImage && (
              <EditorialImage
                src={images.hero}
                alt={personal.name}
                interactive
                cursor="image"
                className="absolute bottom-16 right-0 h-72 w-56 opacity-100"
                fallback={<span />}
              />
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-[1600px] flex-col justify-center px-5 pb-24 sm:px-8 lg:px-12"
        variants={staggerContainer(0.09, 0.15)}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          transition={easeOut}
          className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.35em] text-muted/70 sm:text-xs"
        >
          <span>{personal.heroMetaTop[0]}</span>
          <span>{personal.heroMetaTop[1]}</span>
        </motion.div>

        <h1
          aria-label={personal.heroLines.join(' ')}
          className="font-display mt-8 max-w-[70vw] uppercase text-fg sm:mt-10"
          style={{ lineHeight: 0.88 }}
        >
          {personal.heroLines.map((line, index) => (
  <span key={line} className="block overflow-hidden">
    <motion.span
      variants={fadeUp}
      transition={{ ...easeOut, delay: index * 0.07 }}
      className="block font-semibold tracking-tight"
      style={{ fontSize: 'clamp(3rem, 10.5vw, 10.5rem)' }}
    >
      {index === 1 ? <GradientText>{line}</GradientText> : line}
    </motion.span>
  </span>
))}
        </h1>

        <div className="mt-14 flex flex-col gap-10 sm:mt-16 lg:ml-[42%] lg:max-w-md">
          <motion.div variants={fadeUp} transition={easeOut}>
            <p className="font-display text-2xl font-medium uppercase tracking-tight text-muted sm:text-3xl">
              {personal.role}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {personal.heroStack.map((item, index) => (
                <span key={item} className="flex items-center gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent sm:text-xs">{item}</span>
                  {index < personal.heroStack.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-muted/40" aria-hidden="true" />
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p variants={fadeUp} transition={easeOut} className="text-base leading-relaxed text-muted sm:text-lg">
            {personal.heroIntro}
          </motion.p>

          <motion.div variants={fadeUp} transition={easeOut} className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <button
                data-cursor="cta"
                onClick={() => scrollTo('work')}
                className="group flex items-center gap-2 rounded-full bg-fg px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-bg transition-colors hover:bg-accent"
              >
                View My Work
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic>
              <button
                data-cursor="link"
                onClick={() => scrollTo('contact')}
                className="group flex items-center gap-2 rounded-full border border-line px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:border-accent hover:text-accent"
              >
                Get In Touch
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>

            <Magnetic>
              <a
                data-cursor="cv"
                href={personal.resumeUrl}
                download
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
              >
                Download Resume
                <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
