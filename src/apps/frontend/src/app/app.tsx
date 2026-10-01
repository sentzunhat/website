import './app.css'

import { lazy, Suspense, type ComponentType } from 'react'

import { Footer } from '../components/footer'
import { Header } from '../components/header'
import { Home } from '../pages/home/home'
import type { Project } from '../types'

type ProjectPageProps = { slug: string; liveProjects?: Project[] | undefined }
const LazyProjectPage = lazy(() => import('../pages/project/project').then(({ ProjectPage }) => ({ default: ProjectPage })))

const currentPath = () => {
  const normalized = window.location.pathname.replace(/\/+$/, '')
  return normalized === '' ? '/' : normalized
}

interface AppProps {
  path?: string | undefined
  initialProjects?: Project[] | undefined
  projectPageComponent?: ComponentType<ProjectPageProps> | undefined
}

function App({ path = currentPath(), initialProjects, projectPageComponent: ProjectPage = LazyProjectPage }: AppProps) {
  const normalizedPath = path.replace(/\/+$/, '') || '/'
  const projectMatch = normalizedPath.match(/^\/projects\/([^/]+)$/)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <main
        id="main-content"
        className="mx-auto w-[min(100%-2rem,70rem)] sm:w-[min(100%-3rem,70rem)]"
      >
        <Header />
        {projectMatch?.[1]
          ? <Suspense fallback={<p className="min-h-112 pt-16 text-sm text-muted" role="status">Loading project…</p>}>
              <ProjectPage slug={decodeURIComponent(projectMatch[1])} liveProjects={initialProjects} />
            </Suspense>
          : <Home initialProjects={initialProjects} />}
        <Footer />
      </main>
    </>
  )
}

export default App
