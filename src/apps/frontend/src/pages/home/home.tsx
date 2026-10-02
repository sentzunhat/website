import { About } from './components/about'
import { Explorations } from './components/explorations'
import { Focus } from './components/focus'
import { Founder } from './components/founder'
import { Hero } from './components/hero'
import { OpenSource } from './components/open-source'
import { Principles } from './components/principles'
import { SectionBooklet } from './components/section-booklet'
import { Vision } from './components/vision'
import { useProjects } from '../../hooks/use-projects'
import type { Project } from '../../types'

export function Home({ initialProjects }: { initialProjects?: Project[] | undefined }) {
  const { projects, projectsLoading } = useProjects(initialProjects)

  return (
    <>
      <Hero projects={projects} />
      <SectionBooklet>
        <Focus />
        <About />
        <OpenSource projects={projects} projectsLoading={projectsLoading} />
        <Vision />
        <Principles />
        <Explorations />
        <Founder />
      </SectionBooklet>
    </>
  )
}
