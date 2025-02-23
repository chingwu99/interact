import type { User } from './user'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  username: string
}

export interface AuthResponse {
  user: User
}
