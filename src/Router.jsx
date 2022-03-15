import { lazy } from 'react';
import {Router,ReactLocation,MakeGenerics} from '@tanstack/react-location'
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';
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
        element: ()=> import("./Homepage").then((module)=><module.default/>)
      },
      {
        path:"api_explorer",
        element: ()=> import("./ApiExplorer").then((module)=><module.default/>)
      },
      {
        path:"app_registeration",
        element: ()=> import("./AppRegistration").then((module)=><module.default/>)
      },
      {
        path:"api_guide",
        element: ()=> import("./ApiGuide").then((module)=><module.default/>)
      },
      {
        path:"FAQ",
        element: ()=> import("./Faq").then((module)=><module.default/>)
      },
      {
        path:"JSON",
        element: ()=> import("./Json").then((module)=><module.default/>)
      },
      {
        path:"bug_bounty",
        element: ()=> import("./BugBounty").then((module)=><module.default/>)
      },
    ]
  }
];
export const location= new ReactLocation<LocationGenerics>[];