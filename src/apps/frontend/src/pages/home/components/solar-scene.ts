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

const AU_KM = 149_597_870.7
const AU_METERS = AU_KM * 1_000
const GRAVITATIONAL_CONSTANT = 6.6743e-11
const SUN_MASS_KG = 1.98847e30
const SOLAR_MU = GRAVITATIONAL_CONSTANT * SUN_MASS_KG
const DAYS_PER_SIM_SECOND = 25
const J2000 = Date.UTC(2000, 0, 1, 12)
const DEGREES = Math.PI / 180

type PlanetData = {
  name: string
  axis: number
  eccentricity: number
  inclination: number
  node: number
  perihelion: number
  longitude: number
  color: string
  radius: number
}

// Mean J2000 elements from NASA NSSDCA fact sheets. Display radii are
// compressed logarithmically, but eccentricity, inclination, and timing remain.
const PLANETS: PlanetData[] = [
  { name: 'Mercury', axis: 0.38709893, eccentricity: 0.20563069, inclination: 7.00487, node: 48.33167, perihelion: 77.45645, longitude: 252.25084, color: '#d9b690', radius: 0.055 },
  { name: 'Venus', axis: 0.72333199, eccentricity: 0.00677323, inclination: 3.39471, node: 76.68069, perihelion: 131.53298, longitude: 181.97973, color: '#e9c8a1', radius: 0.082 },
  { name: 'Earth', axis: 1.00000011, eccentricity: 0.01671022, inclination: 0.00005, node: -11.26064, perihelion: 102.94719, longitude: 100.46435, color: '#55a9ee', radius: 0.085 },
  { name: 'Mars', axis: 1.52366231, eccentricity: 0.09341233, inclination: 1.85061, node: 49.57854, perihelion: 336.04084, longitude: 355.45332, color: '#df7858', radius: 0.067 },
  { name: 'Jupiter', axis: 5.20336301, eccentricity: 0.04839266, inclination: 1.30530, node: 100.55615, perihelion: 14.75385, longitude: 34.40438, color: '#d9ab82', radius: 0.15 },
  { name: 'Saturn', axis: 9.53707032, eccentricity: 0.05415060, inclination: 2.48446, node: 113.71504, perihelion: 92.43194, longitude: 49.94432, color: '#d6c18e', radius: 0.13 },
  { name: 'Uranus', axis: 19.19126393, eccentricity: 0.04716771, inclination: 0.76986, node: 74.22988, perihelion: 170.96424, longitude: 313.23218, color: '#7bcbd2', radius: 0.105 },
  { name: 'Neptune', axis: 30.06896348, eccentricity: 0.00858587, inclination: 1.76917, node: 131.72169, perihelion: 44.97135, longitude: 304.88003, color: '#6484ee', radius: 0.105 },
]

const displayAxis = (axis: number) => 1.25 + Math.log1p(axis) * 0.9

function solveKepler(meanAnomaly: number, eccentricity: number) {
  let eccentricAnomaly = meanAnomaly
  for (let iteration = 0; iteration < 6; iteration += 1) {
    eccentricAnomaly -= (eccentricAnomaly - eccentricity * Math.sin(eccentricAnomaly) - meanAnomaly)
      / (1 - eccentricity * Math.cos(eccentricAnomaly))
  }
  return eccentricAnomaly
}

