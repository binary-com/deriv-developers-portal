import React from 'react';
import './state/stateSignal';
import './state/storageSignals';
import './global-functions/resizeEffect';
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './components/global/Header/Header';
import { routes } from './Router';
import DelayedFallbackHomepage from './components/homepage/DelayedFallbackHomepage/DelayedFallbackHomepage';

function App() {
    const element = useRoutes(routes);
    return (
        <React.Fragment>
            <Header />
            <Suspense fallback={<DelayedFallbackHomepage />}>{element}</Suspense>
        </React.Fragment>
    );
}

export default App;
