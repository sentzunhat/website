import type { Project } from '../../../domain/entities/project'

export interface ProjectRepositoryPort {
  listAll(): Promise<Project[]>
}
