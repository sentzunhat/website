import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

import { Sequelize } from '@sentzunhat/zacatl/third-party/databases/sequelize'

import { config } from './config'

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.databasePath,
  logging: false,
})

export const connectDatabase = async (): Promise<void> => {
  if (config.databasePath !== ':memory:') await mkdir(dirname(config.databasePath), { recursive: true })
  await sequelize.authenticate()
  await sequelize.query('PRAGMA foreign_keys = ON')
}
