import styles from "./Header.module.scss";
import { useSelector } from "@xstate/react";
import { stateService } from "../../../state/stateSignal";
import { isThirdPartyHostSelector } from '../../../state/selectors';
export default function TopNav() {
    const is_third_party_host = useSelector(stateService, isThirdPartyHostSelector);
    if (is_third_party_host) {
        return null;
    }

    return (
        <div className={`${styles.topNav} ${styles.flexContainer}`}>
            <div className={styles.topNavContainer}>
            <a href="https://deriv.com/">Deriv website</a>
            <a href="https://deriv.com/who-we-are">About us</a>
            <a href="https://deriv.com/contact-us">Contact us</a>
            </div>
        </div>
    )
}
