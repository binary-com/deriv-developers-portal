import './stateSignal';
import './resizeEffect';
import './storageSignals';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/global/Header/Header';
import LogoutButton from './LogoutButton';
import { routes } from './Router';
import DelayedFallbackHomepage from './components/homepage/DelayedFallbackHomepage/DelayedFallbackHomepage';

function App() {
    const element = useRoutes(routes);
    return (
        <>
            <Header />
            <LogoutButton />
            <Suspense fallback={<DelayedFallbackHomepage />}>{element}</Suspense>
        </>
    );
}

export default App;
