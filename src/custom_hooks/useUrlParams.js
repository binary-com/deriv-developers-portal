import React from "react";

export function useUrlParams() {
    const [url_params, setUrlParams] = React.useState([])

    React.useEffect(() => {
        let params_array = [];
        if (window.location.search) {
            const params = new URLSearchParams(window.location.search)
            for (const param of params) {
                params_array = [...params_array, param];
            }
            setUrlParams(params_array);
        }
    }, [window.location.search]);

    return url_params;
}
