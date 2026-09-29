import { resolve } from 'node:path'

import fastifyStatic from '@fastify/static'
import { Fastify, type FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { config } from './config'
import { registerRoutes } from './main/application/routes'

export const createApp = (): FastifyInstance => {
  const app = Fastify({ logger: { level: config.logLevel } })
  app.server.keepAliveTimeout = 65_000
  app.server.headersTimeout = 70_000
  registerRoutes(app)
  if (process.env.NODE_ENV === 'production') {
    app.register(fastifyStatic, {
      root: resolve(process.cwd(), 'src/apps/frontend/dist'),
      prefix: '/',
    })
  }
  return app
}
