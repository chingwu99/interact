import type { Post } from './post'

export interface LikePostData {
  postId: string
}

export interface LikeResponse {
  post: Post
}
