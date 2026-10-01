import { GetRouteHandler } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/fastify/handlers/get-route-handler'
import { inject, singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'

import type { Project } from '../../../domain/entities/project'
import { ListProjectsProvider } from '../../../domain/providers/list-projects/adapter'
import type { ListProjectsPort } from '../../../domain/providers/list-projects/port'

@singleton()
export class ListProjectsHandler extends GetRouteHandler<void, void, Project[]> {
  constructor(@inject(ListProjectsProvider) private readonly listProjects: ListProjectsPort) {
    super({ url: '/api/projects', schema: {} })
  }

  public handler(): Promise<Project[]> {
    return this.listProjects.execute()
  }
}
