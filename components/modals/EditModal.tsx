'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import axios from 'axios'
// eslint-disable-next-line import/order
// @ts-ignore
import { User } from '@prisma/client'

import useEditModal from '@/hooks/useEditModal'

import Input from '../Input'
import Modal from '../Modal'
import ImageUpload from '../ImageUpload'
// import others

interface EditModalProps {
  currentUser: User | null
}

const EditModal: React.FC<EditModalProps> = ({ currentUser }) => {
  const router = useRouter()
  const editModal = useEditModal()

  const [profileImage, setProfileImage] = useState(currentUser?.profileImage as string)
  const [coverImage, setCoverImage] = useState(currentUser?.coverImage as string)
  const [name, setName] = useState(currentUser?.name as string)
  const [username, setUsername] = useState(currentUser?.username as string)
  const [bio, setBio] = useState(currentUser?.bio as string)

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.patch('/api/edit', {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      })

      router.refresh()

      toast.success('Updated')

      editModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [editModal, name, username, bio, router, profileImage, coverImage])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio} disabled={isLoading} />
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  )
}

export default EditModal
