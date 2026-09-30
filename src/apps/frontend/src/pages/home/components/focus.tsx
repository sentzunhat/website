import { FaArrowRight } from 'react-icons/fa'

import { commercialProject } from '../content/site'

export function Focus() {
  return (
    <section className="pb-24 sm:pb-30" id="focus">
      <div className="mb-7 flex flex-col items-start justify-between gap-5 border-b border-line pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2.5">Current focus</p>
          <h2 className="text-[2.125rem] font-semibold tracking-[-0.06em]">Your memories, yours to keep.</h2>
        </div>
        <p className="max-w-64 text-[0.8125rem] leading-5 text-muted">{commercialProject.name} is the current commercial product.</p>
      </div>
      <article className="focus-card group relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-10">
        <div className="focus-card-glow" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="status-pill primary">Preparing for release</span>
            <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase">macOS first</span>
          </div>
          <h3 className="mb-4 text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{commercialProject.name}</h3>
          <p className="mb-7 max-w-xl text-base leading-7 text-muted">
            A local-first application for importing, preserving, exploring,
            organizing, and exporting social archives you downloaded yourself.
            Private, offline, and designed to keep your memories in your hands.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase">
            <span>Local processing</span>
            <span>No direct account connection</span>
            <span>One-time purchase</span>
          </div>
          <a className="project-inline-link" href={`/projects/${commercialProject.slug}/`}>
            Explore Mochilada
            <FaArrowRight className="ui-icon" aria-hidden="true" />
          </a>
        </div>
      </article>
    </section>
  )
}
