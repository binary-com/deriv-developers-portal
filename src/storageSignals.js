import { createEffect, createSignal } from 'solid-js';
export const [token1, setToken1] = createSignal(sessionStorage.getItem('token1'));
export const [app_id, setAppId] = createSignal(localStorage.getItem('app_id'));
export const [server_url, setServerUrl] = createSignal(localStorage.getItem('server_url'));
export const socket_url = () => `wss://${server_url()}/websockets/v3?app_id=${app_id()}&l=EN&brand=deriv`;

createEffect(() => {
    const app_id_in_local = localStorage.getItem('app_id') || '31063';
    const server_url_in_local = localStorage.getItem('server_url') || 'blue.binaryws.com';
    const token_in_local = sessionStorage.getItem('token1');

    if (app_id_in_local) setAppId(app_id_in_local);
    if (server_url_in_local) {
        setServerUrl(server_url_in_local);
    }
    if (token_in_local) {
        setToken1(token_in_local);
    }
});

createEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token1_in_url = urlParams.get('token1');
    const app_id_in_url = urlParams.get('app_id');
    const endpoint_in_url = urlParams.get('server_url');

    if (app_id_in_url) setAppId(app_id_in_url);
    if (endpoint_in_url) {
        setServerUrl(endpoint_in_url);
    }
    if (token1_in_url) {
        setToken1(token1_in_url);
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

createEffect(() => {
    if(app_id()) localStorage.setItem('app_id', app_id());
    if(server_url()) localStorage.setItem('server_url', server_url());
    if(token1()) sessionStorage.setItem('token1', token1());
});

createEffect(() => {
    const is_production = window.location.hostname === 'api.deriv.com';

    if (is_production) {
        setServerUrl('green.binaryws.com');
    }
});
