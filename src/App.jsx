import './stateSignal';
import './resizeEffect';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/Header/Header';
import LogoutButton from './LogoutButton';
import { routes } from './Router';
import DelayedFallbackHomepage from './components/DelayedFallbackHomepage/DelayedFallbackHomepage';

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
