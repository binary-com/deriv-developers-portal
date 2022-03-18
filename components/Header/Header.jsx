import React from "react";
import styles from "./Header.module.scss";
import { Link } from "@tanstack/react-location";
import { Navigation } from "./child_components/Navigation";

export default function Header() {
    return (
        <div id="main-nav" className={styles.nav}>
            <div className={`${styles.topNav} ${styles.flexContainer}`}>
                <div className={styles.topNavContainer}>
                    <Link href="https://deriv.com/">Deriv website</Link>
                    <Link href="https://deriv.com/about">About us</Link>
                    <Link href="https://deriv.com/contact-us">Contact us</Link>
                </div>
            </div>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Navigation />
                </div>
            </header>
        </div>
    );
};
