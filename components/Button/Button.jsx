import styles from './Button.module.scss';

export default function Button({ onClick, children}) {
  return (
    <button onClick={onClick} className={styles.btn}>{children}</button>
  )
}