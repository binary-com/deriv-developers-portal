import React from "react";
import styles from "./Header.module.scss";
import Navigation from "./Navigation";

export default function Header() {
    return (
        <div id="main-nav" className={styles.nav}>
            <div className={`${styles.topNav} ${styles.flexContainer}`}>
                <div className={styles.topNavContainer}>
                    <a href="https://deriv.com/">Deriv website</a>
                    <a href="https://deriv.com/about">About us</a>
                    <a href="https://deriv.com/contact-us">Contact us</a>
                </div>
            </div>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Navigation />
                </div>
            </header>
        </div>
    )
}
