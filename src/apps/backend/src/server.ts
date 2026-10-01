import { config } from './config'
import { connectDatabase, sequelize } from './platforms/server/database/sequelize'
import { createFastifyApp } from './platforms/server/fastify-app'
import { createLayers } from './platforms/server/layers'

const layers = createLayers()
const app = createFastifyApp()

const shutdown = async (signal: string): Promise<void> => {
  app.log.info({ signal }, 'shutting down')
  await app.close()
  await sequelize.close()
}

const startServer = async (): Promise<void> => {
  await connectDatabase()
  await layers.start()
  await app.listen({ host: config.host, port: config.port })
}

process.once('SIGINT', () => void shutdown('SIGINT'))
process.once('SIGTERM', () => void shutdown('SIGTERM'))

startServer().catch((error: unknown) => {
  app.log.fatal({ error }, 'startup failed')
  process.exitCode = 1
})
