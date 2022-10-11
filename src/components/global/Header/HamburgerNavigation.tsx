import styles from "./Header.module.scss";
import HamburgerLink from "./HamburgerLink";
import {
  SidebarMenuItems,
  sidebar_routes
} from "../../../routes-data/sidebar-routes"

export default function HamburgerNavigation() {
  return (
    <div className={styles.hamburgerNavigation}>
      <nav id="navbar" className={`${styles.flexContainer}`}>
        <ul>
          <li>
            <HamburgerLink location="/" name="Home" />
          </li>
          <li>
            <HamburgerLink location="/docs/" name="Quickstart" />
          </li>
          <li>
            <HamburgerLink location="/api-explorer/" name="API Explorer" />
          </li>
          <li>
              <HamburgerLink
                location="/app-registration/"
                name="App Registration"
              />
          </li>
          <SidebarMenuItems routes={sidebar_routes} />
        </ul>
      </nav>
    </div>
  );
}
