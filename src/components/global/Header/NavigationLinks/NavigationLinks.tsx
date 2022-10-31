import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../../Router';
import styles from '../Header.module.scss';

export default function NavigationLinks() {
    const location = useLocation();
    const address = location.pathname;
    const split_path = address.split('/');

    return (
        <React.Fragment>
            {routes.map(route => {
                // Check if user is on current page location
                const trimmed_route = route.path.replace(/\//g, '');
                const path_is_route = split_path.includes(trimmed_route);
                return (
                    <React.Fragment>
                        {route?.label ? (
                            <div data-id={route.path} key={route.path}>
                                <Link to={route.path} className={path_is_route ? styles.selected : ''}>
                                    {route.label}
                                </Link>
                            </div>
                        ) : null}
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    );
}
