import styles from './InlineCode.module.scss';

export const InlineCode = ({ children }) => {
    return (
        <code className={styles.inlineCode}>{children}</code>
    )
}
