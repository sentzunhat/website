import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

import App from './app/app'
import './app/base.css'
import type { Project } from './types'

const root = document.getElementById('root')
if (root == null) throw new Error('Root element not found')

const readInitialProjects = (): Project[] | undefined => {
  const state = document.getElementById('initial-page-state')?.textContent
  if (!state) return undefined
  const parsed: unknown = JSON.parse(state)
  if (typeof parsed !== 'object' || parsed == null || !('projects' in parsed)) return undefined
  return Array.isArray(parsed.projects) ? parsed.projects as Project[] : undefined
}

const mount = async (): Promise<void> => {
  const path = window.location.pathname
  const initialProjects = readInitialProjects()
  // Keep server-rendered project content visible until its route chunk is ready.
  const projectPageComponent = /^\/projects\//.test(path)
    ? (await import('./pages/project/project')).ProjectPage
    : undefined
  const app = (
    <StrictMode>
      <App path={path} initialProjects={initialProjects} projectPageComponent={projectPageComponent} />
    </StrictMode>
  )

  if (root.dataset.ssr === 'true') hydrateRoot(root, app)
  else createRoot(root).render(app)
}

void mount()
