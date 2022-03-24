import {lazy} from 'react';
import {ReactLocation} from '@tanstack/react-location'
import React from 'react';
const HomePage = lazy(()=>import('./Homepage'));
const Docs = lazy(()=>import('./Docs'));
const ApiExplorer = lazy(()=>import('./ApiExplorer'));
const AppRegistration = lazy(()=>import('./AppRegistration'));
const ApiGuide = lazy(()=>import('./ApiGuide'));
const Faq = lazy(()=>import('./Faq'));
const Json = lazy(()=>import('./Json'));
const BugBounty = lazy(()=>import('./Bugbounty'));
const Quickstart = lazy(()=>import('./Quickstart'));


export const routes=[               
  {
    path:"/",
    element: <HomePage/>
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
        path:'quickstart',
        element:<Quickstart/>
      },
      {
        path:"api-explorer",
        element: <ApiExplorer/>
      },
      {
        path:"app-registration",
        element: <AppRegistration/>
      },
      {
        path:"api-guide",
        element: <ApiGuide/>
      },
      {
        path:"FAQ",
        element: <Faq/>
      },
      {
        path:"JSON",
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
export const location= new ReactLocation();


