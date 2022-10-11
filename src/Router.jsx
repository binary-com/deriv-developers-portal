import React from 'react';
import { sidebar_routes } from './routes-data/sidebar-routes';
const Endpoint = React.lazy(() => import('./components/endpoint/Endpoint/Endpoint'));
const HomePage = React.lazy(() => import('./components/homepage/Homepage/Homepage'));
const Docs = React.lazy(() => import('./components/docs/Docs/Docs'));
const ApiExplorer = React.lazy(() => import('./components/playground/ApiExplorer/ApiExplorer'));
const AppRegistration = React.lazy(() => import('./components/app-registration/AppRegistration/AppRegistration'));

export const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    ...sidebar_routes,
    {
        path: 'app-registration',
        element: <AppRegistration />,
        label: 'App registration',
    },
    {
        path: 'api-explorer',
        element: <ApiExplorer />,
    },
    {
        path: 'endpoint',
        element: <Endpoint />,
    },
];
