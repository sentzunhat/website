import { ProjectModel } from '../models/project-model'

const INITIAL_PROJECTS = [
  {
    slug: 'hawp',
    sortOrder: 1,
    name: 'HAWP',
    description: 'A durable, human-led workflow protocol for building with AI.',
    version: '0.0.23',
    status: 'Published',
    url: 'https://github.com/sentzunhat/human-ai-workflow-protocol/releases/tag/0.0.23',
    accent: 'coral',
  },
  {
    slug: 'zacatl',
    sortOrder: 2,
    name: 'Zacatl',
    description: 'A blazing-fast, minimal, straightforward library for practical services.',
    version: '0.0.61',
    status: 'Published',
    url: 'https://github.com/sentzunhat/zacatl/releases/tag/v0.0.61',
    accent: 'violet',
  },
]

export const seedProjects = async (): Promise<void> => {
  await ProjectModel.bulkCreate(INITIAL_PROJECTS, { ignoreDuplicates: true })
}
