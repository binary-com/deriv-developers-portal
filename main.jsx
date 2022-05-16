import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import "core-js/stable";
import "regenerator-runtime/runtime";

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
