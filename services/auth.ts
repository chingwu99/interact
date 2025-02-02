import api from './api'

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {
  name: string
  username: string
}

export interface AuthResponse {
  token: string
  user: any
}

export const authService = {
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
