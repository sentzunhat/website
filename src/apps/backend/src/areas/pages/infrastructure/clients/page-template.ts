export interface PageMetadata {
  title: string
  description: string
  canonicalUrl: string
  schema: unknown | null
  notFound: boolean
}

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

const replace = (html: string, pattern: RegExp, replacement: string): string =>
  html.replace(pattern, () => replacement)

export const applyPageMetadata = (html: string, metadata: PageMetadata): string => {
  const title = escapeHtml(metadata.title)
  const description = escapeHtml(metadata.description)
  const canonicalUrl = escapeHtml(metadata.canonicalUrl)
  let page = html

  page = replace(page, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  page = replace(
    page,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  )
  page = replace(
    page,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    metadata.notFound ? '' : `<link rel="canonical" href="${canonicalUrl}" />`,
  )
  page = replace(
    page,
    /<link rel="alternate" hreflang="en-ca" href="[^"]*"\s*\/?>/,
    metadata.notFound ? '' : `<link rel="alternate" hreflang="en-ca" href="${canonicalUrl}" />`,
  )
  page = replace(
    page,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
  )
  page = replace(
    page,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
  )
  page = replace(
    page,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    metadata.notFound ? '' : `<meta property="og:url" content="${canonicalUrl}" />`,
  )
  page = replace(
    page,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
  )
  page = replace(
    page,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`,
  )

  if (metadata.notFound) {
    page = replace(page, /<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex" />')
  }
  if (metadata.schema !== null || metadata.notFound) {
    page = replace(
      page,
      /<script type="application\/ld\+json" id="page-structured-data">[\s\S]*?<\/script>/,
      metadata.schema === null
        ? ''
        : `<script type="application/ld+json" id="page-structured-data">${safeJson(metadata.schema)}</script>`,
    )
  }
  return page
}

export const insertRenderedPage = (template: string, markup: string, projects: unknown[]): string => {
  const rootPattern = /<div id="root">[\s\S]*<\/div>\s*(?=<script>)/
  if (!rootPattern.test(template)) throw new Error('Built HTML is missing its application root')

  const state = `<script type="application/json" id="initial-page-state">${safeJson({ projects })}</script>`
  return replace(
    template,
    rootPattern,
    `<div id="root" data-ssr="true">${markup}</div>\n    ${state}\n    `,
  )
}
