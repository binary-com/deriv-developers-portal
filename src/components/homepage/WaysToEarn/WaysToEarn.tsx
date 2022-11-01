import styles from './WaysToEarn.module.scss';
export const WaysToEarn = () => {
    return (
        <div className={`column-container ${styles.waysContainer}`}>
            <div className={styles.waysWrapper}>
                <div>
                    <h2>Ways to earn with Deriv API</h2>
                </div>
                <div>
                    <div className={`main-page-card ${styles.ways}`}>
                        <div className={styles.checklistIcon} />
                        <p>
                            Register your app with Deriv, and add a percentage markup to the contract prices to profit
                            from every purchased contract.
                        </p>
                    </div>
                    <div className={`main-page-card ${styles.ways}`}>
                        <div className={styles.checklistIcon} />
                        <p>
                            Sign up as an affiliate, build your app, and get commissions on trades completed via your
                            app and the affiliate plan you select.
                        </p>
                    </div>
                    <div className={`main-page-card ${styles.ways}`}>
                        <div className={styles.checklistIcon} />
                        <p>
                            Sign up as a payment agent, build your own custom payment website, and use our API to earn
                            commission on every payment you process for Deriv’s clients.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
