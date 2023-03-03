import styles from './Button.module.scss';

export default function Button({
    type = '',
    disabled,
    onClick,
    children,
}: {
    type?: string;
    disabled?: boolean;
    onClick?: () => void | undefined;
    children: React.ReactNode;
}) {
    let classesNames = `${styles.btn}`;
    if (type === 'secondary') {
        classesNames += ` ${styles.secondary}`;
    } else if (type === 'logout') {
        classesNames += ` ${styles.logout}`;
    }

    return (
        <button disabled={disabled} onClick={onClick} className={classesNames}>
            {children}
        </button>
    );
}
