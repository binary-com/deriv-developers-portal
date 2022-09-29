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
const ImplementNow = React.lazy(() => import('./components/implement-now/ImplementNow/ImplementNow'));
const StartYourApp = React.lazy(() => import('./components/start-your-app/StartYourApp/StartYourApp'));
const Trading = React.lazy(() => import('./components/trading/Trading/Trading'));
const MarketData = React.lazy(() => import('./components/market-data/MarketData/MarketData'));
const AccountInformation = React.lazy(() => import('./components/account-information/AccountInformation/AccountInformation'));
const Payemnts = React.lazy(() => import('./components/payments/Payments/Payments'));
const Application = React.lazy(() => import('./components/application/Application/Application'));

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
                path:'getting-started',
                children:[
                    {
                        path:'implement-now',
                        element:<ImplementNow/>
                    },
                    {
                        path:'start-your-app',
                        element:<StartYourApp/>
                    }
                ]
            },
            {
                path:'what-can-you-do',
                children:[
                    {
                        path:'',
                        element:<Trading/>
                    },
                    {
                        path:'market-data',
                        element:<MarketData/>
                    },
                    {
                        path:'account-information',
                        element:<AccountInformation/>
                        
                    },
                    {
                        path:'payments',
                        element:<Payemnts/>
                    },
                    {
                        path:'application',
                        element:<Application/>
                    }
                ]
            },
            {
                path:'resources',
                children:[
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
        ]
    },
    {
        path: 'api-explorer',
        element: <ApiExplorer />,
         
    },
    {
        path: 'app-registration',
        element: <AppRegistration />,
    },
    {
        path: 'endpoint',
        element: <Endpoint />,
    },
];
