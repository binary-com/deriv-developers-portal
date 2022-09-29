import styles from "./Sidebar.module.scss";
import React from "react";
import {  useLocation } from "react-router-dom";
import { routes } from "../../../../Router";
import SubMenu from "./Submenu";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className={styles.sidebarleft} data-id="sidebarleft">
      <p className={styles.sidebartitle}>Documentation</p>
      <div>
        {routes.map(([item, index]) => {
          return (
            <div>
              <SubMenu
                item={item} key={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
