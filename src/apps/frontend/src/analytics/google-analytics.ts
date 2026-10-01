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

const hasExplicitDenial = (): boolean => {
  if (window['ga-disable-G-8TVQJXLW0K'] === true) return true

  try {
    return window.localStorage.getItem(consentKey) === 'denied'
  } catch {
    return false
  }
}

const sendPageView = (): void => {
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    page_title: document.title,
  })
}

const trackCurrentPage = (): void => {
  window.gtag?.('config', measurementId, {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    page_title: document.title,
    send_page_view: true,
  })
}

export const chooseAnalyticsConsent = (granted: boolean): void => {
  let previousChoice: string | null = null
  try {
    previousChoice = window.localStorage.getItem(consentKey)
    window.localStorage.setItem(consentKey, granted ? 'granted' : 'denied')
  } catch {
    // The live setting still applies in this page even when storage is unavailable.
  }

  window['ga-disable-G-8TVQJXLW0K'] = !granted
  window.gtag?.('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  })

  if (granted && previousChoice === 'denied') sendPageView()
}

export const installAnalyticsClickTracking = (): void => {
  if (clickTrackingInstalled) return
  clickTrackingInstalled = true

  // The static HTML tag handles a real document load. SPA history changes
  // need a fresh virtual page view; hash changes are handled here as well.
  window.addEventListener('popstate', trackCurrentPage)
  window.addEventListener('hashchange', trackCurrentPage)

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

    window.gtag?.('event', 'click', {
      link_url: linkPath,
      link_domain: destination.hostname,
      link_id: link.id || undefined,
      link_classes: typeof link.className === 'string' ? link.className : undefined,
      outbound: false,
    })
  })
}
