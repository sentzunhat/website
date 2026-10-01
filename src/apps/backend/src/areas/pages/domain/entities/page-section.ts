export interface PageSection {
  id: string
  pageId: string
  sectionKey: string
  sectionKind: string
  sortOrder: number
  heading: string | null
  contentJson: string
}
