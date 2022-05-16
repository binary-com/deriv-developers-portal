import { useState } from 'react';
import styles from './Navigator.module.scss';

export default function Navigator() {
    const [is_closed, setIsClosed] = useState(false);
    return (
        <div id="navigator" className={styles.navigator}>
            <div className={styles.navigatorTitleContainer}>
                <p className={`${styles.navigatorTitle} ${styles.bold}`}>Table of contents</p>
                <span className={`${styles.arrow} ${is_closed ? '' : styles.down}`} onClick={() => setIsClosed(!is_closed)} />
            </div>
            <div className={`${styles.navigatorContent} ${is_closed ? '' : styles.opened}`}>
                <a className={styles.navigatorLink} href="#what-is-api">What is API?</a>
                <a className={styles.navigatorLink} href="#the-deriv-api">The Deriv API</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#what-can-you-do-with-the-deriv-api">What can you do with the Deriv API?</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#how-can-you-earn-with-deriv-api">How can you earn with Deriv API?</a>
                <a className={styles.navigatorLink} href="#technical-specifications-of-the-deriv-api">Technical specifications of the Deriv API</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#websockets">WebSockets</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#json">JSON</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#json-schemas">JSON Schemas</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#authorisation">Authorisation</a>
                <a className={`${styles.navigatorLink} ${styles.navigatorSubLink}`} href="#performing-trades-via-deriv-api">Performing trades via Deriv API</a>
                <a className={styles.navigatorLink} href="#table-mapping">Table mapping</a>
            </div>
        </div>
    )
}
