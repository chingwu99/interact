import type { UserWithFollowersCount } from '@/type/user'
import { serverApiFetch } from '@/api/server/serverApiFetch'

interface GetUserParams {
  userId?: string
}

export const getUser = async ({ userId }: GetUserParams): Promise<UserWithFollowersCount> => {
  try {
    return await serverApiFetch<UserWithFollowersCount>(`/users/${userId}`, {
      cache: 'no-store',
    })
  } catch (error) {
    throw new Error('Failed to getUsers')
  }
}
