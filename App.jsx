import { QueryClient, QueryClientProvider } from 'react-query'
import './stateSignal';
import { Router,Outlet,Link} from '@tanstack/react-location';
import { routes,location } from './Router';
import { Suspense } from 'react';


function App() {
  const queryClient = new QueryClient()
  return (
    <Suspense fallback={<div>loading</div>}>
      <QueryClientProvider client={queryClient}>
          <Router routes={routes} location={location}>
            <header id="app" className="header">
              <div className='header-container'>
                  <Link to="/">Home</Link>
                  <Link to="docs">Documentation</Link>
                  <Link to="api_explorer">API Explorer</Link>
              </div>
            </header>
            <Outlet/>
          </Router>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
