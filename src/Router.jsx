import React from 'react';
import { sidebar_routes } from './routes-data/sidebar-routes';
const Endpoint = React.lazy(() => import('./components/endpoint/Endpoint/Endpoint'));
const HomePage = React.lazy(() => import('./components/homepage/Homepage/Homepage'));
const Docs = React.lazy(() => import('./components/docs/Docs/Docs'));    
const ApiExplorer = React.lazy(() => import('./components/playground/ApiExplorer/ApiExplorer'));
const AppRegistration = React.lazy(() => import('./components/app-registration/AppRegistration/AppRegistration'));
const ApiGuide = React.lazy(() => import('./components/api-guide/ApiGuide/ApiGuide'));
const Faq = React.lazy(() => import('./components/faq/Faq/Faq'));
const Json = React.lazy(() => import('./components/json-schemas/JsonSchemas'));
const BugBounty = React.lazy(() => import('./components/bounty/Bounty/Bounty'));
const Quickstart = React.lazy(() => import('./components/quickstart/Quickstart/Quickstart'));


export const routes = [
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: 'docs',
        element: <Docs />,
        children: [
            {
                path: '',
                element: <Quickstart />,
                label: "Quickstart",
            },
            ...sidebar_routes,
            {
                path: 'api-explorer',
                element: <ApiExplorer />,
                label: "Api explorer",
            },
            {
                path: 'api-guide',
                element: <ApiGuide />,
                label: "Api guide",
            },
            {
                path: 'faq',
                element: <Faq />,
                label: "FAQ",
            },
            {
                path: 'json-schemas',
                element: <Json />,
                label: "JSON Schemas",
            },
            {
                path: 'bug-bounty',
                element: <BugBounty />,
                Label: "Bug bounty",
            },
        ],
    },

    {
        path: 'app-registration',
        element: <AppRegistration />,
        label: "App registration",
    },
    {
        path: 'api-explorer',
        element: <Docs />,
        children: [
            {
                path: '',
                element: <ApiExplorer />,
            },
        ],
    },
    {
        path: 'endpoint',
        element: <Endpoint />,
    },
];