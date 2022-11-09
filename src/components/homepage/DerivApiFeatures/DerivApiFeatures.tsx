import styles from './DerivApiFeatures.module.scss';

export const DerivApiFeatures = () => {
    return (
        <div className='main-page-row white'>
            <div className='column-container'>
                <div className={styles.apiFeatures}>
                    <div className={styles.apiFeaturesDescription}>
                        <h2>Deriv API features</h2>
                        <p>
                            Deriv API gives you full access to all the trading functionalities of DTrader and allows you
                            to build your own comprehensive trading systems and analysis tools.
                        </p>
                        <p>With our API, you'll be able to:</p>
                        <ul>
                            <li>
                                <div className={styles.checklistIcon} />
                                <p>Trade digital options and multipliers</p>
                            </li>
                            <li>
                                <div className={styles.checklistIcon} />
                                <p>Monitor real-time pricing</p>
                            </li>
                            <li>
                                <div className={styles.checklistIcon} />
                                <p>Buy/sell contracts</p>
                            </li>
                            <li>
                                <div className={styles.checklistIcon} />
                                <p>Manage users' accounts</p>
                            </li>
                            <li>
                                <div className={styles.checklistIcon} />
                                <p>Monitor existing contracts</p>
                            </li>
                            <li>
                                <div className={styles.checklistIcon} />
                                <p>View users' historical transactions</p>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.apiFeaturesImage} />
                </div>
            </div>
        </div>
    );
};
