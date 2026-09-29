import { SolarSystem } from './solar-system'

export function Hero() {
  return (
    <section className="hero py-25 sm:py-36" id="top">
      <svg
        className="hero-lines"
        viewBox="0 0 1200 720"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M18 122h176v54h92v-54h164v112h108v-58h172v116h126v-72h326" />
        <path d="M0 318h154l62-54 72 54h178l68 58 72-58h176l68 58 74-58h276" />
        <path d="M24 554h214v-62h106v62h188v-118h116v118h170v-62h112v62h252" />
        <path d="M84 676c74-82 148-82 222 0s148 82 222 0 148-82 222 0 148 82 222 0" />
        <circle cx="192" cy="176" r="12" />
        <circle cx="730" cy="292" r="9" />
        <circle cx="930" cy="554" r="14" />
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
            See what we are building <span aria-hidden="true">↓</span>
          </a>
          <a className="hero-secondary" href="#about">
            Why Sentzunhat <span aria-hidden="true">↘</span>
          </a>
        </div>
      </div>

      <div className="hero-card">
        <SolarSystem />
      </div>
    </section>
  )
}
