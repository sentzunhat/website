import cors from 'cors'
import express from 'express'
import { DataTypes, Sequelize } from 'sequelize'

const app = express()
const port = process.env.PORT || 3001
const sequelize = new Sequelize({ dialect: 'sqlite', storage: process.env.DATABASE_PATH || './data/website.sqlite', logging: false })
const Project = sequelize.define('Project', { name: { type: DataTypes.STRING, unique: true }, description: DataTypes.STRING, version: DataTypes.STRING, status: DataTypes.STRING, url: DataTypes.STRING, accent: DataTypes.STRING })

app.use(cors())
app.use(express.json())
app.get('/api/health', (_request, response) => response.json({ ok: true }))
app.get('/api/projects', async (_request, response) => response.json(await Project.findAll({ order: [['id', 'ASC']], attributes: { exclude: ['createdAt', 'updatedAt'] }, raw: true })))

await sequelize.sync()
await Project.bulkCreate([
  { name: 'HAWP', description: 'A durable, human-led workflow protocol for building with AI.', version: '0.0.23', status: 'Published', url: 'https://github.com/sentzunhat/human-ai-workflow-protocol/releases/tag/0.0.23', accent: 'coral' },
  { name: 'Zacatl', description: 'A blazing-fast, minimal, straightforward library for practical services.', version: '0.0.61', status: 'Published', url: 'https://github.com/sentzunhat/zacatl/releases/tag/v0.0.61', accent: 'violet' },
], { ignoreDuplicates: true })
app.listen(port, () => console.log(`website API listening on http://localhost:${port}`))
