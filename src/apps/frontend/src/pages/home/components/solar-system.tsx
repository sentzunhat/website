import { useEffect, useRef, useState } from 'react'

import type { SolarScene } from './solar-scene'

export function SolarSystem() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<SolarScene | null>(null)
  const motionRef = useRef(reducedMotion)
  const [status, setStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading')

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(query.matches)
    updateMotion()
    query.addEventListener('change', updateMotion)
    return () => query.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    motionRef.current = reducedMotion
    sceneRef.current?.setReducedMotion(reducedMotion)
  }, [reducedMotion])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    let disposed = false
    let scene: SolarScene | null = null
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || scene || disposed) return

      void import('./solar-scene')
        .then(({ createSolarScene }) => {
          if (disposed) return
          scene = createSolarScene(panel, motionRef.current)
          sceneRef.current = scene
          setStatus('ready')
        })
        .catch(() => {
          if (!disposed) setStatus('unavailable')
        })
    }, { rootMargin: '120px' })

    observer.observe(panel)
    return () => {
      disposed = true
      observer.disconnect()
      scene?.dispose()
      sceneRef.current = null
    }
  }, [])

  return (
    <div
      className="solar-system"
      ref={panelRef}
      role="group"
      aria-label="Interactive three-dimensional model of the Solar System"
      aria-describedby="solar-hint solar-note"
      data-scene={status}
    >
      <div className="solar-fallback" aria-hidden="true">
        <span />
        <i />
        <i />
      </div>
      <p className="solar-hint" id="solar-hint">Drag to explore · pinch to zoom</p>
      <span className="sr-only" id="solar-note">
        Planetary motion follows a Keplerian model from NASA J2000 mean elements.
        Time is accelerated and display distances are compressed for this small panel.
      </span>
      <button
        className="solar-center"
        type="button"
        onClick={() => sceneRef.current?.resetView()}
        aria-label="Center view on the Sun"
      >
        <span aria-hidden="true">◎</span>
        Center on Sun
      </button>
      {status === 'unavailable' && (
        <p className="solar-status" role="status">3D view unavailable on this device</p>
      )}
    </div>
  )
}
