import { useSelector } from '@xstate/react';
import { lazy, Suspense } from 'react';
import { isDeletingAppModal } from '../../selectors';
import { stateService } from '../../stateSignal';

const Modal = lazy(() => import('../Modal/Modal'));

export default function DeleteAppDialogLazy({ deleteApp }) {
    const isModalOpen = useSelector(stateService, isDeletingAppModal);
    if (!isModalOpen) {
        return null;
    }
    return (
        <Suspense fallback={<div />}>
            <Modal 
            open={isModalOpen}
            title="Delete app"
            description="Are you sure you want to delete this app?"
            primaryButtonText="Yes, delete"
            secondaryButtonText="No, keep it"
            type="warning"
            onRequestClose={() => stateService.send('CANCEL')}
            onPrimaryButtonClick={() => {
                deleteApp();
            }}
            onSecondaryButtonClick={() => {
                stateService.send('CANCEL');
            }}
            />
        </Suspense>
    );
}
