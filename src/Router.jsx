import React from 'react';
import { sidebar_routes } from './routes-data/sidebar-routes';
import { RenderOfficialDomainContents } from './components/utility/RenderOfficialDomainContents/RenderOfficialDomainContents';
const Endpoint = React.lazy(() => import('./components/endpoint/Endpoint/Endpoint'));
const HomePage = React.lazy(() => import('./components/homepage/Homepage/Homepage'));
const ApiExplorer = React.lazy(() => import('./components/playground/ApiExplorer/ApiExplorer'));
const AppRegistration = React.lazy(() => import('./components/app-registration/AppRegistration/AppRegistration'));

export const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    ...sidebar_routes,
    {
        path: 'api-explorer',
        element: <ApiExplorer />,
        label: 'API Explorer',
    },
    {
        path: 'app-registration',
        element: <RenderOfficialDomainContents Component={AppRegistration} />,
        label: 'Application registration',
    },
    {
        path: 'endpoint',
        element: <Endpoint />,
    },
];
