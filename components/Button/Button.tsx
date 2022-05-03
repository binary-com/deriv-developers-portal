import styles from './Button.module.scss';

export default function Button({ disabled, onClick, children }: { disabled?: boolean, onClick?: () => void, children: React.ReactNode }) {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.btn}>{children}</button>
  )
}
