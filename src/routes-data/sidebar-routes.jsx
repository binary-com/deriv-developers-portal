import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sandboxRoutes } from './sandbox-routes';
import styles from '../components/docs/Docs/Sidebar/Sidebar.module.scss';
const BuildYourApp = React.lazy(() => import('../components/build-your-app/BuildYourApp/BuildYourApp'));
const Quickstart = React.lazy(() => import('../components/quickstart/Quickstart/Quickstart'));
const ApiGuide = React.lazy(() => import('../components/api-guide/ApiGuide/ApiGuide'));
const Faq = React.lazy(() => import('../components/faq/Faq/Faq'));
const Json = React.lazy(() => import('../components/json-schemas/JsonSchemas'));
const BugBounty = React.lazy(() => import('../components/bounty/Bounty/Bounty'));
const Docs = React.lazy(() => import('../components/docs/Docs/Docs'));

export const sidebar_routes = [
    {
        path: '/docs',
        element: <Docs />,
        label: 'Documentation',
        children: [
            {
                path: '',
                element: <Quickstart />,
                label: 'Quick Start',
            },
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
            {
                path: 'resources',
                label: 'Resources',
                children: [
                    {
                        path: 'api-guide',
                        element: <ApiGuide />,
                        label: 'API Guide',
                    },
                    {
                        path: 'faq',
                        element: <Faq />,
                        label: 'FAQ',
                    },
                    {
                        path: 'json-schemas',
                        element: <Json />,
                        label: 'JSON Schema',
                    },
                    {
                        path: 'bug-bounty',
                        element: <BugBounty />,
                        label: 'Bug Bounty',
                    },
                ],
            },
        ]
    },
];

const ImplementDropdown = (props) => {
    const location = useLocation();
    const split_current_location = location.pathname.split('/');
    const last_path = split_current_location[split_current_location.length - 1];
    const [isActive, setIsActive] = React.useState(false);
    React.useEffect(() => {
        if (props.route.path) {
            const dropdown = props.route.path;
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
                    {sandboxRoutes(props.route.path).map(items => (
                        <Link
                            key={items.path}
                            to={`${props.path}/${items.path}`}
                            className={`${styles.dropdownContent} ${items.path === last_path ? styles.selected : ''}`}
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

    const getLastPathString = (split_path_or_pathname) => {
        // if the pathname is for example .../docs/, last item in array will be '', so have to do - 2.
        // if pathname is .../docs, the last item in the array will be 'docs'. so, I can do - 1.
        return split_path_or_pathname[split_path_or_pathname.length - 1] !== ''
            ? split_path_or_pathname[split_path_or_pathname.length - 1]
            : split_path_or_pathname[split_path_or_pathname.length - 2];
    }

    const path_is_pathname = getLastPathString(pathname.split('/')) === getLastPathString(path.split('/'));

    return (
        <div key={route.label} className={styles.menuBlock}>
            {!route.path.includes('docs') && (
                <React.Fragment>
                    {route.children ? (
                        <div className={styles.menuHeader}>{route.label}</div>
                    ) : (
                        <Link
                            to={path}
                            className={`${styles.menuItem} ${path_is_pathname ? styles.selected : ''}`}
                        >
                            {route.label}
                        </Link>
                    )}
                </React.Fragment>
            )}
            {route.children &&
                route.children.map(child => {
                    // If there are children, recursively go over the nested children.
                    return !child.is_collapsible ? (
                        <React.Fragment key={child.label}>
                            <LinkComponent route={child} path={`${path}/${child.path}`} />
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={child.label}>
                            <ImplementDropdown route={child} path={`${path}/${child.path}`} />
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
