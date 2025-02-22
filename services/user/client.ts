import api from '../../api/client'
import type { User, UpdateUserData } from '../../type/user'

export const userClientService = {
  // Update user profile
  updateUser: async (data: UpdateUserData) => {
    const response = await api.patch<User>('/users/update', data)
    return response.data
  },
}
