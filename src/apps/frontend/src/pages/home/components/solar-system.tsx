import { useEffect, useRef, useState } from 'react'
import { FaCrosshairs } from 'react-icons/fa'

import type { SolarScene, UniverseProject } from './solar-scene'

export function SolarSystem({ projects }: { projects: UniverseProject[] }) {
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

    setStatus('loading')
    let disposed = false
    let scene: SolarScene | null = null
    let loading = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || loading || scene || disposed) return

      loading = true
      void import('./solar-scene')
        .then(({ createSolarScene }) => {
          if (disposed) return
          scene = createSolarScene(panel, motionRef.current, projects)
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
  }, [projects])

  return (
    <div
      className="solar-system"
      ref={panelRef}
      role="group"
      aria-label="Interactive three-dimensional project universe"
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
        One planet for each project: {projects.map((project) => project.name).join(', ')}.
        Imagined orbits around a blue sun.
      </span>
      <button
        className="solar-center"
        type="button"
        onClick={() => sceneRef.current?.resetView()}
        aria-label="Center on Sun"
      >
        <FaCrosshairs className="ui-icon action-icon" aria-hidden="true" />
        Center on Sun
      </button>
      {status === 'unavailable' && (
        <p className="solar-status" role="status">3D view unavailable on this device</p>
      )}
    </div>
  )
}
