import { create } from 'zustand'

interface LoginModalStore {
  isOpen: boolean
  // eslint-disable-next-line
  onOpen: (isInitialized: boolean) => void
  onClose: () => void
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: (isInitialized: boolean) => {
    if (isInitialized) {
      set({ isOpen: true })
    }
  },
  onClose: () => set({ isOpen: false }),
}))

export default useLoginModal
