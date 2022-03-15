import { QueryClient, QueryClientProvider } from 'react-query'
import { Suspense } from 'react';

import './App.css'
import './stateSignal';
import { send } from './stateSignal';
import { Router,Outlet,Link,useMatch
 } from '@tanstack/react-location';
// import { routes,location } from './Router';

const Documentation=() =>{
  const params=useMatch();
}

function App() {
  // alert('aleert us');
  const setOurCountFunction = () => {
    send('LOGIN');
  };

  const queryClient = new QueryClient()

  return (
      <QueryClientProvider client={queryClient}>
        <div id="app" className="App">
          <div className='links'>
            <div>ABCDE</div>
          </div>
        </div>
    </QueryClientProvider>
  )
}

export default App
