export type PageType = 'home' | 'project'

export interface Page {
  id: string
  projectId: string | null
  slug: string
  pageType: PageType
  title: string | null
  metaDescription: string | null
  canonicalUrl: string | null
  seoTitle: string | null
  lede: string | null
  intro: string | null
  schemaType: string | null
  schemaJson: string | null
}
