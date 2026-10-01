import { useEffect } from 'react'

import { chooseAnalyticsConsent, enableGoogleAnalytics, hasAnalyticsChoice, hasMeasurementId } from '../analytics/google-analytics'

interface AnalyticsConsentProps {
  open: boolean
  onClose: () => void
  onOpen: () => void
}

export const AnalyticsConsent = ({ open, onClose, onOpen }: AnalyticsConsentProps) => {
  useEffect(() => {
    if (!hasMeasurementId()) return
    if (hasAnalyticsChoice()) enableGoogleAnalytics()
    else onOpen()
  }, [onOpen])

  if (!hasMeasurementId()) return null

  return (
    <>
      {open && <aside className="analytics-consent" aria-label="Analytics preferences">
        <p>May we use Google Analytics to understand visits to this site? You can accept or decline.</p>
        <div className="analytics-consent-actions">
          <button type="button" onClick={() => { chooseAnalyticsConsent(true); onClose() }}>Accept</button>
          <button type="button" onClick={() => { chooseAnalyticsConsent(false); onClose() }}>Decline</button>
        </div>
      </aside>}
    </>
  )
}
