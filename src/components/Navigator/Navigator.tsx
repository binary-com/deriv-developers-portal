import { useState } from 'react';
import styles from './Navigator.module.scss';
import NavigatorContent from './NavigatorContent';

export default function Navigator({ nav_object = {} }) {
    const [is_closed, setIsClosed] = useState(false);
    return (
        <div id='navigator' className={styles.navigator} data-id='navigator'>
            <div className={styles.navigatorTitleContainer}>
                <p className={`${styles.navigatorTitle} ${styles.bold}`}>Table of contents</p>
                <span
                    className={`${styles.arrow} ${is_closed ? '' : styles.down}`}
                    onClick={() => setIsClosed(!is_closed)}
                />
            </div>
            <div className={`${styles.navigatorContent} ${is_closed ? '' : styles.opened}`}>
                <NavigatorContent nav_object={nav_object} />
            </div>
        </div>
    );
}
