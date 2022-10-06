import { Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
const Quickstart = React.lazy(() => import('../components/quickstart/Quickstart/Quickstart'));
const ApiGuide = React.lazy(() => import('../components/api-guide/ApiGuide/ApiGuide'));
const Faq = React.lazy(() => import('../components/faq/Faq/Faq'));
const Json = React.lazy(() => import('../components/json-schemas/JsonSchemas'));
const BugBounty = React.lazy(() => import('../components/bounty/Bounty/Bounty'));
import styles from '../components/docs/Docs/Sidebar/Sidebar.module.scss';

// Filter route objects with key + value pair (Object.entries);
export const implement_now = [
    {
        path: 'ticks-history',
        element: <div>This is a child of random</div>,
        label: 'Ticks History',
    },
    {
        path: 'active-symbol',
        element: <div>This is a child of random</div>,
        label: 'Active Symbol',
    },
    {
        path: 'contracts-for-symbol',
        element: <div>This is a child of random</div>,
        label: 'Contracts For Symbol',
    },
    {
        path: 'website-status',
        element: <div>This is a child of random</div>,
        label: 'Website Status',
    },
    {
        path: 'proposal',
        element: <div>This is a child of random</div>,
        label: 'Proposal',
    },
    {
        path: 'keep-alive',
        element: <div>This is a child of random</div>,
        label: 'Keep Alive',
    },
];

export const getting_started = [
    {
        path: 'getting-started',
        label: 'Getting Started',
        children: [
            {
                path: 'implement-now',
                element: <div>This is a child of getting starteeeeeeeeed</div>,
                label: 'Implement Now',
                is_collapsible: true,
                children: implement_now,
            },
            {
                path: 'start-your-app',
                label: 'Start your app',
            },
        ],
    },
];
export const what_can_you_do = [
    {
        path: 'what-can-you-do',
        label: 'What Can You Do',
        children: [
            {
                path: 'trading',
                element: <div>This is a child of random</div>,
                label: 'Trading',
            },
            {
                path: 'market-data',
                element: <div>This is a child of random</div>,
                label: 'Market Data',
            },
            {
                path: 'account-information',
                element: <div>This is a child of random</div>,
                label: 'Account Information',
            },
            {
                path: 'payments',
                element: <div>This is a child of random</div>,
                label: 'Payments',
            },
            {
                path: 'application',
                element: <div>This is a child of random</div>,
                label: 'Application',
            },
        ],
    },
];
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
// Stitching all the arrays together to one route object for the Router.
export const sidebar_routes = [...getting_started, ...what_can_you_do, ...resources];

const ImplementDropdown = route => {
    const location = useLocation();
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
                    {implement_now.map(items => (
                        <Link
                            key={items.path}
                            to={'getting-started/implement-now/' + items.path}
                            className={`${styles.dropdownContent} ${
                                items.path === location.pathname.split('/')[4] ? styles.selected : ''
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
                        <React.Fragment>
                            <LinkComponent route={child} path={`${path}/${child.path}`} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
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
            <>
                <LinkComponent route={route} path={route.path} key={route.path} />
            </>
        );
    });
    return map_links;
};
