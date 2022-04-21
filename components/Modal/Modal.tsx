import Button from "../Button/Button";
import Dialog from "../Dialog/Dialog";
import styles from './Modal.module.scss';

export default function Modal({ 
    onRequestClose, open, type, title, description,
    primaryButtonText,secondaryButtonText, onPrimaryButtonClick, onSecondaryButtonClick 
}: {
    onRequestClose: () => void, open: boolean, type: 'success' | 'warning', title: string, description: string,
    primaryButtonText?: string, secondaryButtonText: string, onPrimaryButtonClick?: () => void, onSecondaryButtonClick: () => void
}) {
    return (
        <Dialog onRequestClose={onRequestClose} open={open} closeOnOutsideClick>
            <div className={styles.modalHeader}>
                <div className={styles.closeModal} onClick={onRequestClose} />
            </div>
            <div className={styles.modalContent}>
            {type === 'success' && <div className={styles.modalImageSuccess} />}
            {type === 'warning' && <div className={styles.modalImageWarning} />}
            <div className={styles.modalTitle}>{title}</div>
            <div className={styles.modalDescription}>{description}</div>
            </div>
            <div className={styles.modalFooter}>
                <Button type="secondary" onClick={onSecondaryButtonClick}>{secondaryButtonText}</Button>
                { primaryButtonText && <Button onClick={onPrimaryButtonClick}>{primaryButtonText}</Button> }
            </div>
        </Dialog>
    );
}
