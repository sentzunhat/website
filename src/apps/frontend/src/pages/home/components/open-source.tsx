import type { CSSProperties } from 'react'
import { FaArrowRight, FaBoxOpen, FaGithub, FaNpm } from 'react-icons/fa'

import type { Project } from '../../../types'

interface OpenSourceProps {
  projects: Project[]
  projectsLoading: boolean
}

const ProjectCard = ({ project }: { project: Project }) => {
  const cardStyle = {
    '--card-accent': project.accent === 'violet' ? 'var(--primary)' : 'var(--green)',
  } as CSSProperties
  const ProjectIcon = project.name === 'Zacatl'
    ? FaNpm
    : project.name === 'HAWP'
      ? FaGithub
      : FaBoxOpen
  const slug = project.slug ?? project.name.toLowerCase()

  return (
    <a
      className="project-card group flex min-h-80 flex-col justify-between rounded-2xl border border-line bg-surface p-6 transition duration-200 hover:-translate-y-1 hover:border-card-accent"
      style={cardStyle}
      href={`/projects/${slug}/`}
    >
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-card-accent text-white shadow-[0_8px_24px_color-mix(in_srgb,var(--card-accent)_22%,transparent)]">
          <ProjectIcon className="project-icon" size={20} aria-hidden="true" />
        </span>
        <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase">
          <span className="mr-2 inline-block size-1.5 rounded-full bg-green" />
          {project.status}
        </span>
      </div>
      <div>
        <h3 className="mb-2.5 text-[2.125rem] font-semibold tracking-[-0.07em]">{project.name}</h3>
        <p className="max-w-xs text-sm leading-6 text-muted">{project.description}</p>
      </div>
      <div className="project-card-footer mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <span className="font-mono text-[0.6875rem] text-muted">Release {project.version}</span>
        <span className="project-card-action">
          Explore project
          <FaArrowRight className="ui-icon transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}

export function OpenSource({ projects, projectsLoading }: OpenSourceProps) {
  return (
    <section className="pb-24 sm:pb-30" id="opensource">
      <div className="mb-7 flex flex-col items-start justify-between gap-5 border-b border-line pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2.5">Public foundations</p>
          <h2 className="text-[2.125rem] font-semibold tracking-[-0.06em]">Foundations</h2>
        </div>
        <p className="max-w-64 text-[0.8125rem] leading-5 text-muted">Public projects with real code behind the philosophy.</p>
      </div>
      <p className="sr-only" role="status">{projectsLoading ? 'Refreshing selected work.' : ''}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => <ProjectCard project={project} key={project.name} />)}
      </div>
    </section>
  )
}
