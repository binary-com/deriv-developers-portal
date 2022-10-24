import { Link } from "react-router-dom"
import styles from './DerivLogo.module.scss';
import { useSelector } from "@xstate/react";
import { stateService } from "../../../state/stateSignal";
import { isThirdPartyHostSelector } from '../../../state/selectors';

export default function DerivLogo() {
    const is_third_party_host = useSelector(stateService, isThirdPartyHostSelector);
    if (is_third_party_host) {
        return null;
    }

    function clickLogo() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    return (
        <Link className={styles.logoLink} to='/' data-testid='mainLogo'>
            <div className={styles.flexContainer}>
                <div data-testid='home_logo' onClick={clickLogo} className={styles.logo} />
                <h1 className={styles.branding}>API</h1>
            </div>
        </Link>
    )
}
