// load lazy suspendse AppManagement.jsx
import { lazy, Suspense } from 'react';
import { useSelector } from '@xstate/react';
import { isManageAppsTabSelector } from './selectors';
import { stateService } from './stateSignal';

const LazyAppManagement = lazy(() => import('./AppManagement'));

export default function AppManagementLazy() {
    const isManageAppsTab = useSelector(stateService, isManageAppsTabSelector);
    if (!isManageAppsTab) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <LazyAppManagement />
        </Suspense>
    );
}
