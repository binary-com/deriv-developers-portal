import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useSelector } from '@xstate/react';
import { useMutation } from 'react-query';
import { isUpdateModeSelector } from '../selectors';
import { stateService, updatingRow } from '../stateSignal';
import { server_url, app_id } from '../storageSignals';

const appRegister = async ({ token, name, redirect_uri, scopes, verification_uri, app_markup_percentage = 0, isUpdateMode }) => {
    stateService.send('SUBMIT');
    const api = new DerivAPIBasic({ endpoint: server_url(), lang: 'EN', app_id: app_id() });
    await api.authorize(token);
    const registerParams = { name, redirect_uri, scopes, app_markup_percentage };
    if (verification_uri) registerParams.verification_uri = verification_uri;
    if (isUpdateMode) {
        registerParams.app_update = updatingRow().app_id;
        await api.send(registerParams)
        await api.disconnect();
    } else {
        registerParams.app_register = 1;
        await api.send(registerParams)
        await api.disconnect();
    }
};

const mapFormDataToScope = (form_data) => {
    const scopes = [];
    if (form_data.read_scope) scopes.push('read');
    if (form_data.trade_scope) scopes.push('trade');
    if (form_data.trading_information_scope) scopes.push('trading_information');
    if (form_data.payments_scope) scopes.push('payments');
    if (form_data.admin_scope) scopes.push('admin');
    return scopes;
};

export const useRegisterOrUpdateApp = () => {
    const { mutate, isLoading, error } = useMutation(({
        token,
        name,
        redirect_uri,
        scopes,
        verification_uri,
        app_markup_percentage,
        isUpdateMode,
    }) => appRegister({
        token,
        name,
        redirect_uri,
        scopes,
        verification_uri,
        app_markup_percentage,
        isUpdateMode,
    }), {
        onSuccess: () => {
            stateService.send('SUCCESS');
        },
        onError: () => {
            stateService.send('ERROR');
        },
    });
    const isUpdateMode = useSelector(stateService, isUpdateModeSelector);

    const registerApp = (form_data) => {
        const token = form_data.api_token_input;
        const name = form_data.app_name;
        const redirect_uri = form_data.app_redirect_uri;
        const verification_uri = form_data.app_verification_uri;
        const app_markup_percentage = form_data.app_markup_percentage;
        const scopes = mapFormDataToScope(form_data);
        mutate({ token, name, redirect_uri, scopes, verification_uri, app_markup_percentage, isUpdateMode })
    }

    return {
        isLoading,
        registerApp,
        error
    };
};
