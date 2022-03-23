import { Link } from "@tanstack/react-location";
export default function HamburgerNavigation({ styles, nav_burger_style }) {
    return (
        <div className={styles.hamburgerNavigation}>
            <nav 
                id="navbar"
                className={`${styles.flexContainer} ${nav_burger_style}`}
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
