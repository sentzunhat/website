import {
  DataTypes,
  SequelizeModel,
  type Sequelize,
} from '@sentzunhat/zacatl/third-party/databases/sequelize'

export class ProjectModel extends SequelizeModel {
  declare id: string
  declare slug: string
  declare sortOrder: number
  declare name: string
  declare description: string
  declare version: string
  declare status: string
  declare url: string
  declare accent: string
}

export const initializeProjectModel = (sequelize: Sequelize): void => {
  ProjectModel.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, field: 'sort_order' },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    version: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.TEXT, allowNull: false },
    accent: { type: DataTypes.STRING(32), allowNull: false },
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
    underscored: true,
  })
}
