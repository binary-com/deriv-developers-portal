import styles from './Bugbounty.module.scss';
import ButtonSecondary from './components/ButtonSecondary/ButtonSecondary';

export default function Bugbounty() {
  return (
  <div className="page-content">
    <h1>Bug bounty</h1>
    <div className="text-block">
      <h3>Want to help us enhance our security?</h3>
      <p>
        Test our products and services for security vulnerabilities and earn a
        monetary reward for any verifiable issues that you find, courtesy of our
        bug bounty programme.
      </p>
    </div>
    <div className={styles.feedback}>
      <div className={styles.contact}>
        <div className={styles.columnContainer}>
          <h2>Explore our bounty programme</h2>
          <a rel="noreferrer" target="_blank" href="https://deriv.com/bug-bounty">
            <ButtonSecondary>Go to Bug Bounty</ButtonSecondary>
          </a>
        </div>
        <div className={styles.columnContainer}>
          <h2>Got questions?</h2>
          <p>
            Email us at
            <a href="mailto:security@deriv.com"> security@deriv.com</a> for more
            information.
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}
