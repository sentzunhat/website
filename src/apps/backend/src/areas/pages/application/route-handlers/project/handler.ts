import type { Request } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/common/request'
import type { RouteHandler } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/fastify/handlers/route-handler'
import { inject, singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'
import type { FastifyReply } from '@sentzunhat/zacatl/third-party/fastify'

import { RenderPageProvider } from '../../../domain/providers/render-page/adapter'
import type { RenderPagePort } from '../../../domain/providers/render-page/port'

interface ProjectPageParams {
  slug: string
}

@singleton()
export class ProjectPageHandler implements RouteHandler<void, void, FastifyReply, ProjectPageParams> {
  public readonly url = '/projects/:slug'
  public readonly method = 'GET'
  public readonly schema = {
    params: {
      type: 'object',
      properties: { slug: { type: 'string', pattern: '^[a-z0-9-]+$' } },
      required: ['slug'],
    },
  }

  constructor(@inject(RenderPageProvider) private readonly renderPage: RenderPagePort) {}

  public async execute(
    request: Request<void, void, ProjectPageParams>,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    const { slug } = request.params
    if (!/^[a-z0-9-]+$/.test(slug)) return reply.code(404).send()

    const page = await this.renderPage.render(`/projects/${slug}/`)
    return reply.code(page.notFound ? 404 : 200)
      .header('Cache-Control', 'no-cache')
      .type('text/html')
      .send(page.html)
  }
}