function positionAt(planet: PlanetData, elapsedDays: number, target: Vector3) {
  const meanMotion = Math.sqrt(SOLAR_MU / (planet.axis * AU_METERS) ** 3)
  const initialMean = (planet.longitude - planet.perihelion) * DEGREES
  const meanAnomaly = initialMean + meanMotion * elapsedDays * 86_400
  const eccentricAnomaly = solveKepler(meanAnomaly, planet.eccentricity)
  const semiMajor = displayAxis(planet.axis)
  const x = semiMajor * (Math.cos(eccentricAnomaly) - planet.eccentricity)
  const y = semiMajor * Math.sqrt(1 - planet.eccentricity ** 2) * Math.sin(eccentricAnomaly)

  const ascendingNode = planet.node * DEGREES
  const inclination = planet.inclination * DEGREES
  const argument = (planet.perihelion - planet.node) * DEGREES
  const cosNode = Math.cos(ascendingNode)
  const sinNode = Math.sin(ascendingNode)
  const cosArgument = Math.cos(argument)
  const sinArgument = Math.sin(argument)
  const cosInclination = Math.cos(inclination)
  const sinInclination = Math.sin(inclination)

  target.set(
    (cosNode * cosArgument - sinNode * sinArgument * cosInclination) * x
      + (-cosNode * sinArgument - sinNode * cosArgument * cosInclination) * y,
    (sinArgument * sinInclination) * x + (cosArgument * sinInclination) * y,
    (sinNode * cosArgument + cosNode * sinArgument * cosInclination) * x
      + (-sinNode * sinArgument + cosNode * cosArgument * cosInclination) * y,
  )
  return target
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

export function createSolarScene(container: HTMLElement, reducedMotion: boolean): SolarScene {
  const scene = new Scene()
  const dark = getComputedStyle(document.documentElement).colorScheme === 'dark'
  scene.background = new Color(dark ? '#07101b' : '#111c2a')
  const camera = new PerspectiveCamera(42, 1, 0.1, 90)
  camera.position.set(0, 7.4, 13.8)

  const renderer = new WebGLRenderer({ alpha: false, antialias: true, powerPreference: 'low-power' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.outputColorSpace = SRGBColorSpace
  renderer.domElement.className = 'solar-canvas'
  renderer.domElement.setAttribute('role', 'img')
  renderer.domElement.setAttribute('aria-label', 'Interactive three-dimensional Solar System visualization')
  renderer.domElement.setAttribute('tabindex', '-1')
  container.prepend(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0, 0)
  controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = 0.075
  controls.minDistance = 5.4
  controls.maxDistance = 22
  controls.minPolarAngle = 0.18
  controls.maxPolarAngle = Math.PI - 0.18
  controls.rotateSpeed = 0.58
  controls.zoomSpeed = 0.7
  controls.update()

  scene.add(new AmbientLight('#a9c4e0', 0.62))
  const sunlight = new PointLight('#fff3dc', 100, 0, 2)
  scene.add(sunlight)

  const sun = new Mesh(
    new SphereGeometry(0.34, 24, 16),
    new MeshBasicMaterial({ color: '#fff6d8' }),
  )
  scene.add(sun)
  const sunGlow = new Sprite(new SpriteMaterial({
    map: makeNebulaTexture(), color: '#9bd9ff', transparent: true, opacity: 0.34,
    blending: AdditiveBlending, depthWrite: false,
  }))
  sunGlow.scale.set(2.1, 2.1, 1)
  scene.add(sunGlow)

  const orbitMaterial = new LineBasicMaterial({ color: dark ? '#8ab9de' : '#81b8e2', transparent: true, opacity: 0.17 })
  const orbitLines: Line[] = []
  const planetMeshes = PLANETS.map((planet) => {
    const axis = displayAxis(planet.axis)
    const points: Vector3[] = []
    for (let step = 0; step <= 128; step += 1) {
      const eccentricAnomaly = (step / 128) * Math.PI * 2
      const x = axis * (Math.cos(eccentricAnomaly) - planet.eccentricity)
      const y = axis * Math.sqrt(1 - planet.eccentricity ** 2) * Math.sin(eccentricAnomaly)
      const ascendingNode = planet.node * DEGREES
      const inclination = planet.inclination * DEGREES
      const argument = (planet.perihelion - planet.node) * DEGREES
      const local = new Vector3(x, y, 0)
      local.applyAxisAngle(new Vector3(0, 0, 1), argument)
      local.applyAxisAngle(new Vector3(1, 0, 0), inclination)
      local.applyAxisAngle(new Vector3(0, 0, 1), ascendingNode)
      points.push(local)
    }
    const orbit = new Line(new BufferGeometry().setFromPoints(points), orbitMaterial)
    scene.add(orbit)
    orbitLines.push(orbit)

    const mesh = new Mesh(
      new SphereGeometry(planet.radius, 16, 12),
      new MeshPhongMaterial({ color: planet.color, shininess: 18, specular: '#aac8e5' }),
    )
    mesh.userData.planet = planet
    scene.add(mesh)
    return mesh
  })

  const random = randomGenerator(20260929)
  const positions = new Float32Array(540 * 3)
  const colors = new Float32Array(540 * 3)
  for (let index = 0; index < positions.length; index += 3) {
    const radius = 17 + random() * 22
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
    size: 0.055, transparent: true, opacity: 0.82, vertexColors: true, sizeAttenuation: true,
  }))
  scene.add(stars)

  const nebulaColors = ['#547fe0', '#44bdc7', '#9672d8']
  const nebulae = nebulaColors.map((color, index) => {
    const cloud = new Sprite(new SpriteMaterial({
      map: makeNebulaTexture(), color, transparent: true, opacity: 0.09,
      blending: AdditiveBlending, depthWrite: false,
    }))
    const angle = random() * Math.PI * 2
    const distance = 8 + random() * 9
    cloud.position.set(Math.cos(angle) * distance, (random() - 0.5) * 7, Math.sin(angle) * distance)
    const scale = 5 + random() * 5
    cloud.scale.set(scale * (index === 1 ? 1.4 : 1), scale * 0.72, 1)
    scene.add(cloud)
    return cloud
  })

  const resizeObserver = new ResizeObserver(() => {
    const width = container.clientWidth
    const height = container.clientHeight
    if (width === 0 || height === 0) return
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  })
  resizeObserver.observe(container)

  const startDate = Date.now()
  const initialDays = (startDate - J2000) / 86_400_000
  let fixedDays = initialDays
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
    previousFrame = now
    controls.update()
    if (!motionReduced) {
      const elapsedDays = initialDays + ((Date.now() - startDate) / 1_000) * DAYS_PER_SIM_SECOND
      fixedDays = elapsedDays
    }
    for (const mesh of planetMeshes) {
      const planet = mesh.userData.planet as PlanetData
      positionAt(planet, fixedDays, mesh.position)
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
    scene.background = new Color(darkTheme ? '#07101b' : '#111c2a')
    orbitMaterial.color.set(darkTheme ? '#8ab9de' : '#a4cae5')
  }
  updateTheme()
  const themeObserver = new MutationObserver(updateTheme)
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  systemTheme.addEventListener('change', updateTheme)

  const resetView = () => {
    camera.position.set(0, 7.4, 13.8)
    controls.target.set(0, 0, 0)
    controls.update()
  }

  return {
    resetView,
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
