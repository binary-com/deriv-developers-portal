import styles from './HeroHeader.module.scss';
export const HeroHeader = () => {
    return (
        <div className={styles.heroImage}>
            <div className={styles.heroContainer}>
                <h1 className={styles.heroHeader}>Deriv API</h1>
                <h2 className={styles.heroText}>
                    Use our powerful, flexible, and free API to build a custom trading <br />
                    platform - for yourself or for your business.
                </h2>
            </div>
        </div>
    );
};
