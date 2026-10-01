import { renderToString } from 'react-dom/server'

import App from './app/app'
import { ProjectPage } from './pages/project/project'
import { getProjectMetadata } from './pages/project/project-metadata'
import type { Project } from './types'

const homeMetadata = {
  title: 'Sentzunhat | Small tools, thoughtfully made.',
  description: 'Sentzunhat Corp. builds focused software products and reusable foundations that give people more control over their technology and data.',
  canonicalUrl: 'https://sentzunhat.com/',
  schema: null,
  notFound: false,
}

export const renderPage = (path: string, projects: Project[]) => {
  const match = path.replace(/\/+$/, '').match(/^\/projects\/([^/]+)$/)
  const metadata = match?.[1]
    ? getProjectMetadata(decodeURIComponent(match[1]), projects)
    : homeMetadata

  return {
    html: renderToString(
      <App path={path} initialProjects={projects} projectPageComponent={ProjectPage} />,
    ),
    metadata,
  }
}
