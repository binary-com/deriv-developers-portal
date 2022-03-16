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
            <div id="app" className="App">
              <div className='Our Header'>
                  <Link to="/">HomePage</Link>
                  <Link to="/docs">Documantation</Link>
                  <Link to="/docs/api-explorer">ApiExplorer</Link>
              </div>
              <Outlet/>
            </div>
          </Router>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
