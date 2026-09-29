import type { FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { Project } from '../infrastructure/project-model'

export const registerProjectRoutes = (app: FastifyInstance): void => {
  app.get('/api/projects', async () => Project.findAll({
    order: [['id', 'ASC']],
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    raw: true,
  }))
}
