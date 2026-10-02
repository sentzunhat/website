import { About } from './components/about'
import { Founder } from './components/founder'
import { Hero } from './components/hero'
import { Principles } from './components/principles'
import { Projects } from './components/projects'
import { SectionBooklet } from './components/section-booklet'
import { Vision } from './components/vision'
import { useProjects } from '../../hooks/use-projects'
import type { Project } from '../../types'

export function Home({ initialProjects }: { initialProjects?: Project[] | undefined }) {
  const { projects, projectsLoading } = useProjects(initialProjects)

  return (
    <SectionBooklet>
      <Hero projects={projects} />
      <Projects projects={projects} projectsLoading={projectsLoading} />
      <About />
      <Vision />
      <Principles />
      <Founder />
    </SectionBooklet>
  )
}
