import React from 'react';
import { api } from './appid';
import { playground_requests } from "./Playground_Requests";

export default function ApiReference() {
    const api_data = playground_requests;
    const [request_info, setRequestInfo] = React.useState([]);
    const [response_info, setResponseInfo] = React.useState([]);
    let request = [];
    let response = [];

    React.useEffect(() => {
        getApiData();
    }, [])

    const getApiData = () => {
        api_data.forEach((data) => {
            import(`../config/v3/${data.name}/send.json`)
                .then((module) => {
                    request = [...request, module];
                    if (api_data.length === request.length) {
                        setRequestInfo(request);
                    }
                })
                .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                });
            import(`../config/v3/${data.name}/receive.json`)
                .then((module) => {
                    response = [...response, module];
                    if (api_data.length === response.length) {
                        setResponseInfo(response);
                    }
                })
                .catch((error) => {
                // eslint-disable-next-line
                console.log(error);
                });
        })
        setRequestInfo(request);
        setResponseInfo(response);
    }
    console.log(response_info);
    console.log(request_info);
    return (
        <div>
            Hello     
        </div>
    )
}