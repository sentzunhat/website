export type Theme = 'system' | 'light' | 'dark'

export interface Project {
  id?: number
  name: string
  description: string
  version: string
  status: string
  url: string
  accent: 'coral' | 'violet'
}

export interface Exploration {
  name: string
  status: string
  description: string
  accent: 'aqua' | 'green' | 'sky'
}

export interface Principle {
  number: string
  title: string
  description: string
}
