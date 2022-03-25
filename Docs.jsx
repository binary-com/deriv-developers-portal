import {Outlet} from '@tanstack/react-location';
import { Suspense } from 'react';
import Sidebar from './Sidebar';



function Docs() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{paddingTop:"115px"}}>
        <Outlet/>
        </div>
      </div>
    </Suspense>
  )
}

export default Docs