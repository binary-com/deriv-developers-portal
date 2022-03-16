import { QueryClient, QueryClientProvider } from 'react-query'
import './App.css'
import './stateSignal';
import { send } from './stateSignal';
import { Router,Outlet,Link,useMatch} from '@tanstack/react-location';
import { routes,location } from './Router';
import { Suspense } from 'react';


function App() {
  

  const queryClient = new QueryClient()

  return (
     
    <QueryClientProvider client={queryClient}>
        <Router routes={routes} location={location}>
          <div id="app" className="App">
            <div className='Our Header'>
              <Suspense fallback={<div>loading</div>}>
                <Link to="/">HomePage</Link>
                <Link to="/docs">Documantation</Link>
                <Link to="/docs/api-explorer">ApiExplorer</Link>
              </Suspense>
            </div>
            <Outlet/>
          </div>
        </Router>
    </QueryClientProvider>
  )
}

export default App
