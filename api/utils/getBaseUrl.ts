export const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_API_URL
  }
  return process.env.NEXT_DEV_API_URL || 'http://localhost:3001'
}
