import type { FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { registerProjectRoutes } from '../../areas/projects/application/routes'
import { config } from '../../config'

export const registerRoutes = (app: FastifyInstance): void => {
  app.get('/api/health', async () => ({
    ok: true,
    service: config.serviceName,
    timestamp: new Date().toISOString(),
  }))

  registerProjectRoutes(app)
}
