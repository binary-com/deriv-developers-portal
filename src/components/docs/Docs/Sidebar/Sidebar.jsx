import styles from './Sidebar.module.scss';
import React from 'react';
import {
    sidebar_routes,
    SidebarMenuItems,
} from '../../../../routes-data/sidebar-routes';

const Sidebar = () => {

    return (
        <div className={styles.sidebarleft} data-id='sidebarleft'>
            <p className={styles.sidebartitle}>Documentation</p>
            <div>
                <SidebarMenuItems routes={sidebar_routes} onClick={() => send("TOGGLE_HAMBURGER")}/>
            </div>
        </div>
  );
};

export default Sidebar;
