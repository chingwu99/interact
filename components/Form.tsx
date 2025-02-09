'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-hot-toast'

// import custom hook
import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useAuth } from '@/hooks/useAuth'
import { postClientService } from '@/services/post/client'
import { commentClientService } from '@/services/comment/client'

import Avatar from './Avatar'
import Button from './Button'
import SubmitButton from './SubmitButton'

interface FormProps {
  placeholder: string
  isComment?: boolean
  postId?: string
}

const formSchema = z.object({
  body: z.string().min(1, { message: 'Interact cannot be empty' }),
})

type FormValues = z.infer<typeof formSchema>

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const { user: currentUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true)

      if (isComment && postId) {
        await commentClientService.createComment({
          body: values.body,
          postId,
        })
      } else {
        await postClientService.createPost(values)
      }

      toast.success('Interact created')
      reset()
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} avatarUser={currentUser} />
          </div>

          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <textarea
                disabled={isLoading}
                id="body"
                {...register('body')}
                className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full 
                bg-black 
                ring-0 
                outline-none 
                text-[20px] 
                placeholder-neutral-500 
                text-white
              "
                placeholder={placeholder}
              />
              <hr
                className="
                opacity-0 
                peer-focus:opacity-100 
                h-[1px] 
                w-full 
                border-neutral-800 
                transition"
              />
              <div className="mt-4 flex flex-row justify-end">
                <SubmitButton disabled={isLoading || !isValid} type="submit" label="Interact" />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="py-8 flex flex-col justify-center items-center">
          <Image alt="Logo" src="/officialLogo.png" quality={100} height="71" width="340" />
          <h1 className="text-white text-xl text-center mb-4 font-bold my-8">Welcome to Interact</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  )
}

export default Form
