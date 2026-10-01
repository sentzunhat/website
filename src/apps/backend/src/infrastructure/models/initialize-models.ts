import type { Sequelize } from '@sentzunhat/zacatl/third-party/databases/sequelize'

import { initializePageModel, PageModel } from '../../areas/pages/infrastructure/models/page-model'
import { initializePageSectionModel, PageSectionModel } from '../../areas/pages/infrastructure/models/page-section-model'
import { initializeProjectModel, ProjectModel } from '../../areas/projects/infrastructure/models/project-model'

export const initializeModels = (sequelize: Sequelize): void => {
  initializeProjectModel(sequelize)
  initializePageModel(sequelize)
  initializePageSectionModel(sequelize)

  ProjectModel.hasOne(PageModel, { foreignKey: 'projectId', as: 'page', onDelete: 'CASCADE' })
  PageModel.belongsTo(ProjectModel, { foreignKey: 'projectId', as: 'project' })
  PageModel.hasMany(PageSectionModel, { foreignKey: 'pageId', as: 'sections', onDelete: 'CASCADE' })
  PageSectionModel.belongsTo(PageModel, { foreignKey: 'pageId', as: 'page' })
}
