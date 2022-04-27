import styles from './BugBounty.module.scss';
import ButtonSecondary from './components/ButtonSecondary/ButtonSecondary';

export default function BugBounty() {
  return (
  <>
    <h1>Bug bounty</h1>
    <div className="text-block">
      <div className={styles.title}>Want to help us enhance our security?</div>
      <p>
        Test our products and services for security vulnerabilities and earn a
        monetary reward for any verifiable issues that you find, courtesy of our
        bug bounty programme.
      </p>
    </div>
    <div className={styles.contact}>
      <div className={styles.columnContainer}>
        <div className={`${styles.title} ${styles.centerText}`}>Explore our bounty programme</div>
        <a rel="noreferrer" target="_blank" href="https://deriv.com/bug-bounty">
          <ButtonSecondary>Go to Bug Bounty</ButtonSecondary>
        </a>
      </div>
      <div className={styles.columnContainer}>
      <div className={`${styles.title} ${styles.centerText}`}>Got questions?</div>
        <p className={styles.centerText}>
          Email us at
          <a href="mailto:security@deriv.com"> security@deriv.com</a> for more
          information.
        </p>
      </div>
    </div>
  </>
  )
}
