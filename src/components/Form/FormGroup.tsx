import styles from './styles.module.css'

interface FormGroupProps {
  children: React.ReactNode
  onClick?(): void
}

export const FormGroup = ({ children, onClick }: FormGroupProps) => {
  return (
    <section className={styles.formGroup} onClick={onClick}>
      {children}
    </section>
  )
}
