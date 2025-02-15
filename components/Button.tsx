import LoaderMini from '@/components/LoaderMini'

interface ButtonProps {
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  onClick: () => void
  disabled?: boolean
  outline?: boolean
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline,
  isLoading,
}) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className={`
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-full
        font-semibold
        hover:opacity-80
        transition
        border-2
        flex 
        items-center 
        justify-center
        gap-2
        ${fullWidth ? 'w-full' : 'w-fit'}
        ${secondary ? 'bg-white' : '   bg-[#906B7F]'}
        ${secondary ? 'text-black' : 'text-white'}
        ${secondary ? 'border-black' : 'border-[#906B7F]'}
        ${large ? 'text-xl' : 'text-md'}
        ${large ? 'px-5' : 'px-4'}
        ${large ? 'py-3' : 'py-2'}
        ${outline ? 'bg-transparent' : ''}
        ${outline ? 'border-white' : ''}
        ${outline ? 'text-white' : ''}
      `}
  >
    {label}
    {isLoading && <LoaderMini />}
  </button>
)

export default Button
