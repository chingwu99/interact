'use client'

import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

import Avatar from '../Avatar'

interface CommentItemProps {
  data: Record<string, any>
  createdAt: string | null
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {}, createdAt }) => {
  const router = useRouter()

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation()

      router.push(`/users/${data.user.id}`)
    },
    [router, data.user.id]
  )

  return (
    <div
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
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
