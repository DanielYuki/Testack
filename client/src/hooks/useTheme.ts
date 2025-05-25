import { useAtom } from 'jotai'
import { themeAtom, themePreferenceAtom, systemThemeAtom } from '../store/atoms'

export function useTheme() {
  const [theme] = useAtom(themeAtom)
  const [themePreference, setThemePreference] = useAtom(themePreferenceAtom)
  const [systemTheme] = useAtom(systemThemeAtom)

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemePreference(newTheme)
  }

  const toggleTheme = () => {
    if (themePreference === 'system') {
      setThemePreference('light')
    } else if (themePreference === 'light') {
      setThemePreference('dark')
    } else {
      setThemePreference('system')
    }
  }

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(themePreference)
    const nextIndex = (currentIndex + 1) % themes.length
    setThemePreference(themes[nextIndex])
  }

  return {
    // Current resolved theme
    theme,
    // User's theme preference (including 'system')
    themePreference,
    // Detected system theme
    systemTheme,
    // Theme setters
    setTheme,
    toggleTheme,
    cycleTheme,
    // Helper booleans
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isSystemPreference: themePreference === 'system',
  }
}
