import { FaArrowRight } from 'react-icons/fa'

import { explorations } from '../content/site'

export function Explorations() {
  return (
    <section className="pb-24 sm:pb-30" id="explorations">
      <div className="mb-7 flex flex-col items-start justify-between gap-5 border-b border-line pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2.5">In the studio</p>
          <h2 className="text-[2.125rem] font-semibold tracking-[-0.06em]">What comes next</h2>
        </div>
        <p className="max-w-64 text-[0.8125rem] leading-5 text-muted">Development work, prototypes, and questions we are still exploring.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {explorations.map((item) => (
          <a className={`exploration-card ${item.accent}`} href={`/projects/${item.slug}/`} key={item.name}>
            <div className="mb-8 flex items-center justify-between">
              <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-muted uppercase">{item.status}</span>
              <span className="exploration-dot" aria-hidden="true" />
            </div>
            <h3 className="mb-3 text-2xl font-semibold tracking-[-0.05em]">{item.name}</h3>
            <p className="text-sm leading-6 text-muted">{item.description}</p>
            <span className="exploration-link">
              Explore project
              <FaArrowRight className="ui-icon" aria-hidden="true" />
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
