import { Link } from "@tanstack/react-location";
import styles from "./Header.module.scss";
export default function HamburgerNavigation() {
    return (
        <div className={styles.hamburgerNavigation}>
            <nav 
                id="navbar"
                className={`${styles.flexContainer}`}
            >
                    <Link to="/">Home</Link>
                    <button>Documentation</button>
                    <section className={styles.documentationSection}>
                        <Link to="/">Quickstart</Link>
                        <Link to="/">App Registration</Link>
                        <Link to="/">API Explorer</Link>
                        <Link to="/">API Guide</Link>
                        <Link to="/">FAQ</Link>
                        <Link to="/">JSON Schemas</Link>
                        <Link to="/">Bug Bounty</Link>
                    </section>
            </nav>
        </div>
    )
}
