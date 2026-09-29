import { mkdirSync, writeFileSync } from 'node:fs'

const outputDirectory = new URL('../src/apps/frontend/public/', import.meta.url)
const colors = {
  blue: '#1706FA',
  blueDeep: '#075A84',
  green: '#2C9017',
  greenDeep: '#07513F',
  aqua: '#8CF5E9',
  sky: '#8CE7F5',
  cloud: '#A6F3FF',
  ink: '#10152A',
  sand: '#EEC487',
  sandLight: '#FAE5BA',
  sun: '#F4B652',
  white: '#FFFFFF',
}

const font = 'Fira Sans, Avenir Next, Helvetica Neue, Arial, sans-serif'

function definitions(prefix) {
  return `<defs>
    <linearGradient id="${prefix}-ocean" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#2733BF"/><stop offset=".48" stop-color="#116A9C"/><stop offset="1" stop-color="#329FAE"/>
    </linearGradient>
    <linearGradient id="${prefix}-santa" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#6E9B8E"/><stop offset="1" stop-color="#365F5E"/>
    </linearGradient>
    <linearGradient id="${prefix}-izalco" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="${colors.blueDeep}"/><stop offset="1" stop-color="#365F5E"/>
    </linearGradient>
    <linearGradient id="${prefix}-sand" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${colors.sandLight}"/><stop offset="1" stop-color="${colors.sand}"/>
    </linearGradient>
    <linearGradient id="${prefix}-wordmark" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="${colors.ink}"/><stop offset=".55" stop-color="${colors.blueDeep}"/><stop offset="1" stop-color="${colors.greenDeep}"/>
    </linearGradient>
  </defs>`
}

