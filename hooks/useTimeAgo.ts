import { useState, useEffect } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'

export const useTimeAgo = (date: string | Date | undefined) => {
  const [timeAgo, setTimeAgo] = useState<string>('')

  useEffect(() => {
    if (date) {
      setTimeAgo(formatDistanceToNowStrict(new Date(date), { addSuffix: true }))
    }
  }, [date])

  return timeAgo
}
