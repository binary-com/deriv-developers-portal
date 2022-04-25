import Button from "../Button/Button";
import styles from './ButtonSecondary.module.scss';

export default function ButtonSecondary({ children, onClick }) {
    return (
        <div className={styles.buttonSecondary}>
            <Button onClick={onClick}>
                {children}
            </Button>
        </div>
    );
}
