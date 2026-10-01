import {
  DataTypes,
  SequelizeModel,
  type Sequelize,
} from '@sentzunhat/zacatl/third-party/databases/sequelize'

export class PageModel extends SequelizeModel {
  declare id: string
  declare projectId: string | null
  declare slug: string
  declare pageType: 'home' | 'project'
  declare title: string | null
  declare metaDescription: string | null
  declare canonicalUrl: string | null
  declare seoTitle: string | null
  declare lede: string | null
  declare intro: string | null
  declare schemaType: string | null
  declare schemaJson: string | null
}

export const initializePageModel = (sequelize: Sequelize): void => {
  PageModel.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    projectId: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      field: 'project_id',
      references: { model: 'projects', key: 'id' },
      onDelete: 'CASCADE',
    },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    pageType: {
      type: DataTypes.ENUM('home', 'project'),
      allowNull: false,
      field: 'page_type',
      validate: { isIn: [['home', 'project']] },
    },
    title: { type: DataTypes.TEXT, allowNull: true },
    metaDescription: { type: DataTypes.TEXT, allowNull: true, field: 'meta_description' },
    canonicalUrl: { type: DataTypes.TEXT, allowNull: true, field: 'canonical_url' },
    seoTitle: { type: DataTypes.TEXT, allowNull: true, field: 'seo_title' },
    lede: { type: DataTypes.TEXT, allowNull: true },
    intro: { type: DataTypes.TEXT, allowNull: true },
    schemaType: { type: DataTypes.STRING, allowNull: true, field: 'schema_type' },
    schemaJson: { type: DataTypes.TEXT, allowNull: true, field: 'schema_json' },
  }, {
    sequelize,
    modelName: 'Page',
    tableName: 'pages',
    timestamps: true,
    underscored: true,
  })
}
