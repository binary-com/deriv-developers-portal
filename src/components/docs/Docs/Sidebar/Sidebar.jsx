import styles from "./Sidebar.module.scss";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getting_started, resources, SidebarMenuItems, sidebar_routes,what_can_you_do, implement_now } from "../../../../routes-data/sidebar-routes";

const Sidebar = () => {

  const location = useLocation();

  return (
    <div className={styles.sidebarleft} data-id="sidebarleft">
      <p className={styles.sidebartitle}>Documentation</p>
      <div>
        {[
          ["/docs/", "Quickstart"],
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
        <SidebarMenuItems routes={getting_started}/>
        <SidebarMenuItems routes={what_can_you_do}/>
        <SidebarMenuItems routes={resources}/>
      </div>
    </div>
  );  
};

export default Sidebar;
