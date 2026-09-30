import { useEffect } from 'react'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaGithub,
  FaInfoCircle,
  FaNpm,
} from 'react-icons/fa'

import projectContent from '../../content/project-pages.json'

type ProjectLink = {
  label: string
  url: string
  kind: 'external' | 'github' | 'npm'
}

type ProjectSection = {
  heading: string
  paragraphs: string[]
  items?: string[]
}

type ProjectFaq = {
  question: string
  answer: string
}

type ProjectPageContent = {
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

const content = projectContent as {
  lastReviewed: string
  projects: ProjectPageContent[]
}

const setMeta = (selector: string, attribute: 'content' | 'href', value: string) => {
  const element = document.head.querySelector<HTMLElement>(selector)
  element?.setAttribute(attribute, value)
}

const projectSchema = (project: ProjectPageContent) => {
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

const updateStructuredData = (project: ProjectPageContent) => {
  let script = document.getElementById('page-structured-data') as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'page-structured-data'
    document.head.append(script)
  }
  script.textContent = JSON.stringify(projectSchema(project))
}

const ExternalLinkIcon = ({ kind }: { kind: ProjectLink['kind'] }) => {
  if (kind === 'github') return <FaGithub className="ui-icon" aria-hidden="true" />
  if (kind === 'npm') return <FaNpm className="ui-icon" aria-hidden="true" />
  return <FaExternalLinkAlt className="ui-icon" aria-hidden="true" />
}

export function ProjectPage({ slug }: { slug: string }) {
  const project = content.projects.find((item) => item.slug === slug)

  useEffect(() => {
    if (!project) {
      document.title = 'Project not found | Sentzunhat'
      return
    }

    const url = `https://sentzunhat.com/projects/${project.slug}/`
    document.title = project.seoTitle
    setMeta('meta[name="description"]', 'content', project.metaDescription)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('link[rel="alternate"][hreflang="en-ca"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', project.seoTitle)
    setMeta('meta[property="og:description"]', 'content', project.metaDescription)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[name="twitter:title"]', 'content', project.seoTitle)
    setMeta('meta[name="twitter:description"]', 'content', project.metaDescription)
    updateStructuredData(project)
  }, [project])

  if (!project) {
    return (
      <section className="project-page project-not-found" aria-labelledby="project-not-found-title">
        <p className="eyebrow">Project directory</p>
        <h1 id="project-not-found-title">Project not found.</h1>
        <p>The requested Sentzunhat project page does not exist.</p>
        <a className="project-back-link" href="/">
          <FaArrowLeft className="ui-icon" aria-hidden="true" />
          Back to Sentzunhat
        </a>
      </section>
    )
  }

  const related = content.projects.filter((item) => item.slug !== project.slug).slice(0, 3)

  return (
    <article className="project-page">
      <header className="project-page-hero">
        <a className="project-back-link" href="/">
          <FaArrowLeft className="ui-icon" aria-hidden="true" />
          Sentzunhat
        </a>
        <div className="project-page-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h1>{project.name}</h1>
        <p className="project-page-lede">{project.lede}</p>
        <p className="project-page-intro">{project.intro}</p>
        {project.links.length > 0 && (
          <div className="project-external-links" aria-label={`${project.name} links`}>
            {project.links.map((link) => (
              <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                <ExternalLinkIcon kind={link.kind} />
                {link.label}
                <FaExternalLinkAlt className="ui-icon link-trailing-icon" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="project-page-body">
        {project.sections.map((section, index) => (
          <section className="project-detail-section" key={section.heading}>
            <div className="project-detail-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && (
                <ul className="project-fact-list">
                  {section.items.map((item) => (
                    <li key={item}>
                      <FaCheckCircle className="ui-icon" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <section className="project-faq" aria-labelledby="project-faq-title">
        <div className="project-section-heading">
          <FaInfoCircle className="ui-icon" aria-hidden="true" />
          <div>
            <p className="eyebrow">Questions and answers</p>
            <h2 id="project-faq-title">What should you know about {project.name}?</h2>
          </div>
        </div>
        <div className="project-faq-grid">
          {project.faq.map((item) => (
            <article key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-related" aria-labelledby="related-projects-title">
        <p className="eyebrow">More from Sentzunhat</p>
        <h2 id="related-projects-title">Explore related projects</h2>
        <div className="project-related-grid">
          {related.map((item) => (
            <a href={`/projects/${item.slug}/`} key={item.slug}>
              <span>
                <strong>{item.name}</strong>
                <small>{item.status}</small>
              </span>
              <FaArrowRight className="ui-icon" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </article>
  )
}
