import { useEffect, useRef, useState } from 'react'
import {
  FaBars,
  FaDesktop,
  FaExternalLinkAlt,
  FaGithub,
  FaMoon,
  FaSun,
  FaTimes,
} from 'react-icons/fa'

import { useTheme } from '../hooks/use-theme'
import type { Theme } from '../types'

const themeOptions: Array<{ value: Theme; label: string }> = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButton.current?.focus()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 641px)').matches) setMenuOpen(false)
    }
    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav
      className="flex h-18 items-center justify-between border-b border-line sm:h-22"
      aria-label="Main navigation"
      data-menu-open={menuOpen}
    >
      <a
        className="flex items-center gap-2 font-bold tracking-[-0.03em]"
        href="/"
        aria-label="sentzunhat home"
      >
        <img
          className="h-9 w-16 object-contain"
          src="/sentzunhat-mark.svg"
          alt=""
          width="64"
          height="36"
        />
        <span>sentzunhat</span>
      </a>
      <button
        ref={menuButton}
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation-panel"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
      </button>
      <div id="mobile-navigation-panel" className="header-actions flex items-center gap-3 text-[0.8125rem] text-muted sm:gap-7">
        <div className="site-section-links" aria-label="Homepage sections">
          <a href="/#projects" onClick={closeMenu}>Projects</a>
          <a href="/#about" onClick={closeMenu}>Company</a>
          <a href="/#opensource" onClick={closeMenu}>Public work</a>
          <a href="/#vision" onClick={closeMenu}>Vision</a>
        </div>
        <a
          className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          href="https://github.com/sentzunhat"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          <FaGithub className="brand-icon" size={15} aria-hidden="true" />
          <span>GitHub</span>
          <FaExternalLinkAlt className="ui-icon external-icon" size={10} aria-hidden="true" />
        </a>
        <div className="theme-switcher" role="group" aria-label="Theme preference">
          {themeOptions.map(({ value, label }) => {
            const Icon = value === 'light' ? FaSun : value === 'dark' ? FaMoon : FaDesktop
            return (
              <button
                className="theme-option"
                type="button"
                aria-pressed={theme === value}
                aria-label={`${label} theme`}
                title={`${label} theme`}
                onClick={() => {
                  setTheme(value)
                  closeMenu()
                }}
                key={value}
              >
                <Icon className="ui-icon" size={13} aria-hidden="true" />
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
