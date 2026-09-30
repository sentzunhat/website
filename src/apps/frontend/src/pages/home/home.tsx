import { About } from './components/about'
import { Explorations } from './components/explorations'
import { Focus } from './components/focus'
import { Founder } from './components/founder'
import { Hero } from './components/hero'
import { OpenSource } from './components/open-source'
import { Principles } from './components/principles'
import { Vision } from './components/vision'
import { useProjects } from '../../hooks/use-projects'

export function Home() {
  const { projects, projectsLoading } = useProjects()

  return (
    <>
      <Hero projects={projects} />
      <Focus />
      <About />
      <OpenSource projects={projects} projectsLoading={projectsLoading} />
      <Vision />
      <Principles />
      <Explorations />
      <Founder />
    </>
  )
}
