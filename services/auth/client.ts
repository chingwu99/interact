import api from '../clientApi'

import type { LoginCredentials, RegisterCredentials, AuthResponse } from './type'

export const authClientService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post<AuthResponse>('/auth/register', credentials)
    localStorage.setItem('token', response.data.token)
    return response.data.user
  },

  logout: async () => {
    localStorage.removeItem('token')
    return null
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token')
    if (!token) return null

    const response = await api.get('/current')
    return response.data
  },
}
