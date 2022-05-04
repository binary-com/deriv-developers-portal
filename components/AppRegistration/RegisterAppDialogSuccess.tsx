import { useSelector } from '@xstate/react';
import { lazy, Suspense } from 'react';
import { isRegisterSuccessSelector, isUpdateModeSelector } from '../../selectors';
import { stateService } from '../../stateSignal';

const Modal = lazy(() => import('../Modal/Modal'));

export default function RegisterAppDialogSuccess() {
    const isModalOpen = useSelector(stateService, isRegisterSuccessSelector);
    const isUpdateMode = useSelector(stateService, isUpdateModeSelector);
    const description = isUpdateMode ? 'Your app has been updated successfully.' :
    'You have successfully registered your application. You can now start using Deriv API.';
    if (!isModalOpen) {
        return null;
    }
    const closeAndInvalidate = () => {
        stateService.send('CLOSE_MODAL');
    };
    return (
        <Suspense fallback={<div />}>
            <Modal 
            open={isModalOpen}
            title="Success!"
            description={description}
            primaryButtonText="Manage application"
            secondaryButtonText="Got it"
            type="success"
            onRequestClose={closeAndInvalidate}
            onPrimaryButtonClick={() => {
                stateService.send('MANAGE_TOGGLE_TAB');
            }}
            onSecondaryButtonClick={closeAndInvalidate}
            />
        </Suspense>
    );
}
