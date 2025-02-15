import { useState, useCallback, useEffect } from 'react'
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

  // 使用 useEffect 來更新狀態，確保與 props 同步
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  useEffect(() => {
    setIsLiked(initialLikedIds?.includes(userId || ''))
    setLikesCount(initialLikedIds?.length || 0)
  }, [userId, initialLikedIds])

  const toggleLike = useCallback(
    async (event?: React.MouseEvent) => {
      event?.stopPropagation()

      if (!userId) {
        return loginModal.onOpen()
      }

      try {
        const request = isLiked
          ? () => likeClientService.unlikePost({ postId })
          : () => likeClientService.likePost({ postId })

        // 執行請求
        await request()

        // 請求成功後才更新狀態
        setIsLiked((prev) => !prev)
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1))

        router.refresh()
      } catch (error) {
        toast.error('Something went wrong')
      }
    },
    [postId, userId, isLiked, loginModal, router]
  )

  return {
    isLiked,
    likesCount,
    toggleLike,
  }
}
