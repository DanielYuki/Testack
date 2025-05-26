import { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '@/services/authService'
import { userService } from '@/services/userService'
import type { User } from '@/lib/types/user'

interface UserContextType {
  user: User | null
  session: any
  loading: boolean
  refreshUser: () => Promise<void>
  updateUserProfile: (updates: { name?: string }) => Promise<boolean>
  isInitialized: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  loading: true,
  refreshUser: async () => {},
  updateUserProfile: async () => false,
  isInitialized: false,
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state
  useEffect(() => {
    initializeAuth()

    // Listen to auth state changes
    const {
      data: { subscription },
    } = authService.onAuthStateChange(handleAuthStateChange)

    return () => subscription.unsubscribe()
  }, [])

  const initializeAuth = async () => {
    try {
      const currentSession = await authService.getSession()
      await handleAuthStateChange('INITIAL_SESSION', currentSession)
    } catch (error) {
      console.error('Error initializing auth:', error)
      setLoading(false)
      setIsInitialized(true)
    }
  }

  const handleAuthStateChange = async (event: string, newSession: any) => {
    console.log('Auth state change:', event, newSession?.user?.id || 'no user')
    
    setSession(newSession)

    if (newSession?.user) {
      await loadUser(newSession)
    } else {
      setUser(null)
      setLoading(false)
    }
    
    setIsInitialized(true)
  }

  const loadUser = async (currentSession: any) => {
    try {
      setLoading(true)
      const userData = await userService.getUser(currentSession)
      setUser(userData)
      console.log('User loaded:', userData)
    } catch (error) {
      console.error('Error loading user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const refreshUser = async () => {
    if (session?.user) {
      await loadUser(session)
    }
  }

  const updateUserProfile = async (updates: { name?: string }): Promise<boolean> => {
    if (!user) return false

    try {
      // Update in Supabase Auth first
      const authResponse = await authService.updateProfile(updates)
      if (!authResponse.success) {
        console.error('Failed to update auth profile:', authResponse.error)
        return false
      }

      // Try to update in database (create if doesn't exist)
      const userExistsInDb = await userService.userExistsInDatabase(user.id)
      
      if (userExistsInDb) {
        // Update existing profile
        const dbResponse = await userService.updateUserProfile(user.id, updates)
        if (!dbResponse.success) {
          console.log('Could not update database profile:', dbResponse.error)
        }
      } else {
        // Create new profile in database
        const profileData = { ...user, ...updates }
        const dbResponse = await userService.createUserProfile(profileData)
        if (!dbResponse.success) {
          console.log('Could not create database profile:', dbResponse.error)
        }
      }

      // Update local state regardless of database operation success
      setUser(prev => (prev ? { ...prev, ...updates } : null))
      return true
    } catch (error) {
      console.error('Error updating user profile:', error)
      return false
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        session,
        loading,
        refreshUser,
        updateUserProfile,
        isInitialized,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
