import { createEffect, createSignal } from 'solid-js';

import { app_id, server_url, token1 } from './storageSignals';
import { send } from './stateSignal';

export const [oauthUrl, setOauthUrl] = createSignal('');

createEffect(() => {
  const is_production = window.location.hostname === 'api.deriv.com';
  if (is_production) {
      const app_id = 31063;
      localStorage.setItem('app_id', app_id);
  }
  const loginUrl = () => {
    if (server_url) {
        return `https://${server_url()}/oauth2/authorize?app_id=${app_id()}&l=EN&brand=deriv`;
    }
    return `https://oauth.deriv.com/oauth2/authorize?app_id=${app_id()}&l=EN&brand=deriv`;
  };
  setOauthUrl(loginUrl());
  if (token1()) {
    send('LOGIN');
  }
});
