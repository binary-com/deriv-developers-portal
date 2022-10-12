import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../../Router';
import styles from '../Header.module.scss';

export default function NavigationLinks() {
    const location = useLocation();
    const address = location.pathname;
    const split_path = address.split('/');

    const last_path = split_path[split_path.length - 1] !== '' 
    ? split_path[split_path.length - 1] 
    : split_path[split_path.length - 2];
    return (
        <React.Fragment>
            {routes.map(route => {
                const route_is_path = route.path.replace(/\//g, '') === last_path;
                return (
                    <React.Fragment>
                        { route?.label ? (
                            <div data-id={route.path} key={route.path}>
                                <Link to={route.path} className={ route_is_path ? styles.selected : ''}>
                                    {route.label}
                                </Link>
                            </div>
                            ) :
                            <React.Fragment></React.Fragment>
                        }
                    </React.Fragment>
                );
            })}
        </React.Fragment>
    )
}