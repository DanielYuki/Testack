import { useState, useEffect } from 'react'
import { useUser } from '@/providers/UserProvider'
import { authService } from '@/services/authService'

export default function Profile() {
  const { user, updateUserProfile } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      })
    }
  }, [user])

  const handleLogout = async () => {
    const result = await authService.signOut()
    if (!result.success) {
      console.error('Error logging out:', result.error)
    }
  }

  const handleSave = async () => {
    if (!user) return
    setLoading(true)
    setError(null)

    const success = await updateUserProfile({ name: formData.name })

    if (success) {
      setIsEditing(false)
    } else {
      setError('Failed to update profile. Please try again.')
    }

    setLoading(false)
  }

  const handleCancel = () => {
    setFormData({ name: user?.name || '', email: user?.email || '' })
    setIsEditing(false)
  }

  return (
    <div className={`min-h-screen p-8  dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-900`}>
      <div className='container mx-auto max-w-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold mb-4'>User Profile</h1>
          <p className='text-gray-600 dark:text-gray-300'>
            Your authenticated profile powered by Supabase
          </p>
        </div>

        {/* Supabase Active Banner */}
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
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
            </div>
            <div className='flex-1'>
              <h3 className='text-sm font-semibold text-green-800 dark:text-green-200'>
                ✅ Supabase Integration Active!
              </h3>
              <p className='text-sm text-green-700 dark:text-green-300 mt-1'>
                Real-time authentication, secure logout, and profile management are now working.
              </p>
            </div>
          </div>
        </div>

        <div className={`p-8 rounded-lg shadow-lg  dark:bg-gray-800 bg-white`}>
          {user && (
            <div>
              <div className='flex items-center justify-between mb-6'>
                <div className='flex items-center space-x-4'>
                  <div className='text-4xl'>👨‍💻</div>
                  <div>
                    <h2 className='text-2xl font-bold'>Welcome back, {user?.name}!</h2>
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

                  {error && (
                    <div className='rounded-md bg-red-50 dark:bg-red-900/20 p-4'>
                      <div className='text-sm text-red-700 dark:text-red-400'>{error}</div>
                    </div>
                  )}

                  <div className='flex space-x-4'>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className='px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
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
                        <p className='text-lg'>{user?.name}</p>
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-600 dark:text-gray-300'>
                          Email
                        </label>
                        <p className='text-lg'>{user?.email || 'Not provided'}</p>
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

        {/* Enhanced Features Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
          <div
            className={`p-4 rounded-lg dark:bg-gray-800 bg-white shadow-md border-2 border-green-300 dark:border-green-600`}
          >
            <h3 className='font-semibold mb-2 text-green-700 dark:text-green-300'>
              ✅ Active Supabase Features:
            </h3>
            <ul className='text-sm space-y-1 text-green-600 dark:text-green-400'>
              <li>• Custom authentication forms</li>
              <li>• Secure login/logout</li>
              <li>• Real-time auth state management</li>
              <li>• User profile display</li>
              <li>• Profile editing (name updates)</li>
            </ul>
          </div>

          <div
            className={`p-4 rounded-lg dark:bg-gray-800 bg-white shadow-md border-2 border-dashed border-blue-300 dark:border-blue-600`}
          >
            <h3 className='font-semibold mb-2 text-blue-700 dark:text-blue-300'>
              🔮 Future Enhancements:
            </h3>
            <ul className='text-sm space-y-1 text-blue-600 dark:text-blue-400'>
              <li>• Database user profiles</li>
              <li>• Profile photo uploads</li>
              <li>• Email verification</li>
              <li>• Password reset functionality</li>
              <li>• Multi-device sync</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
