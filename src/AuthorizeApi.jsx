import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { useQuery } from 'react-query';

export default function AuthorizeAPI() {
    const balance = useAccountBalance();
    return <div>{balance}</div>
}

const getBalance = async () => {
    const api = new DerivAPIBasic({ endpoint: 'frontend.binaryws.com', lang: 'EN', app_id: 1089 }); 
    // TODO connect to login and get token from localStorage
    await api.authorize('');
    const balanceData= await api.balance();
    return balanceData.balance.balance;
}


const useAccountBalance = () => {
    const { data, isLoading, error } = useQuery('balance', getBalance);
    if (isLoading) return 'Loading...';
    if (error) return 'An error has occurred: ' + error.message;
    return data;
}
