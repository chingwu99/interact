import type { Post } from '../post/type'

export interface LikePostData {
  postId: string
}

export interface LikeResponse {
  post: Post
}
