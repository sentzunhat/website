import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { singleton } from '@sentzunhat/zacatl/third-party/dependency-injection/tsyringe'

import { applyPageMetadata, insertRenderedPage, type PageMetadata } from './page-template'
import type { Project } from '../../../projects/domain/entities/project'
import type { PageRendererPort, RenderedPage } from '../../domain/providers/render-page/port'

interface RendererModule {
  renderPage(path: string, projects: Project[]): {
    html: string
    metadata: PageMetadata
  }
}

const FRONTEND_ROOT = fileURLToPath(new URL('../../../../../../frontend/', import.meta.url))
const PUBLIC_ROOT = resolve(FRONTEND_ROOT, 'dist')
const SERVER_ENTRY = pathToFileURL(resolve(FRONTEND_ROOT, 'server-dist/entry-server.js')).href

@singleton()
export class ReactPageRendererAdapter implements PageRendererPort {
  private rendererPromise: Promise<RendererModule> | undefined

  public async render(path: string, projects: Project[]): Promise<RenderedPage> {
    const renderer = await this.loadRenderer()
    const result = renderer.renderPage(path, projects)
    const projectPath = path.match(/^\/projects\/([a-z0-9-]+)\/?$/)
    const templatePath = projectPath && !result.metadata.notFound
      ? resolve(PUBLIC_ROOT, 'projects', projectPath[1] ?? '', 'index.html')
      : resolve(PUBLIC_ROOT, 'index.html')
    const template = await readFile(templatePath, 'utf8')
    const html = insertRenderedPage(
      applyPageMetadata(template, result.metadata),
      result.html,
      projects,
    )

    return { html, notFound: result.metadata.notFound }
  }

  private async loadRenderer(): Promise<RendererModule> {
    this.rendererPromise ??= import(SERVER_ENTRY) as Promise<RendererModule>
    return this.rendererPromise
  }
}
