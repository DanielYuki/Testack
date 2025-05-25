import { useTheme } from '../hooks/useTheme'
import ThemeToggle from '../components/ThemeToggle'

export default function ThemeSettings() {
  const { theme, themePreference, systemTheme, setTheme, isDark, isLight, isSystemPreference } =
    useTheme()

  const themeOptions = [
    {
      value: 'light' as const,
      label: 'Light Mode',
      icon: '☀️',
      description: 'Always use light theme regardless of system preference',
    },
    {
      value: 'dark' as const,
      label: 'Dark Mode',
      icon: '🌙',
      description: 'Always use dark theme regardless of system preference',
    },
    {
      value: 'system' as const,
      label: 'System Preference',
      icon: '💻',
      description: 'Automatically switch between light and dark based on your system settings',
    },
  ]

  return (
    <div
      className={`min-h-screen p-8 ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className='container mx-auto max-w-4xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>Theme Settings</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Advanced theme management with system preference detection and persistence
          </p>
        </div>

        {/* Current Theme Status */}
        <div
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className='text-2xl font-bold mb-4'>Current Theme Status</h2>
          <div className='grid md:grid-cols-3 gap-4'>
            <div className='text-center'>
              <div className='text-3xl mb-2'>🎨</div>
              <div className='text-lg font-semibold'>Active Theme</div>
              <div className='text-gray-600 dark:text-gray-300 capitalize'>{theme}</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl mb-2'>⚙️</div>
              <div className='text-lg font-semibold'>User Preference</div>
              <div className='text-gray-600 dark:text-gray-300 capitalize'>{themePreference}</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl mb-2'>🖥️</div>
              <div className='text-lg font-semibold'>System Theme</div>
              <div className='text-gray-600 dark:text-gray-300 capitalize'>{systemTheme}</div>
            </div>
          </div>
        </div>

        {/* Theme Options */}
        <div
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className='text-2xl font-bold mb-6'>Choose Theme Preference</h2>
          <div className='space-y-4'>
            {themeOptions.map(option => (
              <div
                key={option.value}
                className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                  themePreference === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : theme === 'dark'
                      ? 'border-gray-600 hover:border-gray-500'
                      : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setTheme(option.value)}
              >
                <div className='flex items-start space-x-4'>
                  <div className='text-2xl'>{option.icon}</div>
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <h3 className='text-lg font-semibold'>{option.label}</h3>
                      {themePreference === option.value && (
                        <span className='px-2 py-1 bg-blue-500 text-white text-xs rounded-full'>
                          Active
                        </span>
                      )}
                    </div>
                    <p className='text-gray-600 dark:text-gray-300 mt-1'>{option.description}</p>
                    {option.value === 'system' && (
                      <p className='text-sm text-blue-600 dark:text-blue-400 mt-2'>
                        Currently following: {systemTheme} mode
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Theme Components Demo */}
        <div
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className='text-2xl font-bold mb-6'>Theme Toggle Components</h2>
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-3'>Button Style (Cycles through options)</h3>
              <div className='flex space-x-4'>
                <ThemeToggle variant='button' showLabel={false} />
                <ThemeToggle variant='button' showLabel={true} />
              </div>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-3'>Dropdown Style (Direct selection)</h3>
              <ThemeToggle variant='dropdown' />
            </div>
          </div>
        </div>

        {/* Theme Information */}
        <div
          className={`p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
        >
          <h2 className='text-2xl font-bold mb-4'>Theme Features</h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold mb-3'>✨ Features</h3>
              <ul className='space-y-2 text-gray-600 dark:text-gray-300'>
                <li>• System preference detection</li>
                <li>• Automatic theme switching</li>
                <li>• Persistent user preferences</li>
                <li>• Real-time system changes</li>
                <li>• Mobile theme-color support</li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-3'>🔧 Technical Details</h3>
              <ul className='space-y-2 text-gray-600 dark:text-gray-300'>
                <li>• Uses Jotai for state management</li>
                <li>• localStorage persistence</li>
                <li>• CSS class-based theming</li>
                <li>• MediaQuery API integration</li>
                <li>• TypeScript support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Debug Information */}
        <div
          className={`mt-8 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          } shadow-md`}
        >
          <h3 className='font-semibold mb-2'>🐛 Debug Information:</h3>
          <div className='text-sm space-y-1 text-gray-600 dark:text-gray-300 font-mono'>
            <div>isDark: {isDark.toString()}</div>
            <div>isLight: {isLight.toString()}</div>
            <div>isSystemPreference: {isSystemPreference.toString()}</div>
            <div>Resolved theme: {theme}</div>
            <div>User preference: {themePreference}</div>
            <div>System theme: {systemTheme}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
