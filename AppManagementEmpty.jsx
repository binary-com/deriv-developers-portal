import styles from './AppManagementEmpty.module.scss';
import Button from './components/Button/Button';
import { send } from './stateSignal';

export default function AppManagementEmpty() {
    return (
        <div className={styles.noAppsWrapper}>
            <div className={styles.noApps}>
                <div className={styles.noAppsIcon} />
                <div className={styles.noAppsText}>
                    <p>To see your details reflected, please register your app via the registration form.</p>
                </div>
                <div className={styles.emptyButton}><Button onClick={() => send('REGISTER_TOGGLE_TAB')}>Register now</Button></div>
            </div>
        </div>
    );
}