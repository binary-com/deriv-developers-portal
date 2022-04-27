import React from 'react';
import { ReactLocation } from '@tanstack/react-location'
const HomePage = React.lazy(()=>import('./Homepage'));
const Docs = React.lazy(()=>import('./Docs'));
const ApiExplorer = React.lazy(()=>import('./ApiExplorer'));
const AppRegistration = React.lazy(()=>import('./AppRegistration'));
const ApiGuide = React.lazy(()=>import('./ApiGuide'));
const Faq = React.lazy(()=>import('./Faq'));
const Json = React.lazy(()=>import('./JsonSchemas'));
const BugBounty = React.lazy(()=>import('./Bounty'));
const Quickstart = React.lazy(()=>import('./Quickstart'));

export const routes = [               
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"docs",
    element:<Docs/>,
    children:[
      {
        path:"/",
        element:<Quickstart/>
      },
      {
        path:"app-registration",
        element: <AppRegistration/>
      },
      {
        path:"api-explorer",
        element:<ApiExplorer/>
      },
      {
        path:"api-guide",
        element: <ApiGuide/>
      },
      {
        path:"faq",
        element: <Faq/>
      },
      {
        path:"json-schemas",
        element: <Json/>
      },
      {
        path:"bug-bounty",
        element: <BugBounty/>
      },
    ]
  },
  {
    path:"api-explorer",
    element: <ApiExplorer/>
  }
];
export const location = new ReactLocation();
