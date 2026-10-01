import { BaseRepository } from '@sentzunhat/zacatl/service/layers/infrastructure/repositories/sequelize/repository'
import { singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'

import type { ProjectRepositoryPort } from './port'
import type { Project } from '../../../domain/entities/project'
import { ProjectModel } from '../../models/project-model'

@singleton()
export class SequelizeProjectRepository
  extends BaseRepository<Project, Project, Project>
  implements ProjectRepositoryPort
{
  constructor() {
    super({ name: 'Project' })
  }

  public async listAll(): Promise<Project[]> {
    return ProjectModel.findAll({
      order: [['sortOrder', 'ASC']],
      attributes: [
        'id',
        'slug',
        'sortOrder',
        'name',
        'description',
        'version',
        'status',
        'url',
        'accent',
      ],
      raw: true,
    })
  }
}
