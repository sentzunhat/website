import type { Project } from '../../entities/project'

export interface ListProjectsPort {
  execute(): Promise<Project[]>
}