function scene(prefix, monochrome = false) {
  const paint = (value) => monochrome ? colors.ink : value
  // Deterministic, varied canopies: regenerate identical artwork on every run.
  const trees = Array.from({ length: 4 }, (_, row) =>
    Array.from({ length: 45 }, (_, i) => {
      const x = 61 + i * 25 + (row % 2) * 12
      const ridge = 382 - 65 * Math.exp(-(((x - 790) / 150) ** 2)) - 24 * Math.exp(-(((x - 380) / 110) ** 2))
      const y = ridge + row * 18 + Math.sin(i * 2.7 + row) * 13
      const scale = .42 + ((i * 7 + row * 3) % 13) / 30
      const shade = ['#103E35', '#245C39', '#337635', '#155346', '#3C813D', '#1D6543'][(i + row * 2) % 6]
      const leaves = Array.from({ length: 9 }, (_, j) => {
        const lx = -23 + ((j * 17 + i * 3) % 59)
        const ly = -13 + ((j * 11 + i) % 34)
        const radius = 3 + ((i + j * 3) % 5)
        return `<ellipse cx="${lx}" cy="${ly}" rx="${radius}" ry="${radius * .58}" transform="rotate(${j * 29} ${lx} ${ly})" fill="${paint(j % 3 === 0 ? '#8CF5E9' : '#60A34A')}" opacity=".24"/>`
      }).join('')
      return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-30 24 C-39 15 -31 6 -24 7 C-32 -2 -21 -12 -14 -8 C-20 -20 -7 -23 0 -16 C3 -30 16 -30 21 -19 C33 -24 40 -15 35 -7 C47 -12 52 0 43 6 C56 10 54 20 47 22 C50 34 35 36 28 30 C19 40 9 36 5 31 C-7 40 -16 34 -19 30 C-28 35 -34 31 -30 24 Z" fill="${paint(shade)}"/>${leaves}</g>`
    }).join('')
  ).join('')
  return `${definitions(prefix)}
  <defs>
    <linearGradient id="${prefix}-sun" x2=".8" y2="1"><stop stop-color="#FFC166"/><stop offset="1" stop-color="#F6AD43"/></linearGradient>
    <linearGradient id="${prefix}-lower" x2="1" y2=".3"><stop stop-color="#479BCD"/><stop offset=".65" stop-color="${colors.sky}"/><stop offset="1" stop-color="${colors.aqua}"/></linearGradient>
    <clipPath id="${prefix}-land"><path d="M25 410 L25 0 L1125 0 L1125 344 Q1171 395 1190 464 C1010 429 835 411 655 397 C409 378 221 384 25 410 Z"/></clipPath>
  </defs>
  ${monochrome ? '' : `<circle cx="836" cy="183" r="130" fill="url(#${prefix}-sun)"/>`}
  <path d="M69 377 C170 311 263 268 352 219 C376 201 389 209 409 212 C428 214 431 198 453 204 C474 210 510 190 531 201 C575 226 616 241 667 260 L781 392 Z" fill="${paint('#507B78')}"/>
  <path d="M209 375 C332 323 395 284 424 237 C438 208 451 219 474 214 L531 201 C575 226 616 241 667 260 L781 392 Z" fill="${paint('#799B8A')}"/>
  <path d="M458 381 C570 318 659 246 735 167 C748 154 757 143 768 145 L778 150 C825 187 886 245 940 272 C983 306 1022 354 1051 400 Z" fill="${paint('#17577D')}"/>
  <path d="M758 147 C743 224 695 292 639 331 L595 373 L1051 400 C990 331 914 278 863 235 C821 199 785 160 758 147 Z" fill="${paint('#618584')}"/>
  <path d="M792 187 C831 236 870 285 945 334 L1015 377 C926 343 850 281 792 187 Z" fill="${paint('#39676C')}" />
  <g fill="none" stroke="${paint('#8CE7F5')}" stroke-width="2" opacity=".16">
    <path d="M742 189 C724 249 687 286 667 310"/>
    <path d="M779 173 C788 222 801 257 831 295"/>
    <path d="M809 210 C836 258 864 282 896 302"/>
    <path d="M446 232 C418 264 403 298 363 326"/>
    <path d="M491 228 C477 258 471 285 451 302"/>
  </g>
  <g clip-path="url(#${prefix}-land)">
    <path d="M25 410 C223 360 330 355 469 355 C625 323 690 332 790 305 C924 325 1065 378 1183 455 L1195 482 L20 458 Z" fill="${paint('#094436')}"/>
    ${trees}
  </g>
    ${palm(1050, 409, 1, -6, paint('#064638'), monochrome)}
    ${palm(1101, 420, .72, 20, paint('#07503D'), monochrome)}
    ${palm(1008, 397, .62, -35, paint('#125B40'), monochrome)}
  <path d="M27 412 C260 368 423 382 611 396 C828 412 1016 432 1188 464 C1046 477 914 510 751 493 C579 475 441 411 285 406 C189 402 105 407 27 412 Z" fill="${paint('url(#' + prefix + '-sand)')}"/>
  <path d="M217 391 C538 375 881 416 1188 464 C972 451 771 417 550 402 C421 393 309 389 217 391 Z" fill="${monochrome ? '#FFFFFF' : '#FFF0D2'}"/>
  <path d="M0 464 C199 377 357 401 527 446 C750 506 853 544 1165 483 C1009 566 826 583 653 552 C435 516 327 433 0 464 Z" fill="${paint('url(#' + prefix + '-ocean)')}"/>
  <path d="M26 514 C205 433 335 498 504 548 C645 590 732 591 839 589 C681 653 475 572 304 535 C188 510 102 506 26 514 Z" fill="${paint('url(#' + prefix + '-lower)')}"/>`
}

