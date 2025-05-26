import { getDB } from '@/db/supabase/supabaseClient'
import type { User } from '@/lib/types/user'

const supabase = getDB()

export interface AuthResponse {
  success: boolean
  error?: string
  user?: User | null
}

export interface SignUpData {
  email: string
  password: string
  name: string
}

export interface SignInData {
  email: string
  password: string
}

// Same as UpdateUserProfileData in userService.ts, but with email
export interface UpdateProfileData {
  name?: string
  email?: string
}

class AuthService {
  // Sign up with email and password
  async signUp({ email, password, name }: SignUpData): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' }
    }
  }

  // Sign in with email and password
  async signIn({ email, password }: SignInData): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' }
    }
  }

  // Sign out
  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' }
    }
  }

  // Get current session
  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) throw error
      return session
    } catch (error: any) {
      console.error('Error getting session:', error)
      return null
    }
  }

  // Listen to auth state changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }

  // Update user profile
  async updateProfile(data: UpdateProfileData): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.updateUser({
        data,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' }
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email)

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message || 'An unexpected error occurred' }
    }
  }
}

// Export a singleton instance
export const authService = new AuthService()
