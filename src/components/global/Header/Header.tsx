import { useRef, useEffect } from 'react';
import { stateService } from '../../../state/stateSignal';
import { send } from '../../../state/stateSignal';
import { domains } from '../../../data-stores/domains';
import { useOutsideClick } from '../../../custom-hooks/useClickOutsideElement';
import { Navigation } from './Navigation';
import { TopNav } from './TopNav';
import { RenderOfficialDomainContents } from '../../utility/RenderOfficialDomainContents/RenderOfficialDomainContents';
import { LogoutButton } from '../LogoutButton/LogoutButton';
import styles from './Header.module.scss';

export default function Header() {
    const ref = useRef(null);

    useOutsideClick(ref, () => {
        stateService.send('CLICK_OUTSIDE');
    });

    useEffect(() => {
        // remove branding on hosts that are not Deriv
        const host = window.location.host;
        let is_deriv_host = false;
        domains.forEach(domain => {
            const host_exists = host.indexOf(domain) === 0;
            if (host_exists) {
                is_deriv_host = host_exists;
            }
        });

        if (!is_deriv_host) {
            send('TOGGLE_BRANDING_OFF');
        }
    }, []);

    return (
        <div id='main-nav' className={styles.nav}>
            <RenderOfficialDomainContents Component={TopNav} />
            <header ref={ref} className={styles.header}>
                <div className={styles.headerContainer}>
                    <Navigation />
                </div>
                <LogoutButton />
            </header>
        </div>
    );
}
