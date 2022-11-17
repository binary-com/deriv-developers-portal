import React from 'react';
import { send } from '../../../state/stateSignal';
import HamburgerNavigation from './HamburgerNavigation';
import NavigationLinks from './NavigationLinks/NavigationLinks';
import { DerivLogo } from '../DerivLogo/DerivLogo';
import { RenderOfficialDomainContents } from '../../utility/RenderOfficialDomainContents/RenderOfficialDomainContents';
import styles from './Header.module.scss';

export const Navigation = () => {
    return (
        <React.Fragment>
            <div id='hamburger' className={styles.hamburger} onClick={() => send('TOGGLE_HAMBURGER')} />
            <RenderOfficialDomainContents Component={DerivLogo} />
            <HamburgerNavigation />
            <nav id='navbar' className={`${styles.flexContainer} ${styles.navbar}`} data-id='navbar'>
                <NavigationLinks />
            </nav>
        </React.Fragment>
    );
};
