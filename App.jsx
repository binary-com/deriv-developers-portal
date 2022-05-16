import './stateSignal';
import './resizeEffect';
import { useRoutes } from "react-router-dom";
import { Suspense } from 'react';
import Header from './components/Header/Header';
import LogoutButton from './LogoutButton';
import { routes } from './Router';

function App() {
  const element = useRoutes(routes);
  return (
    <>
        <Header />
        <LogoutButton />
        <Suspense fallback={<div />}>
          { element }
        </Suspense>
    </>
  )
}

export default App
