'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/hooks/useAuth'
import { usePostLike } from '@/hooks/usePostLike'
import { useTimeAgo } from '@/hooks/useTimeAgo'

import Avatar from '../Avatar'

import PostActions from './PostActions'

interface PostItemProps {
  data: Record<string, any>
}

const PostItem: React.FC<PostItemProps> = ({ data = {} }) => {
  const router = useRouter()

  const { user: currentUser } = useAuth()
  const timeAgo = useTimeAgo(data.createdAt)

  const { isLiked, toggleLike, likesCount } = usePostLike({
    postId: data.id as string,
    userId: currentUser?.id,
    initialLikedIds: data.likedIds || [],
  })

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation()
      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id])

  return (
    <div
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar avatarUser={data.user} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{timeAgo}</span>
          </div>
          <div className="text-white mt-1 break-all whitespace-pre-wrap">{data.body}</div>
          <PostActions
            hasLiked={isLiked}
            likesCount={likesCount}
            commentsCount={data.comments?.length || 0}
            onLike={toggleLike}
          />
        </div>
      </div>
    </div>
  )
}

export default PostItem
