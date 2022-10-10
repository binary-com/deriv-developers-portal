import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sandboxRoutes } from './sandbox-routes';
import BuildYourApp from '../components/build-your-app/BuildYourApp/BuildYourApp';
import styles from '../components/docs/Docs/Sidebar/Sidebar.module.scss';
const Quickstart = React.lazy(() => import('../components/quickstart/Quickstart/Quickstart'));
const ApiGuide = React.lazy(() => import('../components/api-guide/ApiGuide/ApiGuide'));
const Faq = React.lazy(() => import('../components/faq/Faq/Faq'));
const Json = React.lazy(() => import('../components/json-schemas/JsonSchemas'));
const BugBounty = React.lazy(() => import('../components/bounty/Bounty/Bounty'));

export const getting_started = [
    {
        path: 'getting-started',
        label: 'Getting Started',
        children: [
            {
                path: 'implement-now',
                label: 'Implement Now',
                is_collapsible: true,
                children: sandboxRoutes('implement_now'),
            },
            {
                path: 'build-your-app',
                element: <BuildYourApp />,
                label: 'Build your app',
            },
        ],
    },
];
// TODO: Implement "what can you do" when design is ready.
// export const what_can_you_do = [
//     {
//         path: 'what-can-you-do',
//         label: 'What Can You Do',
//         children: [
//             {
//                 path: 'trading',
//                 element: <div></div>,
//                 label: 'Trading',
//             },
//             {
//                 path: 'market-data',
//                 element: <div></div>,
//                 label: 'Market Data',
//             },
//             {
//                 path: 'account-information',
//                 element: <div></div>,
//                 label: 'Account Information',
//             },
//             {
//                 path: 'payments',
//                 element: <div></div>,
//                 label: 'Payments',
//             },
//             {
//                 path: 'application',
//                 element: <div></div>,
//                 label: 'Application',
//             },
//         ],
//     },
// ];
export const resources = [
    {
        path: 'resources',
        label: 'Resources',
        children: [
            {
                path: 'api-guide',
                element: <ApiGuide />,
                label: 'Api Guide',
            },
            {
                path: 'faq',
                element: <Faq />,
                label: 'FAQ',
            },
            {
                path: 'json-schemas',
                element: <Json />,
                label: 'JSON',
            },
            {
                path: 'bug-bounty',
                element: <BugBounty />,
                label: 'Bug Bounty',
            },
        ],
    },
];

export const rest = [
    {
        path: '/docs',
        element: <Quickstart />,
        label: 'Quickstart',
    },
];

// Stitching all the arrays together to one route object for Router.jsx.
export const sidebar_routes = [...rest, ...getting_started, ...resources];

const ImplementDropdown = (route) => {
    const location = useLocation();
    const split_current_location = location.pathname.split('/');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (route.route.path) {
            const dropdown = route.route.path;
            const split_current_location = location.pathname.split('/');
            if (split_current_location.includes(dropdown)) {
                // set the dropdown useState active.
                setIsActive(!isActive);
            }
        }
    }, []);

    const handleToggleDropdown = () => {
        setIsActive(!isActive);
    };
    return (
        <div className={styles.dropdown}>
            <div className={`${styles.dropdownBtn} ${isActive ? styles.boldText : ''}`} onClick={handleToggleDropdown}>
                Implement Now
                <span className={`${styles.arrow} ${isActive ? styles.down : ''}`} />
            </div>
            {isActive && (
                <div className={styles.dropdownList}>
                    {sandboxRoutes(route.route.path).map(items => (
                        <Link
                            key={items.path}
                            to={'getting-started/implement-now/' + items.path}
                            className={`${styles.dropdownContent} ${
                                items.path === split_current_location[split_current_location.length - 1]
                                    ? styles.selected
                                    : ''
                            }`}
                        >
                            {items.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

function LinkComponent({ route, path }) {
    const { pathname } = useLocation();
    return (
        <div key={route.label}>
            {route.children ? (
                <div className={styles.menuHeader}>{route.label}</div>
            ) : (
                <Link
                    to={path}
                    className={`${styles.menuItem} ${path === pathname.replace('/docs/', '') ? styles.selected : ''}`}
                >
                    {route.label}
                </Link>
            )}
            {route.children &&
                route.children.map(child => {
                    // If there are children, recursively go over the nested children
                    // till there are none anymore.
                    return !child.is_collapsible ? (
                        <React.Fragment key={child.label}>
                            <LinkComponent route={child} path={`${path}/${child.path}`} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={child.label}>
                            <ImplementDropdown route={child} />
                        </React.Fragment>
                    );
                })}
        </div>
    );
}

export const SidebarMenuItems = ({ routes }) => {
    const routes_array = Object.values(routes);
    const map_links = Object.entries(routes_array).map(items => {
        const route = items[1];
        return (
            <React.Fragment key={route.label}>
                <LinkComponent route={route} path={route.path} key={route.path} />
            </React.Fragment>
        );
    });
    return map_links;
};
