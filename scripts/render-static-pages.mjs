import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const repositoryRoot = dirname(scriptsDirectory)
const frontendRoot = join(repositoryRoot, 'src', 'apps', 'frontend')
const distRoot = join(frontendRoot, 'dist')
const indexPath = join(distRoot, 'index.html')
const projectDataPath = join(frontendRoot, 'src', 'content', 'project-pages.json')

const [baseHtml, projectDataRaw] = await Promise.all([
  readFile(indexPath, 'utf8'),
  readFile(projectDataPath, 'utf8'),
])

const projectData = JSON.parse(projectDataRaw)

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const replaceRoot = (html, markup) => {
  const pattern = /<div id="root">[\s\S]*<\/div>\s*<script>/
  if (!pattern.test(html)) {
    throw new Error('Unable to locate the application root in the built index.html')
  }
  return html.replace(pattern, `<div id="root">${markup}</div>\n    <script>`)
}

const replaceHeadValue = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`Unable to replace ${label}`)
  return html.replace(pattern, replacement)
}

const replaceProjectHead = (html, project) => {
  const url = `https://sentzunhat.com/projects/${project.slug}/`
  const title = project.seoTitle
  const schemaEntity = {
    '@type': project.schemaType,
    '@id': `${url}#project`,
    name: project.name,
    description: project.intro,
    url,
    ...(project.schemaType === 'Project'
      ? { parentOrganization: { '@id': 'https://sentzunhat.com/#organization' } }
      : { creator: { '@id': 'https://sentzunhat.com/#organization' } }),
    ...project.schema,
  }
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Corporation',
        '@id': 'https://sentzunhat.com/#organization',
        name: 'Sentzunhat Corp.',
        url: 'https://sentzunhat.com/',
        logo: 'https://sentzunhat.com/sentzunhat-logo.svg',
        sameAs: ['https://github.com/sentzunhat'],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sentzunhat.com/#website',
        url: 'https://sentzunhat.com/',
        name: 'Sentzunhat Corp.',
        publisher: { '@id': 'https://sentzunhat.com/#organization' },
        inLanguage: 'en-CA',
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description: project.metaDescription,
        isPartOf: { '@id': 'https://sentzunhat.com/#website' },
        about: { '@id': `${url}#project` },
        dateModified: projectData.lastReviewed,
        inLanguage: 'en-CA',
      },
      schemaEntity,
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

  let result = html
  result = replaceHeadValue(result, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`, 'title')
  result = replaceHeadValue(
    result,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(project.metaDescription)}" />`,
    'meta description',
  )
  result = replaceHeadValue(
    result,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${url}" />`,
    'canonical URL',
  )
  result = replaceHeadValue(
    result,
    /<link rel="alternate" hreflang="en-ca" href="[^"]*"\s*\/?>/,
    `<link rel="alternate" hreflang="en-ca" href="${url}" />`,
    'alternate URL',
  )
  result = replaceHeadValue(
    result,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    'Open Graph title',
  )
  result = replaceHeadValue(
    result,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(project.metaDescription)}" />`,
    'Open Graph description',
  )
  result = replaceHeadValue(
    result,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${url}" />`,
    'Open Graph URL',
  )
  result = replaceHeadValue(
    result,
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    'Twitter title',
  )
  result = replaceHeadValue(
    result,
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(project.metaDescription)}" />`,
    'Twitter description',
  )
  result = replaceHeadValue(
    result,
    /<script type="application\/ld\+json" id="page-structured-data">[\s\S]*?<\/script>/,
    `<script type="application/ld+json" id="page-structured-data">\n${JSON.stringify(schema, null, 2)}\n    </script>`,
    'structured data',
  )
  return result
}

const renderProjectLinks = (projects, currentSlug) => projects
  .filter((project) => project.slug !== currentSlug)
  .slice(0, 3)
  .map((project) => `
        <a href="/projects/${escapeHtml(project.slug)}/">
          <strong>${escapeHtml(project.name)}</strong>
          <span>${escapeHtml(project.status)}</span>
        </a>`)
  .join('')

