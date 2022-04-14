import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useQuery } from 'react-query';
import { token1, app_id, server_url } from './storageSignals';

export default function AuthorizeAPI() {
    const balance = useAccountBalance();
    return <div>{balance}</div>
}

const getBalance = async () => {
    const api = new DerivAPIBasic({ endpoint: server_url(), lang: 'EN', app_id: app_id() }); 
    await api.authorize(token1());
    const balanceData = await api.balance();
    return balanceData.balance.balance;
}

const useAccountBalance = () => {
    const { data, isLoading, error } = useQuery('balance', getBalance);
    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;
    return data;
}
