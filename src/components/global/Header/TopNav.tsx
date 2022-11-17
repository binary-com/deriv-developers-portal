import styles from './Header.module.scss';
export const TopNav = () => {
    return (
        <div className={`${styles.topNav} ${styles.flexContainer}`}>
            <div className={styles.topNavContainer}>
                <a href='https://deriv.com/'>Deriv website</a>
                <a href='https://deriv.com/who-we-are'>About us</a>
                <a href='https://deriv.com/contact-us'>Contact us</a>
            </div>
        </div>
    );
};
