import styles from './InlineCode.module.scss';

export const InlineCode = ({ children }) => (
    <code className={styles.inlineCode}>{children}</code>
)