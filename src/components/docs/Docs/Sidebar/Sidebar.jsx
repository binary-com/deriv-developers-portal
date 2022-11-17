import styles from './Sidebar.module.scss';
import React from 'react';
import { sidebar_routes, SidebarMenuItems } from '../../../../routes-data/sidebar-routes';

const Sidebar = () => {
    return (
        <div className={styles.sidebarleft} data-id='sidebarleft'>
            <p className={styles.sidebartitle}>Documentation</p>
            <div className={styles.sidebarContainer}>
                <SidebarMenuItems routes={sidebar_routes} />
            </div>
        </div>
    );
};

export default Sidebar;
