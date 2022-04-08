import styles from "./Header.module.scss";
import { Link, useLocation } from "@tanstack/react-location";

export default function Header() {
  const location = useLocation();
  const address = location.current.pathname;
  const docaddress = location.current.pathname.substring(0, 6);

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
            <div className={styles.logo} />
            <h1 className={styles.branding}>API</h1>
          </Link>
          <nav
            id="navbar"
            className={`${styles.flexContainer} ${styles.navbar}`}
          >
            {[
              ["/", "Home"],
              ["/docs/", "Documentation"],
              ["/api-explorer/", "Api Explorer"],
            ].map(([to, label], i) => {
              return i != 2 ? (
                <div key={to}>
                  <Link
                    to={to}
                    className={to === docaddress ? styles.selected : ""}
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
            ;
          </nav>
        </div>
      </header>
    </div>
  );
}
