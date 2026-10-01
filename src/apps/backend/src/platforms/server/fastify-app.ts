import { fileURLToPath } from 'node:url'

import fastifyStatic from '@fastify/static'
import { resolveDependency } from '@sentzunhat/zacatl/dependency-injection'
import type { Request } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/common/request'
import type { RouteHandler } from '@sentzunhat/zacatl/service/layers/application/entry-points/rest/fastify/handlers/route-handler'
import { Fastify, type FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { config } from '../../config'
import { routeHandlers } from '../../main/application/route-handlers/routes'

export const createFastifyApp = (): FastifyInstance => {
  const app = Fastify({ logger: { level: config.logLevel }, routerOptions: { ignoreTrailingSlash: true } })
  app.server.keepAliveTimeout = 65_000
  app.server.headersTimeout = 70_000

  for (const handlerType of routeHandlers) {
    const handler = resolveDependency<RouteHandler>(handlerType)
    app.route({
      url: handler.url,
      method: handler.method,
      schema: handler.schema,
      handler: async (request, reply) => {
        const routeRequest = request as Request<unknown, unknown, unknown, unknown>
        const result = await handler.execute(routeRequest, reply)
        return reply.sent ? reply : result
      },
    })
  }

  if (process.env.NODE_ENV === 'production') {
    app.register(fastifyStatic, {
      root: fileURLToPath(new URL('../../../../frontend/dist/', import.meta.url)),
      prefix: '/',
    })
  }

  return app
}
