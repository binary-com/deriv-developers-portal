import { useSelector } from '@xstate/react';
import { lazy, Suspense } from 'react';
import { isRegisterErrorSelector } from '../../selectors';
import { stateService } from '../../stateSignal';

const Modal = lazy(() => import('../Modal/Modal'));

export default function RegisterAppDialogError({ error }) {
    const isModalOpen = useSelector(stateService, isRegisterErrorSelector);
    if (!isModalOpen) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <Modal 
                open={isModalOpen}
                title="Error!"
                description={error?.error?.message}
                secondaryButtonText="Got it"
                type="warning"
                onRequestClose={() => stateService.send('CLOSE_MODAL')}
                onSecondaryButtonClick={() => {
                    stateService.send('CLOSE_MODAL');
                }}
            />
        </Suspense>
    );
}
