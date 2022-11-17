import { Suspense, lazy } from 'react';
import { useSelector } from '@xstate/react';
import { isManageAppsEmptySelector } from '../../../../state/selectors';
import { stateService } from '../../../../state/stateSignal';
import DelayedFallback from '../../../global/DelayedFallback/DelayedFallback';

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
