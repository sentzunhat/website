import {
  DataTypes,
  SequelizeModel,
  type Sequelize,
} from '@sentzunhat/zacatl/third-party/databases/sequelize'

export class Project extends SequelizeModel {
  declare id: number
  declare name: string
  declare description: string
  declare version: string
  declare status: string
  declare url: string
  declare accent: string
}

export const initProject = (sequelize: Sequelize): void => {
  Project.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
    version: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    accent: { type: DataTypes.STRING, allowNull: false },
  }, { sequelize, modelName: 'Project' })
}

export const seedProjects = async (): Promise<void> => {
  await Project.bulkCreate([
    {
      name: 'HAWP',
      description: 'A durable, human-led workflow protocol for building with AI.',
      version: '0.0.23',
      status: 'Published',
      url: 'https://github.com/sentzunhat/human-ai-workflow-protocol/releases/tag/0.0.23',
      accent: 'coral',
    },
    {
      name: 'Zacatl',
      description: 'A blazing-fast, minimal, straightforward library for practical services.',
      version: '0.0.61',
      status: 'Published',
      url: 'https://github.com/sentzunhat/zacatl/releases/tag/v0.0.61',
      accent: 'violet',
    },
  ], { ignoreDuplicates: true })
}
