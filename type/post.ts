export interface CreatePostData {
  body: string
}

export interface Post {
  id: string
  body: string
  createdAt: string
  updatedAt: string
  userId: string
  user?: {
    id: string
    name: string
    username: string
    profileImage?: string
  }
  comments?: Comment[]
  likedIds?: string[]
}
