import styles from './ClientLibraries.module.scss';
export const ClientLibraries = () => {
    return (
        <div className='main-page-row gray take-to-lib'>
            <div className='row-container'>
                <div className={`single-container gray ${styles.clientLibrary}`}>
                    <div className={styles.iconJsLibrary} />
                    <h2 className='header'>Comprehensive all-in-one client library</h2>
                    <p className='subheader'>
                        Simplify your development processes and get your app up and running <br />
                        faster with the client library of your choice.
                    </p>
                    <div className={styles.libraryLinks}>
                        <div className={styles.logoAndLink}>
                            <a
                                href='https://binary-com.github.io/deriv-api/'
                                className={styles.libraryGoTo}
                                target='_blank'
                            >
                                <div className={styles.logoJavascript} />
                                <label>Go to the JavaScript library</label>
                                <div className={styles.libraryChevron} />
                            </a>
                        </div>
                        <div className={styles.logoAndLink}>
                            <a
                                href='https://binary-com.github.io/python-deriv-api/'
                                className={styles.libraryGoTo}
                                target='_blank'
                            >
                                <div className={styles.logoPython} />
                                <label>Go to the Python library</label>
                                <div className={styles.libraryChevron} />
                            </a>
                        </div>
                        <div className={styles.logoAndLink}>
                            <a
                                href='https://github.com/deriv-com/flutter-deriv-api'
                                className={styles.libraryGoTo}
                                target='_blank'
                            >
                                <div className={styles.logoFlutter} />
                                <label>Go to the Flutter library</label>
                                <div className={styles.libraryChevron} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
