'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Input from '../Input'
import Modal from '../Modal'

import { registerSchema, RegisterFormValues } from './schema'

const RegisterModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setIsLoading(true)

      // 註冊新帳戶
      await axios.post('/api/register', data)
      toast.success('Account created')

      // 自動登入
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.ok) {
        toast.success('Login successful')
        router.refresh()
        registerModal.onClose()
      } else {
        throw new Error(result?.error || 'An error occurred')
      }
    } catch (error: any) {
      toast.error(error?.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    registerModal.onClose()
    reset()
    loginModal.onOpen()
  }, [loginModal, registerModal, reset])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input<RegisterFormValues>
        id="email"
        register={register}
        placeholder="Email"
        disabled={isLoading}
        errors={errors.email?.message}
      />
      <Input<RegisterFormValues>
        id="name"
        register={register}
        placeholder="Name"
        disabled={isLoading}
        errors={errors.name?.message}
      />
      <Input<RegisterFormValues>
        id="username"
        register={register}
        placeholder="Username"
        disabled={isLoading}
        errors={errors.username?.message}
      />
      <Input<RegisterFormValues>
        id="password"
        register={register}
        placeholder="Password"
        type="password"
        disabled={isLoading}
        errors={errors.password?.message}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          Log in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={() => {
        registerModal.onClose()
        reset()
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
