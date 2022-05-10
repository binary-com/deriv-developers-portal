import styles from "./homepage.module.scss";
import HomepageSlider from "./components/HomepageSlider/HomepageSlider";

export default function HomePage() {
  return (
    <div className="main-content">
      <div className={styles.heroImage}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroHeader}>Deriv API</h1>
          <h2 className={styles.heroText}>
            Use our powerful, flexible, and free API to build a custom trading <br />
            platform - for yourself or for your business.
          </h2>
        </div>
      </div>
      <div className="main-page-row gray take-to-lib">
          <div className="row-container">
            <div className={`single-container gray ${styles.clientLibrary}`}>
              <div className={styles.iconJsLibrary} />
              <h1>
                Comprehensive all-in-one client library
              </h1>
              <p className="subheader">
                Simplify your development processes and get your app up and running <br />
                faster with the client library of your choice.
              </p>
              <div className={styles.libraryLinks}>
                <div className={styles.logoAndLink}>
                  <a href="https://binary-com.github.io/deriv-api/" className={styles.libraryGoTo}>
                    <div className={styles.logoJavascript}/>
                    <label>Go to the JavaScript library</label>
                    <div className={styles.libraryChevron} />
                  </a>
                </div>
                <div className={styles.logoAndLink}>
                  <a href="https://binary-com.github.io/python-deriv-api/" className={styles.libraryGoTo}>
                    <div className={styles.logoPython} />
                    <label>Go to the Python library</label>
                    <div className={styles.libraryChevron} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="main-page-row">
        <div className={`column-container ${styles.benefitsContainer}`}>
          <h1 className={styles.benefitsTitle}>Benefits of using Deriv API</h1>
          <div className={`container ${styles.benefitsIcons}`}>
            <div className="single-container">
              <div className={`${styles.automationIcon} ${styles.image}`} />
              <p>Automation</p>
            </div>
            <div className="single-container">
              <div className={`${styles.integrationIcon} ${styles.image}`} />
              <p>Easy integration</p>
            </div>
            <div className="single-container">
              <div className={`${styles.executionIcon} ${styles.image}`} />
              <p>Fast execution</p>
            </div>
          </div>
          <div className={styles.benefits}>
            <div className={styles.personalisationContainer}>
              <div className={styles.personalisationImage} />
              <div className={styles.personalisation}>
                <h3>Personalise your trading</h3>
                <p>Personalise your trading apps to match your needs. Create charts and views the way you like them. Develop your trading app using any common programming language and extend your trading opportunities.</p>
              </div>
            </div>
            <div className={styles.earnMoreContainer}>
              <div className={styles.earnMoreImage} />
              <div className={styles.earnMore}>
                <h3>Build a business and earn more</h3>
                <p>Create your own trading apps by taking advantage of the power of Deriv's trading services. Share your apps with fellow traders or customers, and get a chance to earn more or build your own business.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page-row gray ways-row">
        <div className={`column-container ${styles.waysContainer}`}>
          <div className={styles.waysWrapper}>
            <div>
              <h1>Ways to earn with Deriv API</h1>
            </div>
            <div>
              <div className={`main-page-card ${styles.ways}`}>
                <div className={styles.checklistIcon} />
                <p>Register your app with Deriv, and add a percentage markup to the contract prices to profit from every purchased contract.</p>
              </div>
              <div className={`main-page-card ${styles.ways}`}>
                <div className={styles.checklistIcon} />
                <p>Sign up as an affiliate, build your app, and get commissions on trades completed via your app and the affiliate plan you select.</p>
              </div>
              <div className={`main-page-card ${styles.ways}`}>
                <div className={styles.checklistIcon} />
                <p>Sign up as a payment agent, build your own custom payment website, and use our API to earn commission on every payment you process for Deriv’s clients.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="main-page-row with-pattern">
          <div className="column-container">
            <h1>Get started with our API in 3 simple steps:</h1>
            <div className="card-container">
              <a target="_blank" href="https://deriv.com/signup/" rel="noopener noreferrer" className="main-page-card">
                <div className="header">
                  <h3>1. Sign up</h3>
                  <div className={styles.signUpIcon} />
                </div>
                <div className="content hide-on-mobile">
                  Create a free Deriv account to access<br />
                  our API (or use your Binary.com login details).
                </div>
                <div className="content hide-on-desktop">
                  Create a free Deriv account to access our API (or use your Binary.com login details).
                </div>
              </a>
              <a href="/docs/app-registration" className="main-page-card">
                <div className="header">
                  <h3>2. Register your app</h3>
                  <div className={styles.registerYourAppIcon} />
                </div>
                <div className="content">Fill out the registration form to start using Deriv API.</div>
              </a>
              <a href="/docs/api-guide/" className="main-page-card">
                <div className="header">
                  <h3>3. Read our guide</h3>
                  <div className={styles.guideIcon} />
                </div>
                <div className="content">
                  Our API quick start guide covers the essentials you need to start building your app right away.
                </div>
              </a>
            </div>
            <span className="term-conditions">By using our API, you confirm that you have read and agreed to our
              <a href="https://deriv.com/tnc/business-partners-api-user.pdf" target="_blank" rel="noopener noreferrer"> terms and conditions.</a>
            </span>
          </div>
        </div>
        <div className="main-page-row white">
          <div className="column-container">
            <div className={styles.apiFeatures}>
              <div className={styles.apiFeaturesDescription}>
                <h3>Deriv API features</h3>
                <p>Deriv API gives you full access to all the trading functionalities of DTrader and allows you to build your own comprehensive trading systems and analysis tools.</p>
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
        <div className="main-page-row white">
          <h1 className="clients-opinion">See what our clients say</h1>
          <div className="column-container">
            <HomepageSlider />
          </div>
        </div>
      </div>
      <div className="container dark">
        <div className="row-container">
          <div className="single-container dark">
            <h2>Get connected</h2>
            <p className="mb-16p">
              Discuss ideas and share solutions with developers worldwide.
            </p>
            <a target="_blank" href="https://binary.vanillacommunity.com/" className="community-btn" rel="noreferrer noopener">Join our community</a>
          </div>
          <div className="single-container dark">
            <h2>We're here to help</h2>
            <p>
              Email us at
              <a href="mailto: api-support@deriv.com"> api-support@deriv.com</a><br />
              if you have any questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
