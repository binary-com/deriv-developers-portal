import { Router,Outlet, Link} from '@tanstack/react-location';
import { routes,location } from './Router';
import { Suspense } from 'react';
import Sidepanel from './Sidepanel';


function Docs() {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Sidepanel>
        <Router routes={routes} location={location}>
            <Outlet/> 
        </Router>
      </Sidepanel>
    </Suspense>
  )
}

export default Docs