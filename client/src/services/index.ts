// Centralized exports for all services
export { authService } from './authService'
export { userService } from './userService'

// Export types for easy access
export type { AuthResponse, SignUpData, SignInData, UpdateProfileData } from './authService'

export type { UserResponse } from './userService'

// Future services can be exported here (fix email verification and email sending)
// export { postService } from './postService'
// export { notificationService } from './notificationService'
