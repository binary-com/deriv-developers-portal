// load lazy suspendse AppManagement.jsx
import { lazy, Suspense } from 'react';
import { useSelector } from '@xstate/react';
import { isManageAppsTabSelector } from '../../selectors';
import { stateService } from '../../stateSignal';
import DelayedFallback from '../DelayedFallback/DelayedFallback';

const LazyAppManagement = lazy(() => import('./AppManagement'));

export default function AppManagementLazy() {
    const isManageAppsTab = useSelector(stateService, isManageAppsTabSelector);
    if (!isManageAppsTab) {
        return null;
    }
    return (
        <Suspense fallback={<DelayedFallback />}>
            <LazyAppManagement />
        </Suspense>
    );
}
