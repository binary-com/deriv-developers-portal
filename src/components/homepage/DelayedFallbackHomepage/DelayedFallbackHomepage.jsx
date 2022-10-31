import styles from './DelayedFallbackHomepage.module.scss';

export default function DelayedFallbackHomepage() {
    return (
        <div className='main-content'>
            <div className={styles.heroImageSkeleton} />
            <div className={styles.libraryLinksSkeleton} />
        </div>
    );
}
