import { useEffect, useRef } from 'react'
import { FaArrowDown } from 'react-icons/fa'

import { founder } from '../content/founder'

export function Founder() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = section.current
    if (!element || !('IntersectionObserver' in window)) return
    // One observation and one entrance; content remains visible without animation.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      element.classList.add('founder-entered')
      observer.disconnect()
    }, { threshold: 0, rootMargin: '0px 0px -40px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="founder" className="founder-section" aria-labelledby="founder-heading" ref={section}>
      <header className="founder-header">
        <div>
          <p className="eyebrow">Behind Sentzunhat</p>
          <h2 id="founder-heading">{founder.heading}</h2>
        </div>
        <a className="founder-jump" href="#founder-story">
          Meet the founder
          <FaArrowDown className="ui-icon action-icon" aria-hidden="true" />
        </a>
      </header>
      <div className="founder-layout">
        <aside className="founder-identity" aria-label="Founder">
          <div className="founder-monogram" aria-hidden="true">db<span>·</span></div>
          <p className="founder-name">{founder.name}</p>
          <p className="founder-role">{founder.role}</p>
          <div className="founder-tenure"><strong>10+</strong><span>years in engineering<br />across industries</span></div>
          <p className="founder-signature">Built with care.<br />Made to last.</p>
        </aside>
        <div className="founder-story" id="founder-story">
          <p className="founder-intro">{founder.introduction}</p>
          <p className="founder-approach">{founder.approach}</p>
          <div className="founder-chapters">
            {founder.chapters.map((chapter, index) => (
              <article className="founder-chapter" key={chapter.title}>
                <span className="founder-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div><h3>{chapter.title}</h3>{chapter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
              </article>
            ))}
          </div>
          <blockquote className="founder-closing">{founder.closing}</blockquote>
        </div>
      </div>
    </section>
  )
}
