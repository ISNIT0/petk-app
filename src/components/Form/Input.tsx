import styles from './styles.module.css'
import cn from 'classnames'
import { HTMLInputTypeAttribute } from 'react'

interface InputProps {
  name: string
  placeholder?: string
  // value?: string
  defaultValue?: string
  onChange(val: string): void
  onBlur?: (e: any) => void
  disabled: boolean
  required?: boolean
  type?: HTMLInputTypeAttribute
  className?: string
}

export const Input = ({
  name,
  placeholder,
  // value,
  defaultValue,
  onChange,
  onBlur,
  disabled,
  required,
  type,
  className,
}: InputProps) => {
  return (
    <input
      className={cn(className, styles.input)}
      type={type || 'text'}
      name={name}
      id={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      // value={value}
      onChange={(ev: any) => onChange(ev.target.value)}
      disabled={disabled}
      required={required}
      onBlur={onBlur}
    />
  )
}
