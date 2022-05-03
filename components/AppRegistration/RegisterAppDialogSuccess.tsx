import { useSelector } from '@xstate/react';
import { lazy, Suspense } from 'react';
import { isRegisterSuccessSelector } from '../../selectors';
import { stateService } from '../../stateSignal';

const Modal = lazy(() => import('../Modal/Modal'));

export default function RegisterAppDialogSuccess() {
    const isModalOpen = useSelector(stateService, isRegisterSuccessSelector);
    if (!isModalOpen) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <Modal 
            open={isModalOpen}
            title="Success!"
            description="You have successfully registered your application. You can now start using Deriv API."
            primaryButtonText="Manage application"
            secondaryButtonText="Got it"
            type="success"
            onRequestClose={() => stateService.send('CLOSE_MODAL')}
            onPrimaryButtonClick={() => {
                stateService.send('MANAGE_TOGGLE_TAB');
            }}
            onSecondaryButtonClick={() => {
                stateService.send('CLOSE_MODAL');
            }}
            />
        </Suspense>
    );
}
