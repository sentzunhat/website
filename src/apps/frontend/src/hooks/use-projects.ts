import { useEffect, useState } from 'react'

import { fallbackProjects } from '../pages/home/content/site'
import type { Project } from '../types'

export const useProjects = (initialProjects?: Project[]) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects ?? fallbackProjects)
  const [projectsLoading, setProjectsLoading] = useState(initialProjects == null)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/projects', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Projects request failed: ${response.status}`)
        }
        return response.json() as Promise<Project[]>
      })
      .then(setProjects)
      .catch((error: unknown) => {
        if (error instanceof Error && error.name !== 'AbortError') {
          setProjects(fallbackProjects)
        }
      })
      .finally(() => setProjectsLoading(false))

    return () => controller.abort()
  }, [])

  return { projects, projectsLoading }
}
