import { create } from 'zustand'
import { toast } from 'react-hot-toast'

import { authClientService } from '@/services/auth/client'
import type { LoginCredentials, RegisterCredentials } from '@/services/auth/type'

interface AuthStore {
  user: any | null
  isLoading: boolean
  isAuthenticated: boolean
  // eslint-disable-next-line
  login: (credentials: LoginCredentials) => Promise<void>
  // eslint-disable-next-line
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  // eslint-disable-next-line
  setIsLoading: (isLoading: boolean) => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (credentials) => {
    try {
      const user = await authClientService.login(credentials)
      set({ user, isAuthenticated: true })
      toast.success('Logged in successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  },

  register: async (credentials) => {
    try {
      const user = await authClientService.register(credentials)
      set({ user, isAuthenticated: true })
      toast.success('Registered successfully')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  },

  logout: async () => {
    try {
      await authClientService.logout()
      set({ user: null, isAuthenticated: false })
      toast.success('Logged out successfully')
    } catch (error: any) {
      toast.error('Logout failed')
      throw error
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const user = await authClientService.getCurrentUser()
      set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      })
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  setIsLoading: (isLoading: boolean) => {
    set({ isLoading })
  },
}))
