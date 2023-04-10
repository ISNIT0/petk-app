import styles from './styles.module.css'
import { JSXElement } from '@babel/types'
import { useRef } from 'react'

interface TitleInputProps {
  name: string
  placeholder: string
  defaultValue: string
  onChange(val: string): void
  disabled?: boolean
  required?: boolean
}

const autoGrow = (element: HTMLTextAreaElement | null) => {
  if (element && element.scrollHeight > 86) {
    element.style.height = '5px'
    element.style.height = element.scrollHeight + 'px'
  }
}

export const TitleInput = ({
  name,
  placeholder,
  defaultValue,
  onChange,
  disabled,
  required,
}: TitleInputProps) => {
  const ref = useRef<HTMLTextAreaElement>(null)

  return (
    <textarea
      ref={ref}
      className={styles.titleInput}
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={(ev: any) => onChange(ev.target.value)}
      disabled={disabled}
      required={required}
      title={disabled ? 'You cannot edit this field' : ''}
      onInput={() => autoGrow(ref.current)}
    />
  )
}
