import { Explorations } from './explorations'
import { Focus } from './focus'
import { OpenSource } from './open-source'
import type { Project } from '../../../types'
import { explorations } from '../content/site'

interface ProjectsProps {
  projects: Project[]
  projectsLoading: boolean
}

export function Projects({ projects, projectsLoading }: ProjectsProps) {
  const count = 1 + projects.length + explorations.length

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-heading">
      <div className="projects-intro">
        <div>
          <p className="eyebrow mb-3">Projects</p>
          <h2 id="projects-heading">Our projects</h2>
        </div>
        <p>{count} current projects across products, public foundations, and research.</p>
      </div>
      <nav className="projects-categories" aria-label="Project categories">
        <a href="#focus">Commercial product <span>01</span></a>
        <a href="#opensource">Public foundations <span>{String(projects.length).padStart(2, '0')}</span></a>
        <a href="#explorations">Research &amp; development <span>{String(explorations.length).padStart(2, '0')}</span></a>
      </nav>
      <Focus />
      <OpenSource projects={projects} projectsLoading={projectsLoading} />
      <Explorations />
    </section>
  )
}
