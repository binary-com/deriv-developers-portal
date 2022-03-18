import { QueryClient, QueryClientProvider } from 'react-query'
import './stateSignal';
import { Router,Outlet} from '@tanstack/react-location';
import { routes,location } from './Router';
import { Suspense } from 'react';
import MainNav from './components/MainNav';


function App() {
  const queryClient = new QueryClient()
  return (
    <Suspense fallback={<div>loading</div>}>
      <QueryClientProvider client={queryClient}>
          <Router routes={routes} location={location}>
            <MainNav />
            <Outlet/>
          </Router>
      </QueryClientProvider>
    </Suspense>
  )
}

export default App
