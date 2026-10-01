import { inject, singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'

import type { PageRendererPort, RenderPagePort, RenderedPage } from './port'
import { ReactPageRendererAdapter } from '../../../../pages/infrastructure/clients/react-page-renderer'
import { SequelizeProjectRepository } from '../../../../projects/infrastructure/repositories/project/adapter'
import type { ProjectRepositoryPort } from '../../../../projects/infrastructure/repositories/project/port'

@singleton()
export class RenderPageProvider implements RenderPagePort {
  constructor(
    @inject(SequelizeProjectRepository) private readonly projectRepository: ProjectRepositoryPort,
    @inject(ReactPageRendererAdapter) private readonly pageRenderer: PageRendererPort,
  ) {}

  public async render(path: string): Promise<RenderedPage> {
    const projects = await this.projectRepository.listAll()
    return this.pageRenderer.render(path, projects)
  }
}
