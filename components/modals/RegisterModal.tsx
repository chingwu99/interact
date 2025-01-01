'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Input from '../Input'
import Modal from '../Modal'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const isValidInput = useCallback(
    () => email !== '' && password !== '' && username !== '' && name !== '',
    [email, password, username, name]
  )

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal, isLoading])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      // 註冊新帳戶
      await axios
        .post('/api/register', {
          email,
          password,
          username,
          name,
        })
        .catch((error) => {
          throw new Error(error || 'Something went wrong')
        })

      toast.success('Account created.')

      // 自動登入
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.ok) {
        toast.success('Logged in')
        router.refresh()
        registerModal.onClose()
      } else {
        throw new Error(result?.error || 'Something went wrong')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [email, password, registerModal, username, name, router])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input disabled={isLoading} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input disabled={isLoading} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input
        disabled={isLoading}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
      disabled={isLoading || !isValidInput()}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
