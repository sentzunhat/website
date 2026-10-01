import type { Project } from '../../../../projects/domain/entities/project'

export interface RenderedPage {
  html: string
  notFound: boolean
}

export interface PageRendererPort {
  render(path: string, projects: Project[]): Promise<RenderedPage>
}

export interface RenderPagePort {
  render(path: string): Promise<RenderedPage>
}
