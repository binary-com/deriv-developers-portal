import { Outlet } from '@tanstack/react-location';
import { Suspense } from 'react';
import Sidebar from './Sidebar';
import './index.scss'

function Docs() {
  return (
    <div id="content" className='doc-content'>
      <Sidebar />
      <Suspense fallback={<div>loading</div>}>
        <Outlet />
      </Suspense>
    </div>
  )
}

export default Docs