function palm(x, y, scale, tilt, ink, monochrome) {
  const trunk = monochrome ? colors.ink : '#785339'
  const glint = monochrome ? colors.ink : '#B38B58'
  const fronds = [
    [-38, -31, -68, -5], [-24, -43, -42, -49],
    [-8, -40, -9, -62], [22, -45, 44, -49],
    [41, -28, 65, -5], [47, 0, 54, 37],
    [-37, -3, -49, 36], [13, 16, 7, 49],
  ].map(([cx, cy, ex, ey], index) => {
    const point = (t) => [2 * (1 - t) * t * cx + t * t * ex, 2 * (1 - t) * t * cy + t * t * ey]
    const leaflets = Array.from({ length: 10 }, (_, j) => {
      const t = .12 + j * .075
      const [px, py] = point(t)
      const [qx, qy] = point(t + .1)
      const dx = qx - px, dy = qy - py
      const length = Math.hypot(dx, dy)
      const width = 13 * Math.sin(Math.PI * t) ** .65
      return [-1, 1].map((side) => {
        const lx = qx - side * dy / length * width
        const ly = qy + side * dx / length * width
        return `<path d="M${px} ${py} Q${lx - dx * .5} ${ly - dy * .5} ${lx} ${ly} Q${qx} ${qy} ${px + dx * .4} ${py + dy * .4} Z"/>`
      }).join('')
    }).join('')
    return `<g fill="${monochrome ? colors.ink : index % 2 ? '#23693F' : ink}">${leaflets}<path d="M0 0 Q${cx} ${cy} ${ex} ${ey}" fill="none" stroke="${monochrome ? colors.ink : '#559361'}" stroke-width="1.2"/></g>`
  }).join('')
  const rings = Array.from({ length: 10 }, (_, i) => {
    const y = -15 - i * 12
    const x = y < -80 ? -3 : 1
    return `<path d="M${x - 4} ${y} q4 3 9 0" fill="none" stroke="${glint}" stroke-width="1.4"/>`
  }).join('')
  return `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${scale})">
    <path d="M-5 7 Q-1 -76 -10 -142 L-4 -145 Q10 -58 6 8 Z" fill="${trunk}"/>
    <path d="M-3 1 Q1 -68 -7 -139" fill="none" stroke="${glint}" stroke-width="2"/>
    ${rings}
    <g transform="translate(-7 -141)">${fronds}<circle cy="3" r="4" fill="${trunk}"/><circle cx="5" cy="6" r="3" fill="${glint}"/></g>
  </g>`
}

function markSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 40 1220 600" role="img" aria-labelledby="title desc"><title id="title">Sentzunhat coastal volcano mark</title><desc id="desc">A Salvadoran landscape with Santa Ana and Izalco volcanoes, tropical forest, palms, beach, and flowing water.</desc>${scene('mark')}</svg>\n`
}

function primaryLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 820" role="img" aria-labelledby="title desc"><title id="title">Sentzunhat Corp. corporate logo</title><desc id="desc">Sentzunhat Corp. beneath a Salvadoran coastal landscape.</desc><g transform="translate(100 20)">${scene('primary')}</g><text x="700" y="755" text-anchor="middle" font-family="${font}" font-size="132" font-weight="650" letter-spacing="-3" fill="#04394C">Sentzunhat Corp.</text></svg>\n`
}

function horizontalLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 620" role="img" aria-labelledby="title desc"><title id="title">Sentzunhat Corp. horizontal logo</title><desc id="desc">Horizontal Sentzunhat Corp. coastal landscape logo.</desc><g transform="translate(25 65) scale(.72)">${scene('horizontal')}</g><text x="995" y="316" font-family="${font}" font-size="116" font-weight="650" letter-spacing="-3" fill="${colors.ink}">Sentzunhat</text><text x="1002" y="400" font-family="${font}" font-size="46" font-weight="600" letter-spacing="9" fill="${colors.green}">CORP.</text><rect x="1000" y="438" width="570" height="10" rx="5" fill="${colors.aqua}"/></svg>\n`
}

function monochromeLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 820" role="img" aria-labelledby="title desc"><title id="title">Sentzunhat Corp. monochrome logo</title><desc id="desc">One-color Sentzunhat Corp. logo.</desc><g transform="translate(100 20)">${scene('mono', true)}</g><text x="700" y="755" text-anchor="middle" font-family="${font}" font-size="132" font-weight="650" letter-spacing="-3" fill="${colors.ink}">Sentzunhat Corp.</text></svg>\n`
}

mkdirSync(outputDirectory, { recursive: true })
const outputs = {
  'sentzunhat-mark.svg': markSvg(),
  'sentzunhat-logo.svg': primaryLogo(),
  'sentzunhat-logo-horizontal.svg': horizontalLogo(),
  'sentzunhat-logo-monochrome.svg': monochromeLogo(),
}
for (const [name, contents] of Object.entries(outputs)) writeFileSync(new URL(name, outputDirectory), contents)
console.log('Created four Sentzunhat logo assets in src/apps/frontend/public/')
