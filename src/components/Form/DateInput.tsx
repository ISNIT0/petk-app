import { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { PillButton } from 'components/Form/PillButton'
import { format } from 'date-fns'
import cn from 'classnames'

interface DateInputProps {
  value: string
  placeholder: string
  onChange(val: string): void
  name: string
  disabled?: boolean
  required?: boolean
}

export const DateInput = ({
  value,
  placeholder,
  onChange,
  name,
  disabled,
  required,
}: DateInputProps) => {
  const getFormattedDate = useCallback((inputDate: any) => {
    return inputDate ? format(new Date(inputDate), "yyyy-MM-dd'T'HH:mm") : ''
  }, [])

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState(getFormattedDate(value))

  useEffect(() => {
    setInputValue(getFormattedDate(value))
  }, [getFormattedDate, value])

  return (
    <div
      className={cn(styles.dateContainer, {
        [styles.dateContainerActive]: value,
        [styles.dateContainerDisabled]: disabled,
      })}
    >
      <input
        ref={(el) => setInputRef(el)}
        required={required}
        type="datetime-local"
        name={name}
        defaultValue={inputValue}
        value={inputValue}
        placeholder={placeholder}
        disabled={!!disabled}
        className={cn(styles.dateTimePicker, {
          [styles.activeDateTimePicker]: value,
          [styles.disabledDateTimePicker]: disabled,
        })}
        onChange={(ev: any) => {
          setInputValue(ev.target.value)
        }}
        onBlur={() => {
          onChange(inputValue)
        }}
      />

      <PillButton
        onClick={() => {
          let date = new Date()
          date.setDate(date.getDate() + 30)
          date.setHours(0, 1, 0, 0)
          onChange(date.toUTCString())
        }}
        label={'30 days'}
        disabled={!!disabled}
      />

      <PillButton
        onClick={() => {
          let date = new Date()
          date.setFullYear(date.getFullYear(), 11, 31)
          date.setHours(0, 1, 0, 0)
          onChange(date.toISOString())
        }}
        label={'Year end'}
        disabled={!!disabled}
      />
    </div>
  )
}
