import {
  FaDesktop,
  FaExternalLinkAlt,
  FaGithub,
  FaMoon,
  FaSun,
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

  return (
    <nav
      className="flex h-18 items-center justify-between border-b border-line sm:h-22"
      aria-label="Main navigation"
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
      <div className="flex items-center gap-3 text-[0.8125rem] text-muted sm:gap-7">
        <a className="hidden transition-colors hover:text-ink sm:block" href="/#about">About</a>
        <a className="hidden transition-colors hover:text-ink sm:block" href="/#focus">Work</a>
        <a className="hidden transition-colors hover:text-ink lg:block" href="/#vision">Vision</a>
        <a
          className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
          href="https://github.com/sentzunhat"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="brand-icon" size={15} aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">GitHub</span>
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
                onClick={() => setTheme(value)}
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
