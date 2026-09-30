import {
  AdditiveBlending,
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  NormalBlending,
  Points,
  PointsMaterial,
  PointLight,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export type UniverseProject = { name: string; accent: string }

type PlanetData = UniverseProject & {
  axis: number
  eccentricity: number
  inclination: number
  phase: number
  radius: number
  speed: number
}

const projectSeed = (name: string) => {
  let seed = 2166136261
  for (const character of name) seed = Math.imul(seed ^ character.charCodeAt(0), 16777619)
  return seed >>> 0
}

const makePlanets = (projects: UniverseProject[]): PlanetData[] => {
  let axis = 1.5
  return projects.map((project) => {
    const random = randomGenerator(projectSeed(project.name))
    axis += 1.5 + random() * 0.8
    return {
      ...project,
      axis,
      eccentricity: 0.025 + random() * 0.055,
      inclination: (random() - 0.5) * 0.3,
      phase: random() * Math.PI * 2,
      radius: 0.44 + random() * 0.3,
      speed: (0.1 + random() * 0.08) / Math.sqrt(axis),
    }
  })
}

function positionAt(planet: PlanetData, angle: number, target: Vector3) {
  const x = planet.axis * (Math.cos(angle) - planet.eccentricity)
  const z = planet.axis * Math.sqrt(1 - planet.eccentricity ** 2) * Math.sin(angle)
  return target.set(x, z * Math.sin(planet.inclination), z * Math.cos(planet.inclination))
}

function makeNebulaTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) return new CanvasTexture(canvas)

  const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(255,255,255,0.5)')
  gradient.addColorStop(0.28, 'rgba(255,255,255,0.2)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  return new CanvasTexture(canvas)
}

function randomGenerator(seed: number) {
  let value = seed >>> 0
  return () => {
    value += 0x6d2b79f5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4_294_967_296
  }
}

export type SolarScene = {
  resetView: () => void
  setReducedMotion: (reduced: boolean) => void
  dispose: () => void
}

