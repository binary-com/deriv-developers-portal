import styles from "./Header.module.scss";
import { Link } from "@tanstack/react-location";

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
                    <div id="hamburger" className={styles.hamburger}>
                        <div className={styles.hamburger} />
                    </div>
                    <Link to="/" className={styles.flexContainer}>
                        <div className={styles.logo}/>
                        <h1 className={styles.branding}>API</h1>  
                    </Link>
                    <nav id="navbar" className={`${styles.flexContainer} ${styles.navbar}`}>
                            <Link to="/">Home</Link>
                            <Link to="docs">Documentation</Link>
                            <Link to="api_explorer">API Explorer</Link>
                    </nav>
                </div>
            </header>
        </div>
    );
};
