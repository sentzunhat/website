import { randomUUID } from 'node:crypto'

import { QueryTypes, type Sequelize, type Transaction } from 'sequelize'

interface LegacyProjectRow {
  id: number
  name: string
  description: string
  version: string
  status: string
  url: string
  accent: string
  createdAt: string
  updatedAt: string
}

interface TableRow {
  name: string
}

const projectsTableSql = (tableName: string): string => [
  'CREATE TABLE ' + tableName + ' (',
  '  id TEXT PRIMARY KEY NOT NULL,',
  '  legacy_id INTEGER UNIQUE,',
  '  slug TEXT NOT NULL UNIQUE,',
  '  sort_order INTEGER NOT NULL CHECK (sort_order >= 0),',
  '  name VARCHAR(255) NOT NULL UNIQUE,',
  '  description TEXT NOT NULL,',
  '  version VARCHAR(255) NOT NULL,',
  '  status VARCHAR(255) NOT NULL,',
  '  url TEXT NOT NULL,',
  '  accent VARCHAR(32) NOT NULL,',
  '  created_at TEXT NOT NULL,',
  '  updated_at TEXT NOT NULL',
  ')',
].join('\n')

const createPageTables = async (sequelize: Sequelize, transaction: Transaction): Promise<void> => {
  await sequelize.query([
    'CREATE TABLE pages (',
    '  id TEXT PRIMARY KEY NOT NULL,',
    '  project_id TEXT UNIQUE REFERENCES projects(id) ON DELETE CASCADE,',
    '  slug TEXT NOT NULL UNIQUE,',
    "  page_type TEXT NOT NULL CHECK (page_type IN ('home', 'project')),",
    '  title TEXT,',
    '  meta_description TEXT,',
    '  canonical_url TEXT,',
    '  seo_title TEXT,',
    '  lede TEXT,',
    '  intro TEXT,',
    '  schema_type TEXT,',
    '  schema_json TEXT,',
    "  created_at TEXT NOT NULL DEFAULT (datetime('now')),",
    "  updated_at TEXT NOT NULL DEFAULT (datetime('now')),",
    '  CHECK (',
    "    (page_type = 'home' AND project_id IS NULL) OR",
    "    (page_type = 'project' AND project_id IS NOT NULL)",
    '  )',
    ')',
  ].join('\n'), { transaction })
  await sequelize.query([
    'CREATE TABLE page_sections (',
    '  id TEXT PRIMARY KEY NOT NULL,',
    '  page_id TEXT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,',
    '  section_key TEXT NOT NULL,',
    '  section_kind TEXT NOT NULL,',
    '  sort_order INTEGER NOT NULL CHECK (sort_order >= 0),',
    '  heading TEXT,',
    '  content_json TEXT NOT NULL,',
    "  created_at TEXT NOT NULL DEFAULT (datetime('now')),",
    "  updated_at TEXT NOT NULL DEFAULT (datetime('now')),",
    '  UNIQUE (page_id, section_key),',
    '  UNIQUE (page_id, sort_order)',
    ')',
  ].join('\n'), { transaction })
  await sequelize.query(
    'CREATE INDEX page_sections_page_order_idx ON page_sections (page_id, sort_order)',
    { transaction },
  )
}

const slugFor = (name: string): string => {
  const slug = name.toLowerCase().normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  if (!slug) throw new Error('Cannot derive a canonical slug from project name: ' + name)
  return slug
}

export const projectIdentityAndPageSchema = {
  id: '001-project-uuids-and-pages',
  up: async (sequelize: Sequelize, transaction: Transaction): Promise<void> => {
    const tables = await sequelize.query<TableRow>(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('Projects', 'projects')",
      { type: QueryTypes.SELECT, transaction },
    )
    const legacyTable = tables.find((table) => table.name === 'Projects')
    const currentTable = tables.find((table) => table.name === 'projects')

    if (legacyTable && currentTable) {
      throw new Error('Both Projects and projects tables exist; refusing an ambiguous migration.')
    }
    if (currentTable) {
      throw new Error('A projects table exists without migration 001 recorded; inspect it before continuing.')
    }

    if (legacyTable) {
      const legacyRows = await sequelize.query<LegacyProjectRow>(
        'SELECT id, name, description, version, status, url, accent, createdAt, updatedAt FROM Projects ORDER BY id',
        { type: QueryTypes.SELECT, transaction },
      )
      await sequelize.query(projectsTableSql('projects_new'), { transaction })

      for (const row of legacyRows) {
        await sequelize.query([
          'INSERT INTO projects_new',
          '  (id, legacy_id, slug, sort_order, name, description, version, status, url, accent, created_at, updated_at)',
          'VALUES',
          '  (:id, :legacyId, :slug, :sortOrder, :name, :description, :version, :status, :url, :accent, :createdAt, :updatedAt)',
        ].join('\n'), {
          replacements: {
            id: randomUUID(),
            legacyId: row.id,
            slug: slugFor(row.name),
            sortOrder: row.id,
            name: row.name,
            description: row.description,
            version: row.version,
            status: row.status,
            url: row.url,
            accent: row.accent,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          },
          transaction,
        })
      }

      await sequelize.query('ALTER TABLE Projects RENAME TO legacy_projects_v001', { transaction })
      await sequelize.query('ALTER TABLE projects_new RENAME TO projects', { transaction })
    } else {
      await sequelize.query(projectsTableSql('projects'), { transaction })
    }

    await createPageTables(sequelize, transaction)
  },
}
