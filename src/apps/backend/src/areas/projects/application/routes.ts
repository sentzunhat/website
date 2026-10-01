import type { FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { listProjects } from './list-projects'

export const registerProjectRoutes = (app: FastifyInstance): void => {
  app.get('/api/projects', listProjects)
}
