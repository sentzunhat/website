import { FaArrowDown } from 'react-icons/fa'

export function About() {
  return (
    <section className="about-section pb-24 sm:pb-30" id="about">
      <div className="about-brand">
        <img
          src="/sentzunhat-logo.svg"
          alt="Sentzunhat Corp."
          width="1400"
          height="820"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="about-copy">
        <p className="eyebrow mb-3">About us</p>
        <h2 className="mb-6 max-w-2xl text-[clamp(2.4rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.065em]">
          A new company built on years of connected engineering work.
        </h2>
        <div className="about-columns">
          <p>
            Sentzunhat Corp. is a founder-led software company based in Winnipeg,
            Manitoba. We build focused applications alongside reusable engineering
            foundations, with an emphasis on understandable systems and human control.
          </p>
          <p>
            The corporation is new. The work behind it is not. Sentzunhat grew from
            related projects in local-first software, identity, application architecture,
            infrastructure, and human-directed AI workflows.
          </p>
        </div>
        <a className="founder-jump" href="#founder">
          Meet Diego, the founder
          <FaArrowDown className="ui-icon action-icon" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
