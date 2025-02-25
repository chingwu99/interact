'use client'

import LoaderMini from './LoaderMini'

interface ButtonProps {
  label: string
  secondary?: boolean
  fullWidth?: boolean
  large?: boolean
  disabled?: boolean
  outline?: boolean
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  disabled,
  outline,
  type = 'button',
  isLoading = false,
}) => (
  <button
    disabled={disabled}
    type={type}
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
