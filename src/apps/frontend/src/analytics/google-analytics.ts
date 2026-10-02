/* eslint-disable @typescript-eslint/naming-convention -- GA4 uses documented snake_case parameter names. */
const consentKey = 'sentzunhat-analytics-consent'
const measurementId = 'G-8TVQJXLW0K'

type GoogleTag = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: GoogleTag
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

let clickTrackingInstalled = false
let lastTrackedPageLocation: string | undefined

const hasExplicitDenial = (): boolean => {
  if (window[`ga-disable-${measurementId}`] === true) return true

  try {
    return window.localStorage.getItem(consentKey) === 'denied'
  } catch {
    return false
  }
}

const sendPageView = (): void => {
  const pageLocation = window.location.href
  lastTrackedPageLocation = pageLocation
  window.gtag?.('event', 'page_view', {
    page_location: pageLocation,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    page_title: document.title,
  })
}

const trackCurrentPage = (): void => {
  if (hasExplicitDenial() || lastTrackedPageLocation === window.location.href) return

  sendPageView()
}

export const chooseAnalyticsConsent = (granted: boolean): void => {
  let previousChoice: string | null = null
  try {
    previousChoice = window.localStorage.getItem(consentKey)
    window.localStorage.setItem(consentKey, granted ? 'granted' : 'denied')
  } catch {
    // The live setting still applies in this page even when storage is unavailable.
  }

  window[`ga-disable-${measurementId}`] = !granted
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  })

  if (granted && previousChoice === 'denied') sendPageView()
}

export const installAnalyticsClickTracking = (): void => {
  if (clickTrackingInstalled) return
  clickTrackingInstalled = true

  // The static HTML tag disables automatic page views, so send the initial
  // one here. SPA history changes need a fresh virtual page view. Native
  // history/hash changes are observed below, and a deferred URL check covers
  // booklet navigation through history.pushState.
  window.addEventListener('popstate', trackCurrentPage)
  window.addEventListener('hashchange', trackCurrentPage)

  if (!hasExplicitDenial()) sendPageView()

  document.addEventListener('click', (event) => {
    if (hasExplicitDenial() || !(event.target instanceof Element)) return

    const link = event.target.closest('a[href]')
    if (!(link instanceof HTMLAnchorElement)) return

    let destination: URL
    try {
      destination = new URL(link.href, window.location.href)
    } catch {
      return
    }

    if (destination.protocol !== 'http:' && destination.protocol !== 'https:') return
    if (destination.origin !== window.location.origin) return

    const linkPath = `${destination.pathname}${destination.search}${destination.hash}`
    const currentPath = `${window.location.pathname}${window.location.hash}`
    if (linkPath === currentPath && destination.origin === window.location.origin) return

    const pageBeforeClick = window.location.href

    window.gtag?.('event', 'click', {
      link_url: linkPath,
      link_domain: destination.hostname,
      link_id: link.id || undefined,
      link_classes: typeof link.className === 'string' ? link.className : undefined,
      outbound: false,
    })

    window.setTimeout(() => {
      if (window.location.href !== pageBeforeClick) trackCurrentPage()
    }, 0)
  })
}
