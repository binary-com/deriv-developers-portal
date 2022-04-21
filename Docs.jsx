import { Outlet } from '@tanstack/react-location';
import { Suspense } from 'react';
import Sidebar from './Sidebar';
import './index.scss'
import MobilePageSelectLazy from './MobilePageSelectLazy';

function Docs() {
  return (
    <div id="content" className='doc-content'>
      <Sidebar />
      <div className="page-content">
        <MobilePageSelectLazy />
        <Suspense fallback={<div>loading</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}

export default Docs
