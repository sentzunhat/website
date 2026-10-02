import { Children, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface SectionBookletProps {
  children: ReactNode
}

export function SectionBooklet({ children }: SectionBookletProps) {
  const rail = useRef<HTMLDivElement>(null)
  const requestedSection = useRef<number | null>(null)
  const pageScrollFrame = useRef<number | undefined>(undefined)
  const [activeSection, setActiveSection] = useState(0)
  const [railHeight, setRailHeight] = useState<number>()
  const sectionCount = Children.count(children)

  const goTo = useCallback((index: number, target?: HTMLElement) => {
    const element = rail.current
    const panel = element?.children.item(index)
    if (!(panel instanceof HTMLElement) || !element) return
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    requestedSection.current = index
    setActiveSection(index)
    setRailHeight(panel.offsetHeight)
    element.scrollTo({ left: panel.offsetLeft, behavior })
    const destination = target ?? panel
    if (pageScrollFrame.current !== undefined) cancelAnimationFrame(pageScrollFrame.current)
    pageScrollFrame.current = requestAnimationFrame(() => {
      const headerHeight = document.querySelector('main > nav')?.getBoundingClientRect().height ?? 0
      window.scrollTo({ top: window.scrollY + destination.getBoundingClientRect().top - headerHeight, behavior })
    })
  }, [])

  const move = useCallback((direction: -1 | 1) => {
    goTo(Math.max(0, Math.min(sectionCount - 1, activeSection + direction)))
  }, [activeSection, goTo, sectionCount])

  useEffect(() => {
    const element = rail.current
    if (!element) return
    const update = () => {
      const index = requestedSection.current ?? Math.max(0, Math.min(sectionCount - 1, Math.round(element.scrollLeft / element.clientWidth)))
      const panel = element.children.item(index)
      setActiveSection(index)
      setRailHeight(panel?.getBoundingClientRect().height ?? 0)
      if (panel instanceof HTMLElement && Math.abs(element.scrollLeft - panel.offsetLeft) < 2) requestedSection.current = null
    }
    const finish = () => { requestedSection.current = null; update() }
    update()
    element.addEventListener('scroll', update, { passive: true })
    element.addEventListener('scrollend', finish)
    const observer = new ResizeObserver(update)
    observer.observe(element)
    Array.from(element.children).forEach((child) => observer.observe(child))
    return () => {
      element.removeEventListener('scroll', update)
      element.removeEventListener('scrollend', finish)
      observer.disconnect()
      if (pageScrollFrame.current !== undefined) cancelAnimationFrame(pageScrollFrame.current)
    }
  }, [sectionCount])

  useEffect(() => {
    const navigateToHash = () => {
      let id: string
      try {
        id = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return
      }
      const target = document.getElementById(id)
      const element = rail.current
      if (!target || !element?.contains(target)) return
      let panel = target.closest('section')
      while (panel && panel.parentElement !== element) panel = panel.parentElement?.closest('section') ?? null
      const index = panel ? Array.from(element.children).indexOf(panel) : -1
      if (index >= 0) goTo(index, target)
    }
    const handleAnchorNavigation = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]')
      if (!link || link.pathname !== window.location.pathname) return
      let id: string
      try {
        id = decodeURIComponent(link.hash.slice(1))
      } catch {
        return
      }
      const target = document.getElementById(id)
      if (!target || !rail.current?.contains(target)) return
      event.preventDefault()
      window.history.pushState(null, '', link.hash)
      navigateToHash()
    }
    document.addEventListener('click', handleAnchorNavigation)
    window.addEventListener('popstate', navigateToHash)
    window.addEventListener('hashchange', navigateToHash)
    const frame = requestAnimationFrame(navigateToHash)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', handleAnchorNavigation)
      window.removeEventListener('popstate', navigateToHash)
      window.removeEventListener('hashchange', navigateToHash)
    }
  }, [goTo])

  useEffect(() => {
    const handleKeyNavigation = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      if (!(event.target instanceof HTMLElement) || !rail.current?.contains(event.target)) return
      if (event.target.closest('a, button, input, textarea, select, [contenteditable="true"]')) return
      event.preventDefault()
      move(event.key === 'ArrowLeft' ? -1 : 1)
    }
    document.addEventListener('keydown', handleKeyNavigation)
    return () => document.removeEventListener('keydown', handleKeyNavigation)
  }, [move])

  return (
    <div className="section-booklet">
      <div className="section-booklet-controls" role="group" aria-label="Homepage sections">
        <button type="button" aria-label="Previous section" onClick={() => move(-1)} disabled={activeSection === 0}>
          <FaArrowLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next section" onClick={() => move(1)} disabled={activeSection === sectionCount - 1}>
          <FaArrowRight aria-hidden="true" />
        </button>
      </div>
      <p className="section-booklet-hint" aria-live="polite">
        <span>{String(activeSection + 1).padStart(2, '0')} / {String(sectionCount).padStart(2, '0')}</span>
        <span>Swipe or use arrows to explore</span>
      </p>
      <div className="section-booklet-rail" ref={rail} aria-label="Homepage booklet" style={railHeight ? { height: railHeight } : undefined}>
        {children}
      </div>
    </div>
  )
}
