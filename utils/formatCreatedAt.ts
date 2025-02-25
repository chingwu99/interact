import { formatDistanceToNowStrict } from 'date-fns'

export const formatCreatedAt = (createdAt: string | null): string | null => {
  if (!createdAt) {
    return null
  }
  return formatDistanceToNowStrict(new Date(createdAt))
}
