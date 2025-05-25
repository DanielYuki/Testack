import { createContext, useContext, useState, useEffect } from 'react'
import { getDB } from '../lib/supabase/supabaseClient'

interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

interface UserContextType {
  user: User | null
  session: any
  loading: boolean
}

const UserContext = createContext<UserContextType>({
  user: null,
  session: null,
  loading: true,
})

// Create the Supabase client once, outside the component
const supabase = getDB()

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session?.user) {
        fetchUser(session.user.id)
      } else {
        setLoading(false)
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        fetchUser(session.user.id)
      } else {
        setUser(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUser = async (userId: string) => {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single()

      if (error) {
        // If user doesn't exist in users table, create a basic user object
        if (error.code === 'PGRST116') {
          console.log('User not found in users table, creating basic user object')
          // Create a basic user object from auth session
          const authUser = session?.user
          if (authUser) {
            const basicUser = {
              id: authUser.id,
              email: authUser.email,
              name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
              avatar_url: authUser.user_metadata?.avatar_url || null,
              created_at: authUser.created_at,
              updated_at: authUser.updated_at,
            }
            setUser(basicUser)
          }
        } else {
          throw error
        }
      } else {
        setUser(data)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      // Don't completely fail - create a basic user from session if available
      if (session?.user) {
        const authUser = session.user
        const fallbackUser = {
          id: authUser.id,
          email: authUser.email,
          name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
          avatar_url: authUser.user_metadata?.avatar_url || null,
          created_at: authUser.created_at,
          updated_at: authUser.updated_at,
        }
        setUser(fallbackUser)
      }
    } finally {
      setLoading(false)
    }
  }

  return <UserContext.Provider value={{ user, session, loading }}>{children}</UserContext.Provider>
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
