import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

import { registerOrmInstance } from '@sentzunhat/zacatl/service/platforms/server/database/orm-instance'
import { DatabaseVendor } from '@sentzunhat/zacatl/service/platforms/server/database/port'
import { Sequelize } from '@sentzunhat/zacatl/third-party/databases/sequelize'

import { seedProjects } from '../../../areas/projects/infrastructure/seed/seed-projects'
import { config } from '../../../config'
import { initializeModels } from '../../../infrastructure/models/initialize-models'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.databasePath,
  logging: false,
})

export const connectDatabase = async (): Promise<void> => {
  if (config.databasePath !== ':memory:') {
    await mkdir(dirname(config.databasePath), { recursive: true })
  }

  await sequelize.authenticate()
  registerOrmInstance(DatabaseVendor.SEQUELIZE, { url: config.databasePath }, sequelize)
  await sequelize.query('PRAGMA foreign_keys = ON')
  initializeModels(sequelize)
  await sequelize.sync()
  await seedProjects()
}
