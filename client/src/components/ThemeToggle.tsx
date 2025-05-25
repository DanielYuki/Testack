import { useTheme } from '../hooks/useTheme'

interface ThemeToggleProps {
  variant?: 'button' | 'dropdown'
  showLabel?: boolean
}

export default function ThemeToggle({ variant = 'button', showLabel = false }: ThemeToggleProps) {
  const { theme, themePreference, systemTheme, setTheme, cycleTheme } = useTheme()

  const getThemeIcon = (themeType: 'light' | 'dark' | 'system') => {
    switch (themeType) {
      case 'light':
        return '☀️'
      case 'dark':
        return '🌙'
      case 'system':
        return '💻'
      default:
        return '💻'
    }
  }

  const getThemeLabel = (themeType: 'light' | 'dark' | 'system') => {
    switch (themeType) {
      case 'light':
        return 'Light'
      case 'dark':
        return 'Dark'
      case 'system':
        return `System (${systemTheme})`
      default:
        return 'System'
    }
  }

  if (variant === 'dropdown') {
    return (
      <div className='relative'>
        <select
          value={themePreference}
          onChange={e => setTheme(e.target.value as 'light' | 'dark' | 'system')}
          className={`px-4 py-2 rounded-md transition-colors border ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value='system'>💻 System</option>
          <option value='light'>☀️ Light</option>
          <option value='dark'>🌙 Dark</option>
        </select>
      </div>
    )
  }

  return (
    <button
      onClick={cycleTheme}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        theme === 'dark'
          ? 'bg-gray-800 text-white hover:bg-gray-700'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      title={`Current: ${getThemeLabel(themePreference)}. Click to cycle themes.`}
    >
      <span className='text-lg'>{getThemeIcon(themePreference)}</span>
      {showLabel && <span className='text-sm font-medium'>{getThemeLabel(themePreference)}</span>}
    </button>
  )
}
