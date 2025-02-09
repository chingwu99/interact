'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { userClientService } from '@/services/user/client'
import useEditModal from '@/hooks/useEditModal'
import { useAuth } from '@/hooks/useAuth'

import Input from '../Input'
import Modal from '../Modal'
import ImageUpload from '../ImageUpload'

import { editSchema, EditFormValues } from './schema'

const EditModal: React.FC = () => {
  const router = useRouter()
  const editModal = useEditModal()
  const [isLoading, setIsLoading] = useState(false)

  const { user: currentUser, checkAuth } = useAuth()

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      username: currentUser?.username || '',
      bio: currentUser?.bio || '',
      profileImage: currentUser?.profileImage || '',
      coverImage: currentUser?.coverImage || '',
    }),
    [currentUser]
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    mode: 'onBlur',
    defaultValues,
  })

  const profileImage = watch('profileImage')
  const coverImage = watch('coverImage')

  useEffect(() => {
    if (editModal.isOpen) {
      reset(defaultValues)
    }
  }, [editModal.isOpen, currentUser, reset, defaultValues])

  const onSubmit = async (data: EditFormValues) => {
    try {
      setIsLoading(true)

      await userClientService.updateUser(data)

      checkAuth()
      router.refresh()
      toast.success('Updated')
      editModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setValue('profileImage', image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setValue('coverImage', image)}
        label="Upload cover image"
      />

      <Input id="name" register={register} placeholder="Name" disabled={isLoading} errors={errors.name?.message} />
      <Input
        id="username"
        register={register}
        placeholder="Username"
        disabled={isLoading}
        errors={errors.username?.message}
      />
      <Input id="bio" register={register} placeholder="Bio" disabled={isLoading} errors={errors.bio?.message} />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={() => {
        editModal.onClose()
        reset()
      }}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  )
}

export default EditModal
