// eslint-disable-next-line
import { Path, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps<T extends FieldValues> {
  placeholder?: string
  label?: string
  type?: string
  disabled?: boolean
  required?: boolean
  id: Path<T>
  register: UseFormRegister<T>
  errors?: string
}

const Input = <T extends FieldValues>({
  id,
  placeholder,
  type = 'text',
  disabled,
  label,
  required,
  register,
  errors,
}: InputProps<T>) => (
  <div className="w-full">
    {label && <p className={`text-xl text-white font-semibold mb-2 ${errors && `text-rose-500`}`}>{label}</p>}
    <input
      id={id}
      {...register(id, { required })}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      className={`
          w-full
          p-4 
          text-lg 
          bg-black 
          border-2
          border-neutral-800 
          rounded-md
          outline-none
          text-white
          focus:border-[#906B7F]
          focus:border-2
          transition
          disabled:bg-neutral-900
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors && `border-rose-500`} ${errors && `focus:border-rose-500`}
        `}
    />
    {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}
  </div>
)

export default Input
