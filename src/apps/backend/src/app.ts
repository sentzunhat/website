import { fileURLToPath } from 'node:url'

import fastifyStatic from '@fastify/static'
import { Fastify, type FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { config } from './config'
import { registerRoutes } from './main/application/routes'
import { registerPageRoutes } from './page-routes'

export const createApp = (): FastifyInstance => {
  const app = Fastify({ logger: { level: config.logLevel }, routerOptions: { ignoreTrailingSlash: true } })
  app.server.keepAliveTimeout = 65_000
  app.server.headersTimeout = 70_000
  registerRoutes(app)
  if (process.env.NODE_ENV === 'production') {
    registerPageRoutes(app)
    app.register(fastifyStatic, {
      root: fileURLToPath(new URL('../../frontend/dist/', import.meta.url)),
      prefix: '/',
    })
  }
  return app
}
