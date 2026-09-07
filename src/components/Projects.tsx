import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects, type Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { GradientText } from './GradientText'

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  return (
    <motion.section id="work" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.08 }} transition={{ duration: 0.8 }} className="border-t border-line bg-bg px-5 py-32 sm:px-8 sm:py-40 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted">
          <span className="text-accent">04</span>
          <span aria-hidden="true">—</span>
          <span>Selected Work</span>
        </div>

        <h2
          className="font-display mt-8 max-w-3xl font-semibold uppercase leading-[0.95] tracking-tight text-fg"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
          <GradientText>The places</GradientText> I've built.
        </h2>

        <div className="mt-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              reverse={index % 2 === 1}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </motion.section>
  )
}
