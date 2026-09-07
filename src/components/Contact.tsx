import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Mail, Phone, Terminal } from 'lucide-react'
import { personal } from '../data/personal'
import Magnetic from './Magnetic'
import { fadeUp, staggerContainer } from '../animations/variants'
import { easeOut } from '../animations/transitions'

const LINKS = [
  { label: personal.email, href: personal.emailHref, icon: Mail, external: false },
  { label: personal.linkedinLabel, href: personal.linkedin, icon: Briefcase, external: true },
  { label: personal.githubLabel, href: personal.github, icon: Terminal, external: true },
  { label: personal.phone, href: personal.phoneHref, icon: Phone, external: false },
]

export default function Contact() {
  return (
    <section id="contact" className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-48 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={easeOut}
          className="font-mono text-xs uppercase tracking-[0.3em] text-muted"
        >
          {personal.contactSub}
        </motion.p>

        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.03)}
          className="font-display mt-8 max-w-5xl font-semibold uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: 'clamp(3rem, 9vw, 8.5rem)' }}
        >
          {personal.contactHeading.split(' ').map((word, index) => (
            <motion.span key={`${word}-${index}`} variants={fadeUp} transition={easeOut} className="mr-[0.25em] inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ ...easeOut, delay: 0.1 }}
          className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-muted sm:text-sm"
        >
          {personal.name} &middot; {personal.role} &middot; {personal.locationShort}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ ...easeOut, delay: 0.15 }}
          className="mt-16 sm:mt-20"
        >
          <Magnetic strength={0.25}>
            <a
              href={personal.emailHref}
              data-cursor="talk"
              className="group inline-flex items-center gap-4 rounded-full border border-line px-10 py-6 font-mono text-base uppercase tracking-[0.15em] text-fg transition-all duration-300 hover:gap-7 hover:border-accent hover:bg-accent hover:text-bg sm:text-lg"
            >
              Start A Conversation
              <ArrowUpRight size={22} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ ...easeOut, delay: 0.25 }}
          className="mt-28 grid gap-8 border-t border-line pt-12 sm:mt-32 sm:grid-cols-2 lg:grid-cols-4"
        >
          {LINKS.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              data-cursor={external ? 'external' : 'link'}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex items-center gap-3 text-muted transition-colors hover:text-fg"
            >
              <Icon size={16} className="shrink-0 text-muted/60 transition-colors group-hover:text-accent" />
              <span className="underline-grow font-mono text-xs uppercase tracking-[0.08em] sm:text-sm">{label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
