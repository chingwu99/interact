import { create } from 'zustand'
import { toast } from 'react-hot-toast'

import { authClientService } from '@/services/auth/client'
import type { LoginCredentials, RegisterCredentials } from '@/type/auth'

interface AuthStore {
  // eslint-disable-next-line
  login: (credentials: LoginCredentials) => Promise<void>
  // eslint-disable-next-line
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
}

export const useAuth = create<AuthStore>(() => ({
  login: async (credentials) => {
    try {
      await authClientService.login(credentials)
      toast.success('Logged in successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  },

  register: async (credentials) => {
    try {
      await authClientService.register(credentials)
      toast.success('Registered successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  },

  logout: async () => {
    try {
      await authClientService.logout()
      toast.success('Logged out successfully')
    } catch (error: any) {
      toast.error('Logout failed')
      throw error
    }
  },
}))
