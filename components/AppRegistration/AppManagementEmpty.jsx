import styles from './AppManagementEmpty.module.scss';
import { send } from '../../stateSignal';
import Button from '../Button/Button';

export default function AppManagementEmpty() {
    return (
        <div className={styles.noAppsWrapper}>
            <div className={styles.noApps}>
                <div className={styles.noAppsIcon} />
                <div className={styles.noAppsText}>
                    <p>To see your details reflected, please register your app via the registration form.</p>
                </div>
                <Button type='secondary' onClick={() => send('REGISTER_TOGGLE_TAB')}>Register now</Button>
            </div>
        </div>
    );
}
