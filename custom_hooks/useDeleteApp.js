import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useMutation } from 'react-query';
import { stateService } from '../stateSignal';
import { token1, server_url } from '../storageSignals';

const appDelete = async (app_id) => {
    stateService.send('DELETE_APP');
    const api = new DerivAPIBasic({ endpoint: server_url(), lang: 'EN', app_id });
    await api.authorize(token1());
    await api.appDelete(app_id);
    await api.disconnect();
};

export const useDeleteApp = (app_id) => {
    const { mutate, isLoading } = useMutation(() => appDelete(app_id), {
        onSuccess: () => {
            stateService.send('SUCCESS');
            stateService.send('FETCH_APP_LIST');
        },
        onError: () => {
            stateService.send('ERROR');
        },
    });

    const deleteApp = () => {
        mutate(app_id);
    };

    return {
        isLoading,
        deleteApp,
    };
}
