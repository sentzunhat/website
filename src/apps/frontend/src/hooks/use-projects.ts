import { useEffect, useState } from 'react'

import { fallbackProjects } from '../pages/home/content/site'
import type { Project } from '../types'

let pendingProjects: Promise<Project[]> | null = null

const refreshProjects = (): Promise<Project[]> => {
  if (pendingProjects) return pendingProjects
  const request = fetch('/api/projects')
    .then(async (response) => {
      if (!response.ok) throw new Error(`Projects request failed: ${response.status}`)
      return response.json() as Promise<Project[]>
    })
  pendingProjects = request
  void request.finally(() => { pendingProjects = null }).catch(() => {})
  return request
}

export const useProjects = (initialProjects?: Project[]): { projects: Project[]; projectsLoading: boolean } => {
  const [projects, setProjects] = useState<Project[]>(initialProjects ?? fallbackProjects)
  const [projectsLoading, setProjectsLoading] = useState(initialProjects == null)

  useEffect(() => {
    let active = true
    refreshProjects()
      .then((result) => { if (active) setProjects(result) })
      .catch((error: unknown) => {
        if (active && error instanceof Error) {
          setProjects(fallbackProjects)
        }
      })
      .finally(() => { if (active) setProjectsLoading(false) })

    return () => { active = false }
  }, [])

  return { projects, projectsLoading }
}
