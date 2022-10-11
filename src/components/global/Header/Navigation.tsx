import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { send } from '../../../state/stateSignal';
import styles from './Header.module.scss';
import HamburgerNavigation from './HamburgerNavigation';

export default function Navigation() {
    const location = useLocation();
    const address = location.pathname;
    const docAddress = location.pathname.substring(0, 6);
    return (
        <React.Fragment>
            <div id='hamburger' className={styles.hamburger} onClick={() => send('TOGGLE_HAMBURGER')} />
            <Link className={styles.logoLink} to='/' data-testid='mainLogo'>
                <div className={styles.flexContainer}>
                    <div data-testid='home_logo' onClick={clickLogo} className={styles.logo} />
                    <h1 className={styles.branding}>API</h1>
                </div>
            </Link>
            <HamburgerNavigation />
            <nav id='navbar' className={`${styles.flexContainer} ${styles.navbar}`} data-id='navbar'>
                {[
                    ['/docs', 'Documentation'],
                    ['/api-explorer/', 'API Explorer'],
                    ['/app-registration/', 'Application Registration'],
                ].map(([to, label], i) => {
                    return i != 2 ? (
                        <div data-id={to} key={to}>
                            <Link to={to} className={to === docAddress ? styles.selected : ''}>
                                {label}
                            </Link>
                        </div>
                    ) : (
                        <div data-id={to} key={to}>
                            <Link to={to} className={to === address ? styles.selected : ''}>
                                {label}
                            </Link>
                        </div>
                    );
                })}
            </nav>
        </React.Fragment>
    );
}

function clickLogo() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