export function createSolarScene(container: HTMLElement, reducedMotion: boolean, projects: UniverseProject[]): SolarScene {
  const planets = makePlanets(projects)
  const systemRadius = Math.max(3, ...planets.map((planet) => planet.axis * (1 + planet.eccentricity) + planet.radius))
  const scene = new Scene()
  const dark = getComputedStyle(document.documentElement).colorScheme === 'dark'
  scene.background = new Color(dark ? '#080c18' : '#fdfdfd')
  const camera = new PerspectiveCamera(42, 1, 0.1, 500)
  camera.position.set(0, 16, 24)

  const renderer = new WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.domElement.className = 'solar-canvas'
  renderer.domElement.setAttribute('role', 'img')
  renderer.domElement.setAttribute('aria-label', 'One planet for each Sentzunhat project')
  renderer.domElement.setAttribute('tabindex', '-1')
  container.prepend(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.075
  controls.minDistance = systemRadius * 0.8
  controls.maxDistance = systemRadius * 8
  controls.minPolarAngle = 0.18
  controls.maxPolarAngle = Math.PI - 0.18
  controls.rotateSpeed = 0.58
  controls.zoomSpeed = 0.7
  controls.update()

  const ambient = new AmbientLight('#c9e6ff', 2.1)
  scene.add(ambient)
  const sunlight = new PointLight('#91dcff', 240, 0, 1)
  scene.add(sunlight)

  const sun = new Mesh(
    new SphereGeometry(0.9, 32, 24),
    new MeshBasicMaterial({ color: '#8ce7f5' }),
  )
  scene.add(sun)
  const sunGlow = new Sprite(new SpriteMaterial({
    map: makeNebulaTexture(), color: '#9bd9ff', transparent: true, opacity: 0.34,
    blending: AdditiveBlending, depthWrite: false,
  }))
  sunGlow.scale.set(7, 7, 1)
  const flare = new Sprite(new SpriteMaterial({
    map: makeNebulaTexture(), color: '#7bcfff', transparent: true, opacity: 0.4,
    blending: AdditiveBlending, depthWrite: false,
  }))
  flare.scale.set(8, 0.22, 1)
  scene.add(flare)
  scene.add(sunGlow)

  const orbitMaterial = new LineBasicMaterial({ color: dark ? '#8ab9de' : '#81b8e2', transparent: true, opacity: 0.17 })
  const orbitLines: Line[] = []
  const planetMeshes = planets.map((planet) => {
    const points: Vector3[] = []
    for (let step = 0; step <= 128; step += 1) {
      points.push(positionAt(planet, (step / 128) * Math.PI * 2, new Vector3()))
    }
    const orbit = new Line(new BufferGeometry().setFromPoints(points), orbitMaterial)
    scene.add(orbit)
    orbitLines.push(orbit)

    const mesh = new Mesh(
      new SphereGeometry(planet.radius, 24, 16),
      new MeshPhongMaterial({ shininess: 26, specular: '#aac8e5' }),
    )
    mesh.userData.planet = planet
    positionAt(planet, planet.phase, mesh.position)
    scene.add(mesh)
    return mesh
  })

  const random = randomGenerator(20260929)
  const positions = new Float32Array(540 * 3)
  const colors = new Float32Array(540 * 3)
  for (let index = 0; index < positions.length; index += 3) {
    const radius = systemRadius * 3 + random() * systemRadius * 2
    const azimuth = random() * Math.PI * 2
    const vertical = random() * 2 - 1
    const spread = Math.sqrt(1 - vertical * vertical)
    positions[index] = Math.cos(azimuth) * spread * radius
    positions[index + 1] = vertical * radius
    positions[index + 2] = Math.sin(azimuth) * spread * radius
    const tint = random()
    colors[index] = 0.56 + tint * 0.38
    colors[index + 1] = 0.66 + tint * 0.3
    colors[index + 2] = 0.82 + tint * 0.18
  }
  const starsGeometry = new BufferGeometry()
  starsGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  starsGeometry.setAttribute('color', new BufferAttribute(colors, 3))
  const stars = new Points(starsGeometry, new PointsMaterial({
    size: 0.09, transparent: true, opacity: 0.82, vertexColors: true, sizeAttenuation: true,
  }))
  scene.add(stars)

  const nebulaColors = ['#547fe0', '#44bdc7', '#9672d8']
  const nebulae = nebulaColors.map((color, index) => {
    const cloud = new Sprite(new SpriteMaterial({
      map: makeNebulaTexture(), color, transparent: true, opacity: 0.09,
      blending: AdditiveBlending, depthWrite: false,
    }))
    const angle = random() * Math.PI * 2
    const distance = systemRadius * (1.2 + random())
    cloud.position.set(Math.cos(angle) * distance, (random() - 0.5) * 7, Math.sin(angle) * distance)
    const scale = systemRadius * (1.5 + random())
    cloud.scale.set(scale * (index === 1 ? 1.4 : 1), scale * 0.72, 1)
    scene.add(cloud)
    return cloud
  })

  const fitCamera = () => {
    const halfVertical = camera.fov * Math.PI / 360
    const halfHorizontal = Math.atan(Math.tan(halfVertical) * camera.aspect)
    const direction = new Vector3(0, 0.65, 1).normalize()
    const up = new Vector3(0, direction.z, -direction.y)
    const position = new Vector3()
    let distance = 6
    for (const planet of planets) {
      for (let step = 0; step < 64; step += 1) {
        positionAt(planet, step / 64 * Math.PI * 2, position)
        const depth = position.dot(direction)
        const horizontal = Math.abs(position.x) / Math.tan(halfHorizontal)
        const vertical = Math.abs(position.dot(up)) / Math.tan(halfVertical)
        const padding = planet.radius / Math.sin(Math.min(halfVertical, halfHorizontal))
        distance = Math.max(distance, depth + Math.max(horizontal, vertical) + padding)
      }
    }
    camera.position.copy(direction).multiplyScalar(distance * 1.15)
    controls.target.set(0, 0, 0)
    controls.update()
  }
  const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
    fitCamera()
  })
  resizeObserver.observe(container)

  let elapsedSeconds = 0
  let motionReduced = reducedMotion
  let animationFrame = 0
  let previousFrame = 0
  let disposed = false
  let inView = false

  const render = (now: number) => {
    animationFrame = 0
    if (disposed || !inView || document.visibilityState === 'hidden') return
    animationFrame = requestAnimationFrame(render)
    if (now - previousFrame < 33) return
    const delta = previousFrame === 0 ? 0 : Math.min((now - previousFrame) / 1_000, 0.1)
    previousFrame = now
    controls.update()
    if (!motionReduced) elapsedSeconds += delta
    for (const mesh of planetMeshes) {
      const planet = mesh.userData.planet as PlanetData
      positionAt(planet, planet.phase + elapsedSeconds * planet.speed, mesh.position)
      if (!motionReduced) mesh.rotation.y += delta * 0.15
    }
    renderer.render(scene, camera)
  }

  const updateRendering = () => {
    const shouldRender = inView && document.visibilityState !== 'hidden' && !disposed
    if (shouldRender && animationFrame === 0) animationFrame = requestAnimationFrame(render)
    if (!shouldRender && animationFrame !== 0) {
      cancelAnimationFrame(animationFrame)
      animationFrame = 0
    }
  }
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    inView = entry?.isIntersecting ?? false
    updateRendering()
  }, { rootMargin: '80px' })
  visibilityObserver.observe(container)
  document.addEventListener('visibilitychange', updateRendering)

  const root = document.documentElement
  const updateTheme = () => {
    const darkTheme = getComputedStyle(root).colorScheme === 'dark'
    const styles = getComputedStyle(root)
    const token = (name: string) => styles.getPropertyValue(`--${name}`).trim()
    scene.background = new Color(token('canvas'))
    orbitMaterial.color.set(darkTheme ? '#8ab9de' : '#667c99')
    orbitMaterial.opacity = darkTheme ? 0.2 : 0.23
    ambient.intensity = darkTheme ? 2.1 : 2.6
    stars.material.vertexColors = darkTheme
    stars.material.color.set(darkTheme ? '#ffffff' : '#26394a')
    stars.material.opacity = darkTheme ? 0.85 : 0.65
    stars.material.needsUpdate = true
    for (const mesh of planetMeshes) {
      const planet = mesh.userData.planet as PlanetData
      mesh.material.color.set(token(planet.accent) || token('primary'))
    }
    for (const cloud of nebulae) {
      cloud.material.blending = darkTheme ? AdditiveBlending : NormalBlending
      cloud.material.opacity = darkTheme ? 0.32 : 0.22
      cloud.material.needsUpdate = true
    }
    for (const glow of [sunGlow, flare]) {
      glow.material.blending = darkTheme ? AdditiveBlending : NormalBlending
      glow.material.opacity = darkTheme ? 0.85 : 0.8
      glow.material.needsUpdate = true
    }
  }
  updateTheme()
  const themeObserver = new MutationObserver(updateTheme)
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemTheme.addEventListener('change', updateTheme)



  return {
    resetView: fitCamera,
    setReducedMotion: (reduced) => { motionReduced = reduced },
    dispose: () => {
      if (disposed) return
      disposed = true
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      themeObserver.disconnect()
      document.removeEventListener('visibilitychange', updateRendering)
      systemTheme.removeEventListener('change', updateTheme)
      controls.dispose()
      orbitMaterial.dispose()
      for (const orbit of orbitLines) orbit.geometry.dispose()
      starsGeometry.dispose()
      stars.material.dispose()
      for (const mesh of planetMeshes) {
        mesh.geometry.dispose()
        mesh.material.dispose()
      }
      sun.geometry.dispose()
      sun.material.dispose()
      sunGlow.material.map?.dispose()
      sunGlow.material.dispose()
      flare.material.map?.dispose()
      flare.material.dispose()
      for (const cloud of nebulae) {
        cloud.material.map?.dispose()
        cloud.material.dispose()
      }
      renderer.dispose()
      renderer.domElement.remove()
      scene.clear()
    },
  }
}
