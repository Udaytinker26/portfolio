import { ArrowUp } from 'lucide-react'
import { personal } from '../data/personal'

export default function Footer() {
  const scrollTop = () => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer className="border-t border-line bg-bg px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold uppercase tracking-tight text-fg">{personal.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">{personal.role}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-muted/70">{personal.locationShort}</p>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          <a href={personal.github} target="_blank" rel="noreferrer" data-cursor="external" className="underline-grow font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-fg">
            GitHub
          </a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" data-cursor="external" className="underline-grow font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-fg">
            LinkedIn
          </a>
          <a href={personal.emailHref} data-cursor="link" className="underline-grow font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-fg">
            Email
          </a>
          <a href={personal.resumeUrl} download data-cursor="cv" className="underline-grow font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-fg">
            Resume
          </a>
        </nav>

        <button
          onClick={scrollTop}
          data-cursor="link"
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted hover:text-fg"
        >
          Back To Top
          <ArrowUp size={14} className="transition-transform group-hover:-translate-y-1" />
        </button>
      </div>

      <div className="mx-auto mt-12 max-w-[1600px] border-t border-line pt-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted/60">
          © {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </footer>
  )
}
