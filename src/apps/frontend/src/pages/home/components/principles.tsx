import { principles } from '../content/site'

export function Principles() {
  return (
    <section className="pb-24 sm:pb-30" id="principles">
      <div className="mb-7 flex flex-col items-start justify-between gap-5 border-b border-line pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-2.5">How we build</p>
          <h2 className="text-[2.125rem] font-semibold tracking-[-0.06em]">Principles before promises.</h2>
        </div>
        <p className="max-w-64 text-[0.8125rem] leading-5 text-muted">A practical standard for product and engineering decisions.</p>
      </div>
      <div className="principles-grid">
        {principles.map((principle) => (
          <article className="principle-card" key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
