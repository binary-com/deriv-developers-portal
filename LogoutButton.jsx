import { useSelector } from '@xstate/react';
import { Suspense, lazy } from 'react';
import { isLoggedInSelector } from './selectors';
import { stateService } from './stateSignal';
import styles from './LogoutButton.module.scss';

const LazyButton = lazy(() => import('./components/Button/Button'));

export default function LogoutButton() {
    const isLoggedIn = useSelector(stateService, isLoggedInSelector);
    if (!isLoggedIn) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <div className={styles.signOut}>
                <LazyButton onClick={() => stateService.send('LOGOUT')}>
                    Sign out
                </LazyButton>
            </div>
        </Suspense>
    );
}
