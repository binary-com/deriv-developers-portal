import {Outlet} from '@tanstack/react-location';
import { Suspense } from 'react';
import Sidebar from './Sidebar';



function Docs() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <div style={{display:"flex",padding:"90px 50px"}}>
        <Sidebar/>
        <div style={{padding:"105px 80px"}}>
        <Outlet/>
        </div>
      </div>
    </Suspense>
  )
}

export default Docs