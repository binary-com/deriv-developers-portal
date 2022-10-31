import { useSelector } from '@xstate/react';
import { lazy, Suspense } from 'react';
import { isRegisterSuccessSelector, isUpdateModeSelector } from '../../../../state/selectors';
import { stateService } from '../../../../state/stateSignal';

const Modal = lazy(() => import('../../../global/Modal/Modal'));

export default function RegisterAppDialogSuccess() {
    const isModalOpen = useSelector(stateService, isRegisterSuccessSelector);
    const isUpdateMode = useSelector(stateService, isUpdateModeSelector);
    const description = isUpdateMode
        ? 'Your app has been updated successfully.'
        : 'You have successfully registered your application. You can now start using Deriv API.';
    const primaryButtonText = isUpdateMode ? null : 'Manage application';
    if (!isModalOpen) {
        return null;
    }
    const closeModal = () => {
        stateService.send('CLOSE_MODAL');
    };
    return (
        <Suspense fallback={<div />}>
            <Modal
                open={isModalOpen}
                title='Success!'
                description={description}
                primaryButtonText={primaryButtonText}
                secondaryButtonText='Got it'
                type='success'
                onRequestClose={closeModal}
                onPrimaryButtonClick={() => {
                    stateService.send('MANAGE_TOGGLE_TAB');
                }}
                onSecondaryButtonClick={closeModal}
            />
        </Suspense>
    );
}
