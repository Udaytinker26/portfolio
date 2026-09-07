import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { images } from '../data/images'
import EditorialImage from './EditorialImage'

type ProjectCardProps = {
  project: Project
  onOpen: () => void
  reverse?: boolean
}

export default function ProjectCard({ project, onOpen, reverse = false }: ProjectCardProps) {
  return (
    <button
      onClick={onOpen}
      data-cursor="project"
      className="group block w-full border-t border-line py-20 text-left first:border-t-0 sm:py-32"
      aria-haspopup="dialog"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-mono text-xs text-muted">{project.number} /</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:text-xs">{project.category}</span>
      </div>

      <h3
        className="font-display mt-4 font-semibold uppercase leading-[0.95] tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-2 sm:mt-6"
        style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)' }}
      >
        {project.title}
      </h3>
      {project.subtitle && (
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-muted sm:text-sm">{project.subtitle}</p>
      )}

      <div className={`mt-14 w-full sm:mt-20 lg:w-[82%] ${reverse ? 'lg:ml-auto' : 'lg:mr-auto'}`}>
        <EditorialImage
          src={images.projects[project.id]}
          alt={project.title}
          interactive
          gradient
          cursor="project"
          className="aspect-[4/3] sm:aspect-[16/9]"
          fallback={
            <>
              <div className="bg-grid absolute inset-0 opacity-60 transition-transform duration-700 ease-out group-hover:scale-105" />
              <span className="font-display select-none text-[10rem] font-semibold leading-none text-fg/[0.06] sm:text-[16rem]">
                {project.number}
              </span>
            </>
          }
          overlay={
            <div className="flex h-full flex-col justify-between p-6 sm:p-8">
              <span className="ml-auto flex h-12 w-12 items-center justify-center rounded-full border border-line bg-bg/80 text-fg transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-accent group-hover:text-accent">
                <ArrowUpRight size={18} />
              </span>
            </div>
          }
        />
      </div>

      <div className="mt-12 flex flex-col gap-8 sm:mt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{project.description}</p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.tech.map((tech) => (
              <span key={tech} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                {tech}
              </span>
            ))}
          </div>
          <span className="inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg lg:ml-auto">
            View Project
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </div>
    </button>
  )
}
