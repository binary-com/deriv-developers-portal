import { Link, useLocation } from "@tanstack/react-location";
import { send } from "../../stateSignal";
import styles from "./Header.module.scss";
import HamburgerNavigation from "./HamburgerNavigation";

export default function Navigation() {
    const location = useLocation();
    const address = location.current.pathname;
    const docAddress = location.current.pathname.substring(0, 6);
    return (
        <>
            <div 
                id="hamburger"
                className={styles.hamburger}
                onClick={() => send('TOGGLE_HAMBURGER')}
            />
            <Link className={styles.logoLink} to="/">
                <div className={styles.flexContainer}>
                    <div className={styles.logo} />
                    <h1 className={styles.branding}>API</h1>
                </div>
            </Link>
            <HamburgerNavigation />
            <nav id="navbar" className={`${styles.flexContainer} ${styles.navbar}`}>
                {[
                    ["/", "Home"],
                    ["/docs/", "Documentation"],
                    ["/api-explorer/", "API Explorer"],
                    ].map(([to, label], i) => {
                    return i != 2 ? (
                        <div key={to}>
                        <Link
                            to={to}
                            className={to === docAddress ? styles.selected : ""}
                        >
                            {label}
                        </Link>
                        </div>
                    ) : (
                        <div key={to}>
                        <Link
                            to={to}
                            className={to === address ? styles.selected : ""}
                        >
                            {label}
                        </Link>
                        </div>
                    );
                })}
            </nav>
        </>
    );
}
