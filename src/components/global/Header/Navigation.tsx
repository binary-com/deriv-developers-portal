import React from 'react';
import { Link } from 'react-router-dom';
import { send } from '../../../state/stateSignal';
import HamburgerNavigation from './HamburgerNavigation';
import NavigationLinks from './NavigationLinks/NavigationLinks';
import styles from './Header.module.scss';

export default function Navigation() {
    return (
        <React.Fragment>
            <div id='hamburger' className={styles.hamburger} onClick={() => send('TOGGLE_HAMBURGER')} />
            <Link className={styles.logoLink} to='/' data-testid='mainLogo'>
                <div className={styles.flexContainer}>
                    <div data-testid='home_logo' onClick={clickLogo} className={styles.logo} id="derivLogo" />
                    <h1 className={styles.branding}>API</h1>
                </div>
            </Link>
            <HamburgerNavigation />
            <nav id='navbar' className={`${styles.flexContainer} ${styles.navbar}`} data-id='navbar'>
                <NavigationLinks />
            </nav>
        </React.Fragment>
    );
}

function clickLogo() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
