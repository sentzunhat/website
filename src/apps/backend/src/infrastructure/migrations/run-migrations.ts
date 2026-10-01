import { QueryTypes, type Sequelize, type Transaction } from 'sequelize'

import { projectIdentityAndPageSchema } from './001-project-uuids-and-pages'

interface Migration {
  id: string
  up: (sequelize: Sequelize, transaction: Transaction) => Promise<void>
}

const migrations: Migration[] = [projectIdentityAndPageSchema]

export const runMigrations = async (sequelize: Sequelize): Promise<void> => {
  await sequelize.query(
    "CREATE TABLE IF NOT EXISTS schema_migrations (id TEXT PRIMARY KEY NOT NULL, applied_at TEXT NOT NULL DEFAULT (datetime('now')))",
  )

  for (const migration of migrations) {
    const applied = await sequelize.query<{ id: string }>(
      'SELECT id FROM schema_migrations WHERE id = :id',
      { replacements: { id: migration.id }, type: QueryTypes.SELECT },
    )
    if (applied.length > 0) continue

    await sequelize.transaction(async (transaction) => {
      await migration.up(sequelize, transaction)
      await sequelize.query(
        'INSERT INTO schema_migrations (id) VALUES (:id)',
        { replacements: { id: migration.id }, transaction },
      )
    })
  }
}
