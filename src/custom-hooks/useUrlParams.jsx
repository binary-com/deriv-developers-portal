import React from 'react';
import { useLocation } from 'react-router-dom';

export function useUrlParams() {
    const location = useLocation();
    const [url_params, setUrlParams] = React.useState([]);

    React.useEffect(() => {
        let params_array = [];
        if (location.search) {
            const params = new URLSearchParams(location.search);
            for (const param of params) {
                params_array = [...params_array, param];
            }
            setUrlParams(params_array);
        }
    }, [location.search]);

    return url_params;
}
