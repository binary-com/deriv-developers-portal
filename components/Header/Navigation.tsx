import { Link } from "@tanstack/react-location";
import { send } from "../../stateSignal";
import styles from "./Header.module.scss";
import HamburgerNavigation from "./HamburgerNavigation";

export default function Navigation() {
    return (
        <>
            <div 
                id="hamburger"
                className={styles.hamburger}
                onClick={() => send('TOGGLE_HAMBURGER')}
            />
            <Link to="/">
                <div className={styles.flexContainer}>
                    <div className={styles.logo} />
                    <h1 className={styles.branding}>API</h1>
                </div>
            </Link>
            <HamburgerNavigation />
            <nav id="navbar" className={`${styles.flexContainer} ${styles.navbar}`}>
                <Link to="/">Home</Link>
                <Link to="docs">Documentation</Link>
                <Link to="api-explorer">API Explorer</Link>
            </nav>
        </>
    );
}
