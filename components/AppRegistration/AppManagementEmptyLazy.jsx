import { Suspense, lazy } from 'react';
import { useSelector } from '@xstate/react';
import { isManageAppsEmptySelector } from '../../selectors';
import { stateService } from '../../stateSignal';
import DelayedFallback from '../DelayedFallback/DelayedFallback';

const LazyAppManagementEmpty = lazy(() => import('./AppManagementEmpty'));

export default function AppManagementEmptyLazy() {
    const isManageAppsEmpty = useSelector(stateService, isManageAppsEmptySelector);
    if (!isManageAppsEmpty) {
        return null;
    }
    return (
        <Suspense fallback={<DelayedFallback />}>
            <LazyAppManagementEmpty />
        </Suspense>
    );
}
