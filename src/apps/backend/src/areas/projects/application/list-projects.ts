import { Project } from '../infrastructure/project-model'

export const listProjects = async (): Promise<Project[]> => Project.findAll({
  order: [['sortOrder', 'ASC']],
  attributes: ['id', 'slug', 'name', 'description', 'version', 'status', 'url', 'accent'],
  raw: true,
})
