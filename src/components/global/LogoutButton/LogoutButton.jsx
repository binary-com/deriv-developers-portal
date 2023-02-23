import { useSelector } from '@xstate/react';
import { Suspense, lazy } from 'react';
import { isLoggedInSelector } from '../../../state/selectors';
import { stateService } from '../../../state/stateSignal';
import styles from './LogoutButton.module.scss';

const LazyButton = lazy(() => import('../Button/Button'));

export const LogoutButton = () => {
    const isLoggedIn = useSelector(stateService, isLoggedInSelector);
    if (!isLoggedIn) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <div className={styles.signOut}>
                <LazyButton onClick={logout}>Sign out</LazyButton>
            </div>
        </Suspense>
    );
};

const logout = () => {
    stateService.send('LOGOUT');
    sessionStorage.removeItem('token1');
    location.replace('/app-registration/');
};
