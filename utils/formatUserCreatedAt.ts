import { format } from 'date-fns'

export const formatUserCreatedAt = (createdAt?: string | null) => {
  if (!createdAt) {
    return null
  }
  return format(new Date(createdAt), 'MMMM yyyy')
}
