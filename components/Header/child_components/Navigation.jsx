import React from "react";
import styles from "../Header.module.scss";
import { Link } from "@tanstack/react-location";
export const Navigation = () => {
    const [nav_burger_style, setNavBurgerStyle] = React.useState(`${styles.hideHamburgerNav}`);

    const toggleHamburgerMenu = () => {
        const hamburger_menu_hidden = nav_burger_style === `${styles.hideHamburgerNav}`;
        if (hamburger_menu_hidden) {
            setNavBurgerStyle(`${styles.showHamburgerNav}`);
        } else {
            setNavBurgerStyle(`${styles.hideHamburgerNav}`);
        }
    }
    return (
        <>
            <div id="hamburger" className={styles.hamburger} onClick={toggleHamburgerMenu} />
            <Link to="/">
                <div className={styles.flexContainer}>
                    <div className={styles.logo} />
                    <h1 className={styles.branding}>API</h1>
                </div>
            </Link>
            <nav 
                id="navbar" 
                className={`${styles.flexContainer} ${styles.navbar} ${nav_burger_style}`}
            >
                    <Link to="/">Home</Link>
                    <Link to="docs">Documentation</Link>
                    <Link to="api_explorer">API Explorer</Link>
            </nav>
        </>
    );
}
