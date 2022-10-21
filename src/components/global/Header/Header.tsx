import { useRef, useEffect } from "react";
import { useOutsideClick } from "../../../custom-hooks/useClickOutsideElement";
import { stateService } from "../../../state/stateSignal";
import { domains } from "../../../data-stores/domains"
import { send } from '../../../state/stateSignal';
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import styles from "./Header.module.scss";

export default function Header() {
  const ref = useRef(null);
  useOutsideClick(ref, () => {
    stateService.send("CLICK_OUTSIDE");
  });

  useEffect(() => {
      // remove branding on hosts that are not Deriv
      const host = window.location.host;
      domains.forEach(domain => {
        const is_deriv_host = host.indexOf(domain) !== -1
        if (is_deriv_host) {
          send("TOGGLE_BRANDING_ON");
        }
      })
  }, [])

  return (
    <div id="main-nav" className={styles.nav}>
      <div className={`${styles.topNav} ${styles.flexContainer}`} id="topNavigation">
        <div className={styles.topNavContainer}>
          <a href="https://deriv.com/">Deriv website</a>
          <a href="https://deriv.com/who-we-are">About us</a>
          <a href="https://deriv.com/contact-us">Contact us</a>
        </div>
      </div>
      <header ref={ref} className={styles.header}>
        <div className={styles.headerContainer}>
          <Navigation />
        </div>
      </header>
    </div>
  );
}
