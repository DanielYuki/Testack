import { useAtom } from 'jotai'
import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { themeAtom, themePreferenceAtom, systemThemeAtom } from '../store/atoms'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useAtom(themeAtom)
  const [, setSystemTheme] = useAtom(systemThemeAtom)
  const [themePreference] = useAtom(themePreferenceAtom)

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // Set initial system theme
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light')

    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [setSystemTheme])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement

    // Remove existing theme classes
    root.classList.remove('light', 'dark')

    // Add current theme class
    root.classList.add(theme)

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#111827' : '#ffffff')
    } else {
      // Create meta theme-color if it doesn't exist
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = theme === 'dark' ? '#111827' : '#ffffff'
      document.head.appendChild(meta)
    }
  }, [theme])

  // Log theme changes for debugging
  useEffect(() => {
    console.log(`Theme changed to: ${theme} (preference: ${themePreference})`)
  }, [theme, themePreference])

  return <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
}
