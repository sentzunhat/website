import { inject, singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'

import type { ListProjectsPort } from './port'
import { SequelizeProjectRepository } from '../../../infrastructure/repositories/project/adapter'
import type { ProjectRepositoryPort } from '../../../infrastructure/repositories/project/port'
import type { Project } from '../../entities/project'

@singleton()
export class ListProjectsProvider implements ListProjectsPort {
  constructor(
    @inject(SequelizeProjectRepository) private readonly projectRepository: ProjectRepositoryPort,
  ) {}

  public execute(): Promise<Project[]> {
    return this.projectRepository.listAll()
  }
}
