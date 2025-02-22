export interface User {
  id: string
  name: string
  username: string
  bio?: string
  email: string
  profileImage?: string
  coverImage?: string
  createdAt: string
  updatedAt: string
  followingIds?: string[]
  hasNotification?: boolean
}

export type UserWithFollowersCount = User & {
  followersCount: number
}

export interface UpdateUserData {
  name?: string
  username?: string
  bio?: string
  profileImage?: string
  coverImage?: string
}

export interface Notification {
  id: string
  body: string
  createdAt: string
  userId: string
  user?: User
}
