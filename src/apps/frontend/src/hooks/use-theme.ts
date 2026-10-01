import { useEffect, useState } from 'react'

import type { Theme } from '../types'

const readStoredTheme = (): Theme => {
  const value = localStorage.getItem('sentzunhat-theme')
  return value === 'light' || value === 'dark' ? value : 'system'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system')
  const [restored, setRestored] = useState(false)

  useEffect(() => {
    setTheme(readStoredTheme())
    setRestored(true)
  }, [])

  useEffect(() => {
    if (!restored) return
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sentzunhat-theme', theme)
  }, [restored, theme])

  return { theme, setTheme }
}
