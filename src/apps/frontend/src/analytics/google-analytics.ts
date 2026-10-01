/* eslint-disable @typescript-eslint/naming-convention -- GA4 requires its documented snake_case parameter names. */
const defaultMeasurementId = 'G-8TVQJXLW0K'
const configuredMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
const measurementId = configuredMeasurementId === undefined || configuredMeasurementId.trim().length === 0
  ? defaultMeasurementId
  : configuredMeasurementId.trim()
const consentKey = 'sentzunhat-analytics-consent'

type GoogleTag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: GoogleTag
  }
}

let initialized = false

const hasAnalyticsConsent = (): boolean => {
  try {
    return window.localStorage.getItem(consentKey) === 'granted'
  } catch {
    return false
  }
}

const sendPageView = (): void => {
  if (!hasAnalyticsConsent()) return

  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
  })
}

export const hasMeasurementId = (): boolean => Boolean(measurementId)

export const hasAnalyticsChoice = (): boolean => {
  try {
    return window.localStorage.getItem(consentKey) !== null
  } catch {
    return true
  }
}

export const enableGoogleAnalytics = (): void => {
  if (measurementId === undefined || measurementId.length === 0 || initialized || !hasAnalyticsConsent()) return

  initialized = true
  window.dataLayer = window.dataLayer ?? []
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args)
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
  document.head.append(script)

  sendPageView()
  window.addEventListener('popstate', sendPageView)
}

export const chooseAnalyticsConsent = (granted: boolean): void => {
  try {
    window.localStorage.setItem(consentKey, granted ? 'granted' : 'denied')
  } catch {
    return
  }

  if (granted) {
    enableGoogleAnalytics()
    return
  }

  window.removeEventListener('popstate', sendPageView)
  window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
}
