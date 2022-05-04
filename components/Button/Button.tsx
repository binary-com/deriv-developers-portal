import styles from './Button.module.scss';

export default function Button({ type = '', disabled, onClick, children }: { type?: string, disabled?: boolean, onClick?: () => void, children: React.ReactNode }) {
  let classesNames = `${styles.btn}`;
  if (type === 'secondary') {
    classesNames += ` ${styles.secondary}`;
  }
  return (
    <button disabled={disabled} onClick={onClick} className={classesNames}>{children}</button>
  )
}
