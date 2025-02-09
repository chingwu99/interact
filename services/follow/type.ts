import type { User } from '../user/type'

export interface FollowUserData {
  userId: string
}

export interface FollowResponse {
  user: User
}
