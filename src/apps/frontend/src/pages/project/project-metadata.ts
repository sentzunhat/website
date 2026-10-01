/* eslint-disable @typescript-eslint/naming-convention -- Schema.org JSON-LD requires @ keys. */
import projectContent from '../../content/project-pages.json'
import type { Project } from '../../types'

export interface ProjectLink {
  label: string
  url: string
  kind: 'external' | 'github' | 'npm'
}

interface ProjectSection {
  heading: string
  paragraphs: string[]
  items?: string[]
}

interface ProjectFaq {
  question: string
  answer: string
}

export interface ProjectPageContent {
  slug: string
  name: string
  category: string
  status: string
  seoTitle: string
  metaDescription: string
  lede: string
  intro: string
  sections: ProjectSection[]
  faq: ProjectFaq[]
  links: ProjectLink[]
  schemaType: string
  schema: Record<string, string>
}

export const content = projectContent as {
  lastReviewed: string
  projects: ProjectPageContent[]
}

export const findLiveProject = (project: ProjectPageContent, liveProjects: Project[]): Project | undefined =>
  liveProjects.find((item) => item.name.toLowerCase() === project.slug)

export const projectSchema = (project: ProjectPageContent, liveProject?: Project): Record<string, unknown> => {
  const url = `https://sentzunhat.com/projects/${project.slug}/`
  const organizationId = 'https://sentzunhat.com/#organization'
  const websiteId = 'https://sentzunhat.com/#website'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Corporation',
        '@id': organizationId,
        name: 'Sentzunhat Corp.',
        url: 'https://sentzunhat.com/',
        logo: 'https://sentzunhat.com/sentzunhat-logo.svg',
        sameAs: ['https://github.com/sentzunhat'],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: 'https://sentzunhat.com/',
        name: 'Sentzunhat Corp.',
        publisher: { '@id': organizationId },
        inLanguage: 'en-CA',
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: project.seoTitle,
        description: project.metaDescription,
        isPartOf: { '@id': websiteId },
        about: { '@id': `${url}#project` },
        dateModified: content.lastReviewed,
        inLanguage: 'en-CA',
      },
      {
        '@type': project.schemaType,
        '@id': `${url}#project`,
        name: project.name,
        description: project.intro,
        url,
        ...(project.schemaType === 'Project'
          ? { parentOrganization: { '@id': organizationId } }
          : { creator: { '@id': organizationId } }),
        ...project.schema,
        ...(liveProject ? { version: liveProject.version } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Sentzunhat',
            item: 'https://sentzunhat.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: project.name,
            item: url,
          },
        ],
      },
    ],
  }
}

export const getProjectMetadata = (slug: string, liveProjects: Project[]): {
  title: string
  description: string
  canonicalUrl: string
  schema: Record<string, unknown> | null
  notFound: boolean
} => {
  const project = content.projects.find((item) => item.slug === slug)
  if (!project) return {
    title: 'Project not found | Sentzunhat',
    description: 'The requested Sentzunhat project page does not exist.',
    canonicalUrl: '',
    schema: null,
    notFound: true,
  }

  const canonicalUrl = `https://sentzunhat.com/projects/${project.slug}/`
  return {
    title: project.seoTitle,
    description: project.metaDescription,
    canonicalUrl,
    schema: projectSchema(project, findLiveProject(project, liveProjects)),
    notFound: false,
  }
}
