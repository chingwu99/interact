import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

import useLoginModal from '@/hooks/useLoginModal'
import { likeClientService } from '@/services/like/client'

interface UsePostLikeProps {
  postId: string
  userId?: string
  initialLikedIds: string[]
}

export const usePostLike = ({ postId, userId, initialLikedIds }: UsePostLikeProps) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const [isLiked, setIsLiked] = useState(initialLikedIds?.includes(userId || ''))
  const [likesCount, setLikesCount] = useState(initialLikedIds?.length || 0)

  const toggleLike = useCallback(
    async (event?: React.MouseEvent) => {
      event?.stopPropagation()

      if (!userId) {
        return loginModal.onOpen()
      }

      const prevIsLiked = isLiked
      const prevLikesCount = likesCount

      try {
        const request = prevIsLiked
          ? () => likeClientService.unlikePost({ postId })
          : () => likeClientService.likePost({ postId })

        // 先更新 UI 狀態
        setIsLiked((prev) => !prev)
        setLikesCount((prev) => (prevIsLiked ? prev - 1 : prev + 1))

        // 執行請求
        await request()

        // 請求成功後更新路由並顯示成功訊息
        router.refresh()
        toast.success('Success')
      } catch (error) {
        // 請求失敗時恢復原狀態
        setIsLiked(prevIsLiked)
        setLikesCount(prevLikesCount)
        toast.error('Something went wrong')
      }
    },
    [postId, userId, isLiked, likesCount, loginModal, router]
  )

  return {
    isLiked,
    likesCount,
    toggleLike,
  }
}
