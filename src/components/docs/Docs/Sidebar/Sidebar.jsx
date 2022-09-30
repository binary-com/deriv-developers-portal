import styles from "./Sidebar.module.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getting_started, SidebarMenuItems } from "../../../../routes-data/sidebar-routes";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={styles.sidebarleft} data-id="sidebarleft">
      <p className={styles.sidebartitle}>Deriv API</p>
      <div>
        {[
          ["/docs/", "Quickstart"],
          ["/docs/app-registration/", "App registration"],
          ["/api-explorer/", "API explorer"],
          ["/docs/api-guide/", "API guide"],
          ["/docs/faq/", "FAQ"],
          ["/docs/json-schemas/", "JSON Schemas"],
          ["/docs/bug-bounty/", "Bug Bounty"],
        ].map(([to, label]) => {
          return (
            <div key={to}>
              <Link
                to={to}
                className={to === location.pathname ? styles.selected : ""}
                data-id={to}
              >
                {label}
              </Link>
            </div>
          );
        })}
        <SidebarMenuItems routes={getting_started} />
      </div>
    </div>
  );
};

export default Sidebar;
