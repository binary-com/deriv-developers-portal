import { Link } from "@tanstack/react-location";
import { send } from "../../stateSignal";
import HamburgerNavigation from "./HamburgerNavigation";

export default function Navigation({ styles }) {
    return (
        <>
            <div 
                id="hamburger"
                className={styles.hamburger}
                onClick={() => send('TOGGLE_HAMBURGER')} />
            <Link to="/">
                <div className={styles.flexContainer}>
                    <div className={styles.logo} />
                    <h1 className={styles.branding}>API</h1>
                </div>
            </Link>
            <HamburgerNavigation styles={styles} />
            <nav id="navbar" className={`${styles.flexContainer} ${styles.navbar}`}>
                <Link to="/">Home</Link>
                <Link to="docs">Documentation</Link>
                <Link to="api_explorer">API Explorer</Link>
            </nav>
        </>
    );
}
