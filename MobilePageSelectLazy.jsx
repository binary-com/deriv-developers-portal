import { lazy, Suspense } from 'react';
import { useSelector } from '@xstate/react';
import { isMobileSelector } from './selectors';
import { stateService } from './stateSignal';
import DelayedFallback from './components/DelayedFallback/DelayedFallback';

const MobilePageSelect = lazy(() => import('./MobilePageSelect'));

export default function MobilePageSelectLazy() {
    const isMobile = useSelector(stateService, isMobileSelector);
    if (!isMobile) {
        return null;
    }
    return (
        <Suspense fallback={<DelayedFallback />}>
            <MobilePageSelect />
        </Suspense>
    )
}
