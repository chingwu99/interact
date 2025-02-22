import api from '../../api/client'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../../type/auth'

export const authClientService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)

    return response.data.user
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post<AuthResponse>('/auth/register', credentials)

    return response.data.user
  },

  logout: async () => {
    const response = await api.post<AuthResponse>('/auth/logout')
    return response.data.user
  },
}
