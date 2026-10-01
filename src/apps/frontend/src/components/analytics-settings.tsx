import { chooseAnalyticsConsent } from '../analytics/google-analytics'

interface AnalyticsSettingsProps {
  open: boolean
  onClose: () => void
}

export const AnalyticsSettings = ({ open, onClose }: AnalyticsSettingsProps) => {
  if (!open) return null

  return (
    <aside className="analytics-settings-panel" aria-label="Analytics settings">
      <p>
        Google Analytics measures page views, internal navigation, and outbound link clicks. It also reports general device,
        browser, and operating system categories. Analytics is on by default where regional settings allow it; you can change
        your preference here. Sentzunhat does not create a device fingerprint.
      </p>
      <div className="analytics-settings-actions">
        <button type="button" onClick={() => { chooseAnalyticsConsent(true); onClose() }}>Enable analytics</button>
        <button type="button" onClick={() => { chooseAnalyticsConsent(false); onClose() }}>Disable analytics</button>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </aside>
  )
}
