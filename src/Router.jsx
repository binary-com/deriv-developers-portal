import {lazy} from 'react';
import {Route,ReactLocation} from '@tanstack/react-location'
import React from 'react';
const HomePage = lazy(()=>import('./Homepage'));
const Docs = lazy(()=>import('./Docs'));
const ApiExplorer = lazy(()=>import('./ApiExplorer'));
const AppRegistration = lazy(()=>import('./AppRegistration'));
const ApiGuide = lazy(()=>import('./ApiGuide'));
const Faq = lazy(()=>import('./Faq'));
const Json = lazy(()=>import('./Json'));
const BugBounty = lazy(()=>import('./Bugbounty'));


export const routes=[               
  {
    path:"/",
    element: <HomePage/>
  },
  {
    path:"/docs",
    children:[
      {
        path:"/",
        element:<HomePage/>
      },
      {
        path:"api_explorer",
        element: <ApiExplorer/>
      },
      {
        path:"app_registeration",
        element: <AppRegistration/>
      },
      {
        path:"api_guide",
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
        path:"bug_bounty",
        element: <BugBounty/>
      },
    ]
  },
  {
    path:"api_explorer",
    element: <ApiExplorer/>
  }
];
export const location= new ReactLocation();


