import { useEffect, useState } from 'react'

import type { Theme } from '../types'

const readStoredTheme = (): Theme => {
  const value = localStorage.getItem('sentzunhat-theme')
  return value === 'light' || value === 'dark' ? value : 'system'
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(readStoredTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sentzunhat-theme', theme)
  }, [theme])

  return { theme, setTheme }
}
