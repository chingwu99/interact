export interface CreateCommentData {
  body: string
  postId: string
}

export interface Comment {
  id: string
  body: string
  createdAt: string
  userId: string
  postId: string
  user?: {
    id: string
    name: string
    username: string
    profileImage?: string
  }
}

export interface CommentResponse {
  comment: Comment
}
