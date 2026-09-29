import { createApp } from './app'
import { initProject, seedProjects } from './areas/projects/infrastructure/project-model'
import { config } from './config'
import { connectDatabase, sequelize } from './database'

const app = createApp()

const shutdown = async (signal: string): Promise<void> => {
  app.log.info({ signal }, 'shutting down')
  await app.close()
  await sequelize.close()
}

const main = async (): Promise<void> => {
  initProject(sequelize)
  await connectDatabase()
  await sequelize.sync()
  await seedProjects()
  await app.listen({ host: config.host, port: config.port })
}

process.once('SIGINT', () => void shutdown('SIGINT'))
process.once('SIGTERM', () => void shutdown('SIGTERM'))

main().catch((error: unknown) => {
  app.log.fatal({ error }, 'startup failed')
  process.exitCode = 1
})
