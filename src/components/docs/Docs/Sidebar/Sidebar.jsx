import styles from './Sidebar.module.scss';
import React from 'react';
import {
    getting_started,
    resources,
    SidebarMenuItems,
    rest,
} from '../../../../routes-data/sidebar-routes';

const Sidebar = () => {

    return (
        <div className={styles.sidebarleft} data-id='sidebarleft'>
            <p className={styles.sidebartitle}>Documentation</p>
            <div>
                <SidebarMenuItems routes={rest} />
                <SidebarMenuItems routes={getting_started} />
                {/* <SidebarMenuItems routes={what_can_you_do} /> */}
                <SidebarMenuItems routes={resources} />
            </div>
        </div>
    );
};

export default Sidebar;
