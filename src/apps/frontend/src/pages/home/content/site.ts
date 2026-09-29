import type { Exploration, Principle, Project } from '../../../types'

export const fallbackProjects: Project[] = [
  {
    name: 'HAWP',
    description: 'A durable, human-led workflow protocol for building with AI.',
    version: '0.0.23',
    status: 'Published',
    url: 'https://github.com/sentzunhat/human-ai-workflow-protocol/releases/tag/0.0.23',
    accent: 'coral',
  },
  {
    name: 'Zacatl',
    description: 'A blazing-fast, minimal, straightforward library for practical services.',
    version: '0.0.61',
    status: 'Published',
    url: 'https://github.com/sentzunhat/zacatl/releases/tag/v0.0.61',
    accent: 'violet',
  },
]

export const explorations: Exploration[] = [
  {
    name: 'Tekit',
    status: 'Prototype',
    description: 'Exploring clearer ways to find and understand files spread across cloud providers.',
    accent: 'sky',
  },
  {
    name: 'Chiwakal',
    status: 'Active prototype',
    description: 'A local-first notes and knowledge workspace with voice, transcription, and reviewable AI assistance.',
    accent: 'aqua',
  },
  {
    name: 'Noyolo',
    status: 'Validation',
    description: 'Researching how mobility simulations could reduce uncertainty before a road or transit change happens.',
    accent: 'green',
  },
]

export const principles: Principle[] = [
  {
    number: '01',
    title: 'Keep people in control',
    description: 'Software should make important actions understandable and leave meaningful decisions with the person using it.',
  },
  {
    number: '02',
    title: 'Make ownership real',
    description: 'Privacy, portability, and local-first promises should come from how a product is built, not only from policy language.',
  },
  {
    number: '03',
    title: 'Build the smallest truthful thing',
    description: 'We distinguish what works today from what we are developing next, and prefer focused products to premature platforms.',
  },
]
