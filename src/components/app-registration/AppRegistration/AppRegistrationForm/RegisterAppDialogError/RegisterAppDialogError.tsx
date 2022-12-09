import { useSelector } from '@xstate/react';
import { lazy, Suspense } from 'react';
import { isRegisterErrorSelector } from '../../../../../state/selectors';
import { stateService } from '../../../../../state/stateSignal';
import DelayedFallback from '../../../../global/DelayedFallback/DelayedFallback';

const Modal = lazy(() => import('../../../../global/Modal/Modal'));

export default function RegisterAppDialogError({ error }) {
    const isModalOpen = useSelector(stateService, isRegisterErrorSelector);
    if (!isModalOpen) {
        return null;
    }
    const catchError = () => {
        if (error && error.error?.code === 'InvalidToken') {
            return 'Enter your API token (with the Admin scope) to register your app.';
        } else if (error) {
            return error.error?.message;
        }
    };
    return (
        <Suspense fallback={<DelayedFallback />}>
            <Modal
                open={isModalOpen}
                title='Error!'
                description={catchError()}
                secondaryButtonText='Got it'
                type='warning'
                onRequestClose={() => stateService.send('CLOSE_MODAL')}
                onSecondaryButtonClick={() => {
                    stateService.send('CLOSE_MODAL');
                }}
            />
        </Suspense>
    );
}
