'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAuth } from '@/hooks/useAuth'
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Input from '../Input'
import Modal from '../Modal'

import { loginSchema, LoginFormValues } from './schema'

const LoginModal = () => {
  const router = useRouter()
  const { login, isInitialized } = useAuth()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true)
      await login({
        email: data.email,
        password: data.password,
      })
      loginModal.onClose()
      router.refresh()
    } catch (error) {
      // Error is handled by useAuth
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    loginModal.onClose()
    reset()
    registerModal.onOpen(isInitialized)
  }, [loginModal, registerModal, reset, isInitialized])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input<LoginFormValues>
        id="email"
        register={register}
        placeholder="Email"
        disabled={isLoading}
        errors={errors.email?.message}
      />
      <Input<LoginFormValues>
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
        First time using Interact?
        <span
          onClick={onToggle}
          className="
            text-white 
            cursor-pointer 
            hover:underline
          "
        >
          Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log in"
      actionLabel="Log in"
      onClose={() => {
        loginModal.onClose()
        reset()
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal
