import { Link } from "@tanstack/react-location";
import { send } from "../../stateSignal";
import styles from "./Header.module.scss";
export default function HamburgerNavigation() {
    return (
        <div className={styles.hamburgerNavigation}>
            <nav 
                id="navbar"
                className={`${styles.flexContainer}`}
            >
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <button onClick={() => send('TOGGLE_DOCUMENTATION') }>Documentation</button>
                    <section className={styles.documentationSection}>
                        <li><Link to="/docs/">Quickstart</Link></li>
                        <li><Link to="/docs/app-registration/">App Registration</Link></li>
                        <li><Link to="/api-explorer/">API Explorer</Link></li>
                        <li><Link to="/docs/api-guide/">API Guide</Link></li>
                        <li><Link to="/docs/faq/">FAQ</Link></li>
                        <li><Link to="/docs/json-schemas/">JSON Schemas</Link></li>
                        <li><Link to="/docs/bug-bounty/">Bug Bounty</Link></li>
                    </section>
                </ul>
            </nav>
        </div>
    )
}
