import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Sidebar from './Sidebar';
import './index.scss'
import MobilePageSelectLazy from './MobilePageSelectLazy';
import DelayedFallback from './components/DelayedFallback/DelayedFallback';

function Docs() {
  return (
    <div id="content" className='doc-content'>
      <Sidebar />
      <div className="page-content">
        <MobilePageSelectLazy />
        <Suspense fallback={<DelayedFallback />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
    // this is a test.
  )
}

export default Docs
