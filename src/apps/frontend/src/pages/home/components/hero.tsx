import { useMemo } from 'react'
import { FaArrowDown } from 'react-icons/fa'

import { SolarSystem } from './solar-system'
import type { Project } from '../../../types'
import { commercialProject, explorations } from '../content/site'

const EnergyPaths = () => (
  <>
    <path d="M-40 126h160v-42h58v84h58V84h58v42h168v82h74v-42h74v42h168v-82h74v42h74v-42h184" />
    <path d="M-24 332h162l58-58 58 58h148l58 58 58-58h148l58-58 58 58h148l58 58 58-58h160" />
    <path d="M-40 548h188v-66h70v66h174V430h78v118h172v-66h72v66h174V430h78v118h194" />
    <path d="M42 676l76-76 76 76 76-76 76 76 76-76 76 76 76-76 76 76 76-76 76 76 76-76 76 76 76-76 76 76" />
  </>
)

export function Hero({ projects }: { projects: Project[] }) {
  const universeProjects = useMemo(
    () => [commercialProject, ...projects, ...explorations],
    [projects],
  )
  return (
    <section className="hero py-25 sm:py-36" id="top">
      <svg
        className="hero-lines"
        viewBox="0 0 1200 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-energy-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--aqua)" stopOpacity="0.1" />
            <stop offset="45%" stopColor="var(--sky)" stopOpacity="0.95" />
            <stop offset="70%" stopColor="var(--primary)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        <g className="hero-line-base">
          <EnergyPaths />
        </g>
        <g className="hero-line-energy">
          <EnergyPaths />
        </g>

        <g className="hero-nodes">
          <circle cx="178" cy="168" r="13" />
          <circle cx="724" cy="332" r="10" />
          <circle cx="938" cy="548" r="15" />
          <circle className="hero-node-core" cx="178" cy="168" r="3.5" />
          <circle className="hero-node-core" cx="724" cy="332" r="3" />
          <circle className="hero-node-core" cx="938" cy="548" r="4" />
        </g>
      </svg>

      <div className="hero-copy">
        <p className="eyebrow">Independent software company · Winnipeg, Manitoba</p>
        <h1 className="mb-7 max-w-3xl text-[clamp(3.4rem,8vw,6rem)] leading-[0.98] font-semibold tracking-[-0.075em]">
          Small tools.<br />
          <em className="font-sans font-normal italic text-muted">Thoughtfully made.</em>
        </h1>
        <p className="mb-8 max-w-xl text-[1.0625rem] leading-7 text-muted">
          Sentzunhat builds focused products and reusable foundations that give
          people more control over their technology and data.
        </p>
        <div className="hero-actions">
          <a className="hero-primary" href="#focus">
            See what we are building
            <FaArrowDown className="ui-icon action-icon" aria-hidden="true" />
          </a>
          <a className="hero-secondary" href="#about">
            Why Sentzunhat
            <FaArrowDown className="ui-icon action-icon" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="hero-card">
        <SolarSystem projects={universeProjects} />
      </div>
    </section>
  )
}