const renderProject = (project) => {
  const sections = project.sections.map((section, index) => `
      <section class="prerender-section">
        <p class="prerender-index">${String(index + 1).padStart(2, '0')}</p>
        <div>
          <h2>${escapeHtml(section.heading)}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
          ${section.items?.length
            ? `<ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
            : ''}
        </div>
      </section>`).join('')

  const faq = project.faq.map((item) => `
        <article>
          <h3>${escapeHtml(item.question)}</h3>
          <p>${escapeHtml(item.answer)}</p>
        </article>`).join('')

  const links = project.links.length
    ? `<nav class="prerender-source-links" aria-label="${escapeHtml(project.name)} sources">
        ${project.links.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join('')}
      </nav>`
    : ''

  return `
    <article class="prerender-page project-prerender">
      <header class="prerender-hero">
        <a class="prerender-back" href="/">Sentzunhat</a>
        <p class="eyebrow">${escapeHtml(project.category)} · ${escapeHtml(project.status)}</p>
        <h1>${escapeHtml(project.name)}</h1>
        <p class="prerender-lede">${escapeHtml(project.lede)}</p>
        <p>${escapeHtml(project.intro)}</p>
        ${links}
      </header>
      <div class="prerender-sections">${sections}</div>
      <section class="prerender-faq">
        <p class="eyebrow">Questions and answers</p>
        <h2>What should you know about ${escapeHtml(project.name)}?</h2>
        <div class="prerender-faq-grid">${faq}</div>
      </section>
      <section class="prerender-related">
        <p class="eyebrow">More from Sentzunhat</p>
        <h2>Explore related projects</h2>
        <div class="prerender-related-grid">${renderProjectLinks(projectData.projects, project.slug)}</div>
      </section>
    </article>`
}

const renderHome = () => {
  const projectLinks = projectData.projects.map((project) => `
        <a href="/projects/${escapeHtml(project.slug)}/">
          <strong>${escapeHtml(project.name)}</strong>
          <span>${escapeHtml(project.status)}</span>
        </a>`).join('')

  return `
    <div class="prerender-page home-prerender">
      <header class="prerender-hero" id="top">
        <p class="eyebrow">Independent company · Winnipeg, Manitoba</p>
        <h1>Small tools. Thoughtfully made.</h1>
        <p class="prerender-lede">Sentzunhat Corp. builds focused software products and reusable engineering foundations that give people more control over their technology and data.</p>
        <p>Sentzunhat is a founder-led company based in Winnipeg, Manitoba. The company combines commercial product work with public engineering foundations and clearly labelled prototypes. The goal is not to make one enormous platform. It is to build focused tools around understandable boundaries, privacy-conscious architecture, portable data, and human-directed AI workflows.</p>
      </header>
      <section class="prerender-section" id="focus">
        <p class="prerender-index">01</p>
        <div>
          <h2>What is Sentzunhat building now?</h2>
          <p>Mochilada is the current commercial focus. It is a local-first application for importing, preserving, exploring, organizing, and exporting social archives that a person downloaded themselves. The public launch direction is macOS first with local processing, no direct social-account connection in the launch flow, and a one-time purchase model.</p>
          <p>Other Sentzunhat work includes public foundations and clearly labelled prototypes. Each project now has its own crawlable page so people and search systems can understand what is released, what is still being validated, and what Sentzunhat is not claiming yet.</p>
        </div>
      </section>
      <section class="prerender-section">
        <p class="prerender-index">02</p>
        <div>
          <h2>Which Sentzunhat projects are public?</h2>
          <p>HAWP, the Human-AI Workflow Protocol, is an open-source task-shaping protocol for carrying mission, context, constraints, and expected output across AI-assisted work. Zacatl is an open-source TypeScript framework for keeping service boundaries visible around application logic, infrastructure, validation, dependency injection, and adapters.</p>
          <p>Both projects publish source code and release evidence on GitHub. Their dedicated pages link back to those primary sources instead of turning repository claims into unsupported marketing language.</p>
        </div>
      </section>
      <section class="prerender-section">
        <p class="prerender-index">03</p>
        <div>
          <h2>What is still being explored?</h2>
          <p>Tekit explores clearer ways to find and understand files spread across cloud providers. Chiwakal is a local-first notes and knowledge workspace prototype with voice, transcription, and reviewable AI assistance. Noyolo is validating a Winnipeg transportation-planning problem around overlapping construction and mobility disruptions, data preparation, and scenario comparison.</p>
          <p>Those pages intentionally use terms such as prototype and validation. Sentzunhat's public standard is to separate verified behavior from future direction so a roadmap does not become a promise by accident.</p>
        </div>
      </section>
      <section class="prerender-section">
        <p class="prerender-index">04</p>
        <div>
          <h2>How does Sentzunhat approach software?</h2>
          <p>Three principles guide the work: keep people in control, make ownership real through architecture rather than policy language alone, and build the smallest truthful thing. Products may share engineering foundations, but they should stay understandable as individual tools instead of being forced into one premature platform.</p>
          <p>Sentzunhat also publishes public engineering work where that is useful. The company GitHub organization provides direct evidence for the open-source projects and gives technical readers a place to inspect code, releases, documentation, and benchmarks.</p>
        </div>
      </section>
      <nav class="prerender-project-grid" aria-label="Sentzunhat project pages">${projectLinks}</nav>
      <p class="prerender-source-note">Public engineering source: <a href="https://github.com/sentzunhat">Sentzunhat on GitHub</a>.</p>
    </div>`
}

await writeFile(indexPath, replaceRoot(baseHtml, renderHome()))

for (const project of projectData.projects) {
  const directory = join(distRoot, 'projects', project.slug)
  await mkdir(directory, { recursive: true })
  const projectHtml = replaceRoot(replaceProjectHead(baseHtml, project), renderProject(project))
  await writeFile(join(directory, 'index.html'), projectHtml)
}

console.log(`Rendered homepage plus ${projectData.projects.length} project pages.`)
