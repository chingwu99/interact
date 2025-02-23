import type { User } from './user'

export interface FollowUserData {
  userId: string
}

export interface FollowResponse {
  user: User
}
