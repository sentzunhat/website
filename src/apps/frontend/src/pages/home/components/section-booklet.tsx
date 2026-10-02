import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface SectionBookletProps {
  children: ReactNode
}

export function SectionBooklet({ children }: SectionBookletProps) {
  const rail = useRef<HTMLDivElement>(null)
  const [canGoPrevious, setCanGoPrevious] = useState(false)
  const [canGoNext, setCanGoNext] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const element = rail.current
    if (!element) return

    const update = () => {
      const maximum = element.scrollWidth - element.clientWidth
      setCanGoPrevious(element.scrollLeft > 2)
      setCanGoNext(maximum - element.scrollLeft > 2)
      const railLeft = element.getBoundingClientRect().left
      const current = Array.from(element.children).findIndex((child) => {
        const left = child.getBoundingClientRect().left
        return left <= railLeft + 2 && child.getBoundingClientRect().right > railLeft + 2
      })
      setActiveSection(Math.max(0, current))
    }
    update()
    element.addEventListener('scroll', update, { passive: true })
    const observer = new ResizeObserver(update)
    observer.observe(element)
    Array.from(element.children).forEach((child) => observer.observe(child))

    return () => {
      element.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  const move = useCallback((direction: -1 | 1) => {
    const element = rail.current
    if (!element) return
    const targetIndex = Math.max(0, Math.min(element.children.length - 1, activeSection + direction))
    element.children.item(targetIndex)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }, [activeSection])

  useEffect(() => {
    const handleAnchorNavigation = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]')
      const element = rail.current
      if (!link || !element) return
      let targetId: string
      try {
        targetId = decodeURIComponent(link.hash.slice(1))
      } catch {
        return
      }
      const target = document.getElementById(targetId)
      if (!target || !element.contains(target)) return
      event.preventDefault()
      window.history.pushState(null, '', link.hash)
      const panel = target.closest('section')
      if (panel) {
        const panelIndex = Array.from(element.children).indexOf(panel)
        setActiveSection(panelIndex)
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      }
      window.setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300)
    }
    document.addEventListener('click', handleAnchorNavigation)
    return () => document.removeEventListener('click', handleAnchorNavigation)
  }, [])

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
        <button type="button" aria-label="Previous section" onClick={() => move(-1)} disabled={!canGoPrevious}>
          <FaArrowLeft aria-hidden="true" />
        </button>
        <button type="button" aria-label="Next section" onClick={() => move(1)} disabled={!canGoNext}>
          <FaArrowRight aria-hidden="true" />
        </button>
      </div>
      <p className="section-booklet-hint" aria-live="polite">
        <span>{String(activeSection + 1).padStart(2, '0')} / {String(rail.current?.children.length ?? 7).padStart(2, '0')}</span>
        <span>Swipe or use arrows to explore</span>
      </p>
      <div className="section-booklet-rail" ref={rail}>
        {children}
      </div>
    </div>
  )
}
