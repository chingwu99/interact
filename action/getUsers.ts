import type { User } from '@/type/user'
import { serverApiFetch } from '@/api/server/serverApiFetch'

export const getUsers = async (): Promise<User[]> => {
  try {
    return await serverApiFetch<User[]>('/users', {
      cache: 'no-store',
    })
  } catch (error) {
    throw new Error('Failed to getUsers')
  }
}
