import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useMutation } from 'react-query';
import { stateService } from '../state/stateSignal';
import { token1, server_url, app_id } from '../state/storageSignals';

const appDelete = async created_app_id => {
    stateService.send('DELETE_APP');
    const api = new DerivAPIBasic({ endpoint: server_url(), lang: 'EN', app_id: app_id() });
    await api.authorize(token1());
    await api.appDelete(created_app_id);
    await api.disconnect();
};

export const useDeleteApp = created_app_id => {
    const { mutate, isLoading } = useMutation(() => appDelete(created_app_id), {
        onSuccess: () => {
            stateService.send('SUCCESS');
            stateService.send('FETCH_APP_LIST');
        },
        onError: () => {
            stateService.send('ERROR');
        },
    });

    const deleteApp = () => {
        mutate(created_app_id);
    };

    return {
        isLoading,
        deleteApp,
    };
};
