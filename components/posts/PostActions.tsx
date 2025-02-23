'use client'

import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from 'react-icons/ai'

interface PostActionsProps {
  hasLiked: boolean
  likesCount: number
  commentsCount: number
  onLike: () => void
}

const PostActions = ({ hasLiked, likesCount, commentsCount, onLike }: PostActionsProps) => (
  <div className="flex flex-row items-center mt-3 gap-4">
    <div className="flex flex-row items-center gap-2 cursor-pointer">
      <div onClick={onLike}>
        {hasLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20} color="white" />}
      </div>
      <p className="text-white">{likesCount}</p>
    </div>
    <div className="flex flex-row items-center gap-2 cursor-pointer">
      <AiOutlineMessage size={20} color="white" />
      <p className="text-white">{commentsCount}</p>
    </div>
  </div>
)

export default PostActions
