import * as z from 'zod'

export const editSchema = z.object({
  name: z.string().min(2, 'name must be at least 2 characters'),
  username: z.string().min(2, 'username must be at least 2 characters'),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
})

export type EditFormValues = z.infer<typeof editSchema>

export const loginSchema = z.object({
  email: z.string().email('please enter a valid email'),
  password: z.string().min(8, 'password must be at least 8 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().email('please enter a valid email'),
  name: z.string().min(2, 'name must be at least 2 characters'),
  username: z.string().min(2, 'username must be at least 2 characters'),
  password: z.string().min(8, 'password must be at least 8 characters'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
