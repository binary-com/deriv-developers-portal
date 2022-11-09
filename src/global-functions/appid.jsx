import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { socket_url } from '../state/storageSignals';

const isBrowser = typeof window !== 'undefined';

export const generateDerivApiInstance = () => {
    if (!isBrowser) return;

    const deriv_socket = new WebSocket(socket_url());

    return new DerivAPIBasic({
        connection: deriv_socket,
    });
};

export const api = generateDerivApiInstance();
