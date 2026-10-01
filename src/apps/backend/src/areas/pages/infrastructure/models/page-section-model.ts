import {
  DataTypes,
  SequelizeModel,
  type Sequelize,
} from '@sentzunhat/zacatl/third-party/databases/sequelize'

export class PageSectionModel extends SequelizeModel {
  declare id: string
  declare pageId: string
  declare sectionKey: string
  declare sectionKind: string
  declare sortOrder: number
  declare heading: string | null
  declare contentJson: string
}

export const initializePageSectionModel = (sequelize: Sequelize): void => {
  PageSectionModel.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pageId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'page_id',
      references: { model: 'pages', key: 'id' },
      onDelete: 'CASCADE',
    },
    sectionKey: { type: DataTypes.STRING, allowNull: false, field: 'section_key' },
    sectionKind: { type: DataTypes.STRING, allowNull: false, field: 'section_kind' },
    sortOrder: { type: DataTypes.INTEGER, allowNull: false, field: 'sort_order' },
    heading: { type: DataTypes.TEXT, allowNull: true },
    contentJson: { type: DataTypes.TEXT, allowNull: false, field: 'content_json' },
  }, {
    sequelize,
    modelName: 'PageSection',
    tableName: 'page_sections',
    timestamps: true,
    underscored: true,
    indexes: [
      { unique: true, fields: ['page_id', 'section_key'] },
      { unique: true, fields: ['page_id', 'sort_order'] },
    ],
  })
}
