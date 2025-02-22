import { serverApiFetch } from '@/api/server/serverApiFetch'
import type { User } from '@/type/user'

export const getServerSession = async (): Promise<User | null> => {
  try {
    return await serverApiFetch<User>('/current', {
      requireAuth: true,
      cache: 'no-store',
    })
  } catch (error) {
    console.error('Failed to getServerSession', error)
    return null
  }
}
