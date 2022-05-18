import { send } from "../../stateSignal";
import styles from "./Header.module.scss";
import HamburgerLink from "./HamburgerLink";

export default function HamburgerNavigation() {
    return (
        <div className={styles.hamburgerNavigation}>
            <nav 
                id="navbar"
                className={`${styles.flexContainer}`}
            >
                <ul>
                    <li><HamburgerLink location="/" name="Home" /></li>
                    <button onClick={() => send('TOGGLE_DOCUMENTATION') }>Documentation</button>
                    <section className={styles.documentationSection}>
                        <li><HamburgerLink location="/docs/" name="Quickstart" /></li>
                        <li><HamburgerLink location="/docs/app-registration/" name="App Registration" /></li>
                        <li><HamburgerLink location="/docs/api-explorer/" name="API Explorer" /></li>
                        <li><HamburgerLink location="/docs/api-guide/" name="API Guide" /></li>
                        <li><HamburgerLink location="/docs/faq/" name="FAQ" /></li>
                        <li><HamburgerLink location="/docs/json-schemas/" name="JSON Schemas" /></li>
                        <li><HamburgerLink location="/docs/bug-bounty/" name="Bug Bounty" /></li>
                    </section>
                </ul>
            </nav>
        </div>
    )
}
