import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import type { FastifyInstance } from '@sentzunhat/zacatl/third-party/fastify'

import { listProjects } from './areas/projects/application/list-projects'

interface RenderProject {
  id: string
  slug: string
  name: string
  description: string
  version: string
  status: string
  url: string
  accent: string
}

interface PageMetadata {
  title: string
  description: string
  canonicalUrl: string
  schema: unknown | null
  notFound: boolean
}

interface PageRenderer {
  renderPage: (path: string, projects: RenderProject[]) => {
    html: string
    metadata: PageMetadata
  }
}

const frontendRoot = fileURLToPath(new URL('../../frontend/', import.meta.url))
const publicRoot = resolve(frontendRoot, 'dist')
const serverEntry = pathToFileURL(resolve(frontendRoot, 'server-dist/entry-server.js')).href

const escapeHtml = (value: string): string => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const safeJson = (value: unknown): string => JSON.stringify(value)
  .replaceAll('<', '\\u003c')
  .replaceAll('>', '\\u003e')
  .replaceAll('&', '\\u0026')

const replaceHead = (html: string, metadata: PageMetadata): string => {
  const title = escapeHtml(metadata.title)
  const description = escapeHtml(metadata.description)
  const url = escapeHtml(metadata.canonicalUrl)
  let page = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, metadata.notFound ? '' : `<link rel="canonical" href="${url}" />`)
    .replace(/<link rel="alternate" hreflang="en-ca" href="[^"]*"\s*\/?>/, metadata.notFound ? '' : `<link rel="alternate" hreflang="en-ca" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, metadata.notFound ? '' : `<meta property="og:url" content="${url}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)

  if (metadata.notFound) {
    page = page.replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex" />')
  }
  if (metadata.schema !== null || metadata.notFound) {
    page = page.replace(
      /<script type="application\/ld\+json" id="page-structured-data">[\s\S]*?<\/script>/,
      metadata.schema !== null
        ? `<script type="application/ld+json" id="page-structured-data">${safeJson(metadata.schema)}</script>`
        : '',
    )
  }
  return page
}

const replaceRoot = (html: string, markup: string, projects: RenderProject[]): string => {
  const pattern = /<div id="root">[\s\S]*<\/div>\s*(?=<script>)/
  if (!pattern.test(html)) throw new Error('Built HTML is missing its application root')
  const initialState = `<script type="application/json" id="initial-page-state">${safeJson({ projects })}</script>`
  return html.replace(pattern, `<div id="root" data-ssr="true">${markup}</div>\n    ${initialState}\n    `)
}

const loadRenderer = async (): Promise<PageRenderer> => import(serverEntry) as Promise<PageRenderer>

const renderResponse = async (path: string): Promise<{ html: string; notFound: boolean }> => {
  const projects = (await listProjects()).map((project) => ({
    id: project.id,
    slug: project.slug,
    name: project.name,
    description: project.description,
    version: project.version,
    status: project.status,
    url: project.url,
    accent: project.accent,
  }))
  const { renderPage } = await loadRenderer()
  const result = renderPage(path, projects)
  const match = path.match(/^\/projects\/([a-z0-9-]+)\/$/)
  const templatePath = match && !result.metadata.notFound
    ? resolve(publicRoot, 'projects', match[1] ?? '', 'index.html')
    : resolve(publicRoot, 'index.html')
  const template = await readFile(templatePath, 'utf8')
  return {
    html: replaceRoot(replaceHead(template, result.metadata), result.html, projects),
    notFound: result.metadata.notFound,
  }
}

export const registerPageRoutes = (app: FastifyInstance): void => {
  app.get('/', async (_request, reply) => {
    const page = await renderResponse('/')
    return reply.header('Cache-Control', 'no-cache').type('text/html').send(page.html)
  })

  app.get<{ Params: { slug: string } }>('/projects/:slug', async (request, reply) => {
    const slug = request.params.slug
    if (!/^[a-z0-9-]+$/.test(slug)) return reply.code(404).send()
    const page = await renderResponse(`/projects/${slug}/`)
    return reply.code(page.notFound ? 404 : 200)
      .header('Cache-Control', 'no-cache').type('text/html').send(page.html)
  })
}
