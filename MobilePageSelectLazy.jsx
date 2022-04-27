import { lazy, Suspense } from 'react';
import { useSelector } from '@xstate/react';
import { isMobileSelector } from './selectors';
import { stateService } from './stateSignal';

const MobilePageSelect = lazy(() => import('./MobilePageSelect'));

export default function MobilePageSelectLazy() {
    const isMobile = useSelector(stateService, isMobileSelector);
    if (!isMobile) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <MobilePageSelect />
        </Suspense>
    )
}
