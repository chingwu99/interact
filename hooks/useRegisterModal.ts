import { create } from 'zustand'

interface RegisterModalStore {
  isOpen: boolean
  // eslint-disable-next-line
  onOpen: (isInitialized: boolean) => void
  onClose: () => void
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: (isInitialized: boolean) => {
    if (isInitialized) {
      set({ isOpen: true })
    }
  },
  onClose: () => set({ isOpen: false }),
}))

export default useRegisterModal
