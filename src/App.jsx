import { QueryClient, QueryClientProvider } from 'react-query'

import logo from './logo.svg'
import './App.css'
import './stateSignal';
import Example from './QueryExample';
import { send } from './stateSignal';


function App() {
  const setOurCountFunction = () => {
    send('LOGIN');
  };

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div id="app" className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Hello Vite + React!</p>
          <Example />
          <button type="button" onClick={setOurCountFunction}>
            LOGIN
          </button>
          <div className='logged-in'>You are logged in!</div>
          <p>
            Edit <code>App.tsx</code> and save to test HMR updates.
          </p>
          <p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {' | '}
            <a
              className="App-link"
              href="https://vitejs.dev/guide/features.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vite Docs
            </a>
          </p>
        </header>
      </div>
    </QueryClientProvider>
  )
}

export default App
