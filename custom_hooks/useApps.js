import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useSelector } from '@xstate/react';
import { useQuery } from 'react-query';
import { stateService } from '../stateSignal';
import { token1, app_id, server_url } from '../storageSignals';

const isLoadingAppsSelector = (state) => state.matches('registration.logged_in.manage_tab.loadingApps.loading');

const getApps = async () => {
    const api = new DerivAPIBasic({ endpoint: server_url(), lang: 'EN', app_id: app_id() }); 
    await api.authorize(token1());
    const apps = await api.appList();
    return apps;
}

export const useApps = () => {
    const isLoadingApps = useSelector(stateService, isLoadingAppsSelector);
    return useQuery('apps', getApps, {
        enabled: isLoadingApps,
        onSuccess: (data) => {
            const isEmpty = data?.app_list?.length === 0;
            if (isEmpty) {
                stateService.send('EMPTY');
            } else {
                stateService.send('SUCCESS');
            }
        },
        onError: () => stateService.send('ERROR'),
    });
}
