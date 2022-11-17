import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../../Router';
import { hidden_menu_items } from '../../../../data-stores/domains.js';
import { RenderOfficialDomainContents } from '../../../utility/RenderOfficialDomainContents/RenderOfficialDomainContents';
import styles from '../Header.module.scss';

export default function NavigationLinks() {
    const location = useLocation();
    const address = location.pathname;
    const split_path = address.split('/');

    return (
        <Fragment>
            {routes.map(route => {
                // Check if user is on current page location
                const trimmed_route = route.path.replace(/\//g, '');
                const path_is_route = split_path.includes(trimmed_route);
                const LinkComponent = () => {
                    return (
                        <div data-id={route.path} key={route.path}>
                            <Link to={route.path} className={path_is_route ? styles.selected : ''}>
                                {route.label}
                            </Link>
                        </div>
                    );
                };

                // Rendering component here.
                return (
                    <Fragment>
                        {hidden_menu_items.includes(route?.path) ? (
                            // Hide specific links if website is rendered on non-deriv domain.
                            <RenderOfficialDomainContents Component={LinkComponent} />
                        ) : (
                            <Fragment>{route?.label ? <LinkComponent /> : null}</Fragment>
                        )}
                    </Fragment>
                );
            })}
        </Fragment>
    );
}
