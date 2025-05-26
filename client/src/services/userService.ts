import { getDB } from '@/db/supabase/supabaseClient'
import type { User } from '@/lib/types/user'

const supabase = getDB()

export interface UserResponse {
  success: boolean
  error?: string
  user?: User | null
}

class UserService {
  // Get user data from session (auth) and optionally merge with database profile
  async getUser(session: any): Promise<User> {
    console.log('Getting user from session:', session?.user?.id)
    
    if (!session?.user) {
      throw new Error('No user in session')
    }

    const authUser = session.user
    
    // Create base user from auth session
    const baseUser: User = {
      id: authUser.id,
      name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
      email: authUser.email || '',
      avatar_url: authUser.user_metadata?.avatar_url || null,
      created_at: new Date(authUser.created_at),
      updated_at: new Date(authUser.updated_at || authUser.created_at),
      email_verified: authUser.email_verified ? new Date() : null,
      role: 'nutritionist' as const,
    }

    console.log('Base user:', baseUser)

    // Try to get additional profile data from database
    try {
      console.log('Fetching user profile from database...')
      const { data: profileData, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle() // Won't throw error if no row exists

      console.log('Profile data:', profileData, error)

      if (error) {
        console.log('Could not fetch user profile from database:', error.message)
        // Return base user from auth - this is not an error
        return baseUser
      }

      if (profileData) {
        // Merge database profile with auth data
        console.log('Found user profile in database, merging with auth data')
        return {
          ...baseUser,
          ...profileData,
          // Ensure auth data takes precedence for these fields
          id: authUser.id,
          email: authUser.email || profileData.email,
          created_at: new Date(authUser.created_at),
          updated_at: new Date(profileData.updated_at || authUser.updated_at || authUser.created_at),
        }
      }

      console.log('Returning base user:', baseUser)

      return baseUser
    } catch (error: any) {
      console.log('Database query failed, using auth data only:', error.message)
      return baseUser
    }
  }

  // Create a user profile in the database
  async createUserProfile(userData: Partial<User>): Promise<UserResponse> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, user: data }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to create user profile' }
    }
  }

  // Update user profile in database
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<UserResponse> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, user: data }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to update user profile' }
    }
  }

  // Check if user exists in database
  async userExistsInDatabase(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        console.log('Error checking if user exists:', error.message)
        return false
      }

      return data !== null
    } catch (error) {
      console.log('Error checking if user exists:', error)
      return false
    }
  }
}

// Export a singleton instance
export const userService = new UserService()
