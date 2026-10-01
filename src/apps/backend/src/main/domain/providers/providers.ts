import { pageProviders } from '../../../areas/pages/domain/providers/providers'
import { projectProviders } from '../../../areas/projects/domain/providers/providers'

export const domainProviders = [...pageProviders, ...projectProviders]
