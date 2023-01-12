import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Suspense } from 'react';
import { RenderOfficialDomainContents } from '../../utility/RenderOfficialDomainContents/RenderOfficialDomainContents';
import QuickStart from '../../quickstart/Quickstart/Quickstart';
import Sidebar from './Sidebar/Sidebar';
import '../../../index.scss';
import DelayedFallback from '../../global/DelayedFallback/DelayedFallback';

function Docs() {
    const location = useLocation();
    const [is_quickstart, setIsQuickstart] = React.useState(false);

    React.useEffect(() => {
        const current_path = location.pathname;
        if (current_path === '/docs') {
            setIsQuickstart(true);
        } else {
            setIsQuickstart(false);
        }
    }, []);

    return (
        <div id='content' className='doc-content'>
            <Sidebar />
            <div className='pageWrapper'>
                <Suspense fallback={<DelayedFallback />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    );
}

export default Docs;
