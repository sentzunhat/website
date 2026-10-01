import type { Request } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/common/request'
import type { RouteHandler } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/fastify/handlers/route-handler'
import { inject, singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'
import type { FastifyReply } from '@sentzunhat/zacatl/third-party/fastify'

import { RenderPageProvider } from '../../../domain/providers/render-page/adapter'
import type { RenderPagePort } from '../../../domain/providers/render-page/port'

@singleton()
export class HomePageHandler implements RouteHandler<void, void, FastifyReply> {
  public readonly url = '/'
  public readonly method = 'GET'
  public readonly schema = {}

  constructor(@inject(RenderPageProvider) private readonly renderPage: RenderPagePort) {}

  public async execute(_request: Request, reply: FastifyReply): Promise<FastifyReply> {
    const page = await this.renderPage.render('/')
    return reply.header('Cache-Control', 'no-cache').type('text/html').send(page.html)
  }
}
