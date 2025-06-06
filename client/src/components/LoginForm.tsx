import { useState } from 'react'
import { authService } from '@/services/authService'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isSignUp) {
        // for now, we are not using email verification (have to fix this)
        const result = await authService.signUp({ email, password, name })
        if (result.success) {
          setMessage('Check your email for a verification link!')
        } else {
          setError(result.error || 'Sign up failed')
        }
      } else {
        const result = await authService.signIn({ email, password })
        if (!result.success) {
          setError(result.error || 'Sign in failed')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError(null)
    setMessage(null)

    try {
      const result = await authService.signInWithGoogle()
      if (!result.success) {
        setError(result.error || 'Google sign in failed')
      }
      // If successful, the user will be redirected by Google OAuth
    } catch (err) {
      setError('An unexpected error occurred with Google sign in')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white'>
            {isSignUp ? 'Create your account' : 'Sign in to your account'}
          </h2>
        </div>

        <div className='mt-8 space-y-6'>
          {error && (
            <div className='rounded-md bg-red-50 dark:bg-red-900/20 p-4'>
              <div className='text-sm text-red-700 dark:text-red-400'>{error}</div>
            </div>
          )}

          {message && (
            <div className='rounded-md bg-green-50 dark:bg-green-900/20 p-4'>
              <div className='text-sm text-green-700 dark:text-green-400'>{message}</div>
            </div>
          )}

          {/* Google Sign In Button */}
          <div>
            <button
              type='button'
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className='group relative w-full flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {googleLoading ? (
                'Signing in with Google...'
              ) : (
                <>
                  <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                    <path
                      fill='#4285F4'
                      d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    />
                    <path
                      fill='#34A853'
                      d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    />
                    <path
                      fill='#FBBC05'
                      d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    />
                    <path
                      fill='#EA4335'
                      d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300 dark:border-gray-600' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
                Or continue with email
              </span>
            </div>
          </div>

          <div className='space-y-4'>
            {isSignUp && (
              <div>
                <label htmlFor='name' className='sr-only'>
                  Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required={isSignUp}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                  placeholder='Full name'
                />
              </div>
            )}

            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Email address'
              />
            </div>

            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                placeholder='Password'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              onClick={handleSubmit}
              disabled={loading || googleLoading}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign up' : 'Sign in'}
            </button>
          </div>

          <div className='text-center'>
            <button
              type='button'
              onClick={() => setIsSignUp(!isSignUp)}
              className='text-indigo-600 dark:text-indigo-400 hover:text-indigo-500'
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
