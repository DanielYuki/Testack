import { userAtom } from '@/store/atoms'
import { useAtom } from 'jotai'
import { useState } from 'react'

export default function Profile() {
  const [user, setUser] = useAtom(userAtom)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: user.name, email: user.email })

  const handleLogin = () => {
    setUser({ ...user, isLoggedIn: true })
  }

  const handleLogout = () => {
    setUser({ name: 'Guest', email: '', isLoggedIn: false })
    setIsEditing(false)
  }

  const handleSave = () => {
    setUser({ ...user, name: formData.name, email: formData.email })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({ name: user.name, email: user.email })
    setIsEditing(false)
  }

  return (
    <div className={`min-h-screen p-8  dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900`}>
      <div className='container mx-auto max-w-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>User Profile</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Demonstrating user state management with Jotai
          </p>
        </div>

        {/* Supabase Coming Soon Banner */}
        <div className='mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-700 rounded-lg'>
          <div className='flex items-center space-x-3'>
            <div className='flex-shrink-0'>
              <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center'>
                <svg
                  className='w-4 h-4 text-white'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='text-sm font-semibold text-green-800 dark:text-green-200'>
                🚀 Supabase Integration Coming Soon!
              </h3>
              <p className='text-sm text-green-700 dark:text-green-300 mt-1'>
                Real-time database sync, authentication, and profile persistence will be available
                soon.
              </p>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-lg shadow-lg  dark:bg-gray-800 bg-white`}>
          {!user.isLoggedIn ? (
            <div className='text-center'>
              <div className='text-6xl mb-4'>👤</div>
              <h2 className='text-2xl font-bold mb-4'>Welcome, Guest!</h2>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                You are not logged in. Click the button below to simulate a login.
              </p>
              <button
                onClick={handleLogin}
                className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold'
              >
                Login
              </button>
            </div>
          ) : (
            <div>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center space-x-4'>
                  <div className='text-4xl'>👨‍💻</div>
                  <div>
                    <h2 className='text-2xl font-bold'>Welcome back, {user.name}!</h2>
                    <p className='text-gray-600 dark:text-gray-300'>You are logged in</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'
                >
                  Logout
                </button>
              </div>

              {isEditing ? (
                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium mb-2'>Name</label>
                    <input
                      type='text'
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${'bg-gray-700 border-gray-600 text-white dark:bg-white dark:border-gray-300 dark:text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium mb-2'>Email</label>
                    <input
                      type='email'
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${'bg-gray-700 border-gray-600 text-white dark:bg-white dark:border-gray-300 dark:text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div className='flex space-x-4'>
                    <button
                      onClick={handleSave}
                      className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className={`p-4 rounded-lg dark:bg-gray-700 bg-gray-100`}>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-600 dark:text-gray-300'>
                          Name
                        </label>
                        <p className='text-lg'>{user.name}</p>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-600 dark:text-gray-300'>
                          Email
                        </label>
                        <p className='text-lg'>{user.email || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Features Section with Supabase Plans */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
          <div className={`p-4 rounded-lg dark:bg-gray-800 bg-white shadow-md`}>
            <h3 className='font-semibold mb-2'>💡 Current Jotai Features:</h3>
            <ul className='text-sm space-y-1 text-gray-600 dark:text-gray-300'>
              <li>• Object state management</li>
              <li>• Conditional rendering based on state</li>
              <li>• Form state synchronization</li>
              <li>• State persistence across navigation</li>
            </ul>
          </div>

          <div
            className={`p-4 rounded-lg dark:bg-gray-800 bg-white shadow-md border-2 border-dashed border-green-300 dark:border-green-600`}
          >
            <h3 className='font-semibold mb-2 text-green-700 dark:text-green-300'>
              🔮 Coming with Supabase:
            </h3>
            <ul className='text-sm space-y-1 text-green-600 dark:text-green-400'>
              <li>• Real-time profile sync</li>
              <li>• Secure authentication</li>
              <li>• Cloud data persistence</li>
              <li>• Multi-device profile access</li>
              <li>• Profile photo uploads</li>
            </ul>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className='mt-8 text-center'>
          <div className='inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm'>
            <div className='animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500'></div>
            <span>Database integration in development...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
