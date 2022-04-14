import { Outlet } from '@tanstack/react-location';
import { Suspense } from 'react';
import Sidebar from './Sidebar';
import './index.scss'

function Docs() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <div id="content" className='doc-content'>
        <Sidebar/>
        <Outlet/>
      </div>
    </Suspense>
  )
}

export default Docs
