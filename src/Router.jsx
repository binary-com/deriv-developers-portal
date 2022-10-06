import React from 'react';
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
const BuildYourApp = React.lazy(() => import('./components/build-your-app/BuildYourApp/BuildYourApp'));

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
            },
            {
                path: 'build-your-app',
                element: <BuildYourApp />,
            },
            {
                path: 'app-registration',
                element: <AppRegistration />,
            },
            {
                path: 'api-explorer',
                element: <ApiExplorer />,
            },
            {
                path: 'api-guide',
                element: <ApiGuide />,
            },
            {
                path: 'faq',
                element: <Faq />,
            },
            {
                path: 'json-schemas',
                element: <Json />,
            },
            {
                path: 'bug-bounty',
                element: <BugBounty />,
            },
        ],
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
