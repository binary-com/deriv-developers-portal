export default function HomePage() {
  return (
    <div className="main-content">
      <div className="hero-image">
        <div className="hero-container">
          <h1 className="hero-header">Deriv API</h1>
          <h2 className="hero-text">
            Use our powerful, flexible, and free API to build a custom trading <br />
            platform – for yourself or for your business.
          </h2>
        </div>
      </div>
      <div className="main-page-row">
        <div className="column-container">
          <h1 className="benefits-title">Benefits of using Deriv API</h1>
          <div className="container benefits-icons">
            <div className="single-container">
              <div className="automation-icon" />
              <p>Automation</p>
            </div>
            <div className="single-container">
              {/* replace to div integration icon */}
              <div className="integration-icon" />
              <p>Easy integration</p>
            </div>
            <div className="single-container">
              <div className="execution-icon" />
              <p>Fast execution</p>
            </div>
          </div>
          <div className="benefits">
            <div className="personalisation-container">
              <img className="personalisation-image" src="/img/personalisation.png" alt="personalisation icon" width="486px" height="260px" />
              <div className="personalisation">
                <h3>Personalise your trading</h3>
                <p>Personalise your trading apps to match your needs. Create charts and views the way you like them. Develop your trading app using any common programming language and extend your trading opportunities.</p>
              </div>
            </div>
            <div className="earn-more-container">
              <img className="earn-more-image" src="/img/build-business.png" alt="build business icon" width="486px" height="260px" />
              <div className="earn-more">
                <h3>Build a business and earn more</h3>
                <p>Create your own trading apps by taking advantage of the power of Deriv's trading services. Share your apps with fellow traders or customers, and get a chance to earn more or build your own business.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-page-row gray">
        <div className="column-container">
          <div className="ways-container">
            <div>
              <h1>Ways to earn with Deriv API</h1>
            </div>
            <div>
              <div href="/docs/api-guide/" className="main-page-card ways">
                <img src="/img/checklist-icon.svg" alt="sign up icon" width={32} height={32} />
                <p>Register your app with Deriv, and add a percentage markup to the contract prices to profit from every purchased contract.</p>
              </div>
              <div href="/docs/api-guide/" className="main-page-card ways">
                <img src="/img/checklist-icon.svg" alt="sign up icon" width={32} height={32} />
                <p>Sign up as an affiliate, build your app, and get commissions on trades completed via your app and the affiliate plan you select.</p>
              </div>
              <div href="/docs/api-guide/" className="main-page-card ways">
                <img src="/img/checklist-icon.svg" alt="sign up icon" width={32} height={32} />
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
                  <img src="/img/sign-up.svg" alt="sign up icon" width={32} height={32} />
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
                  <img src="/img/register-your-app.svg" alt="sign up icon" width={32} height={32} />
                </div>
                <div className="content">Fill out the registration form to start using Deriv API.</div>
              </a>
              <a href="/docs/api-guide/" className="main-page-card">
                <div className="header">
                  <h3>3. Read our guide</h3>
                  <img src="/img/guide.svg" alt="sign up icon" width={32} height={32} />
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
            <div className="api-features">
              <div className="api-features-description">
                <h3>Deriv API features</h3>
                <p>Deriv API gives you full access to all the trading functionalities of DTrader and allows you to build your own comprehensive trading systems and analysis tools.</p>
                <p>With our API, you'll be able to:</p>
                <ul>
                  <li>
                    <img src="/img/checklist-icon.svg" alt="check list icon" width={24} height={24} />
                    <p>Trade digital options and multipliers</p>
                  </li>
                  <li>
                    <img src="/img/checklist-icon.svg" alt="check list icon" width={24} height={24} />
                    <p>Monitor real-time pricing</p>
                  </li>
                  <li>
                    <img src="/img/checklist-icon.svg" alt="check list icon" width={24} height={24} />
                    <p>Buy/sell contracts</p>
                  </li>
                  <li>
                    <img src="/img/checklist-icon.svg" alt="check list icon" width={24} height={24} />
                    <p>Manage users' accounts</p>
                  </li>
                  <li>
                    <img src="/img/checklist-icon.svg" alt="check list icon" width={24} height={24} />
                    <p>Monitor existing contracts</p>
                  </li>
                  <li>
                    <img src="/img/checklist-icon.svg" alt="check list icon" width={24} height={24} />
                    <p>View users' historical transactions</p>
                  </li>
                </ul>
              </div>
              <img className="api-features-image" src="/img/api-featutes.png" alt="api features" width="600px" height="auto" />
            </div>
          </div>
        </div>
        <div className="main-page-row white">
          <h1 className="clients-opinion">See what our clients say</h1>
          <div className="column-container">
            <div id="slider" className="slider loaded">
              <div className="wrapper">
                <div id="slides" className="slides">
                  <div className="slide">
                    <blockquote className="content">
                      To be honest, Deriv’s API is one of the best APIs in the trading market.
                    </blockquote>
                    <hr className="blockquote-separator" />
                    <p className="blockquote-author"><b>Alessandro</b>, CEO | Italy</p>
                  </div><div className="slide">
                    <blockquote className="content">
                      Probably the best API for making your business successful in trading derivatives out there.
                    </blockquote>
                    <hr className="blockquote-separator" />
                    <p className="blockquote-author"><b>Thiago</b>, entrepreneur | Brazil</p>
                  </div>
                  <div className="slide">
                    <blockquote className="content">
                      I have been using the Deriv API for 13 years to build successful apps in and I find the support I get from Deriv as a business partner second to none. I look forward to 13 more successful years to come.
                    </blockquote>
                    <hr className="blockquote-separator" />
                    <p className="blockquote-author"><b>Josh</b>, trader | Australia</p>
                  </div>
                  <div className="slide">
                    <blockquote className="content">
                      To be honest, Deriv’s API is one of the best APIs in the trading market.
                    </blockquote>
                    <hr className="blockquote-separator" />
                    <p className="blockquote-author"><b>Alessandro</b>, CEO | Italy</p>
                  </div>
                  <div className="slide">
                    <blockquote className="content">
                      Probably the best API for making your business successful in trading derivatives out there.
                    </blockquote>
                    <hr className="blockquote-separator" />
                    <p className="blockquote-author"><b>Thiago</b>, entrepreneur | Brazil</p>
                  </div></div>
              </div>
              <a id="prev" className="control prev" />
              <a id="next" className="control next" />
            </div>
          </div>
        </div>
        <div className="main-page-row gray take-to-lib">
          <div className="row-container">
            <div className="single-container gray">
              <img src="/img/js-library.svg" alt="javascript library icon" width={64} height={64} />
              <h1 className="max-js-div">
                Comprehensive all-in-one client library
              </h1>
              <p className="subheader">
                Simplify your development processes and get your app up and running <br />
                faster with the client library of your choice.
              </p>
              <div className="lib-links">
                <div className="logo-and-link">
                  <a href="https://binary-com.github.io/deriv-api/" className="library-go-to">
                    <div className="logo-javascript" />
                    <label>Go to the JavaScript library</label>
                    <div className="library-chevron" />
                  </a>
                </div>
                <div className="logo-and-link">
                  <a href="https://binary-com.github.io/python-deriv-api/" className="library-go-to">
                    <div className="logo-python" />
                    <label>Go to the Python library</label>
                    <div className="library-chevron" />
                  </a>
                </div>
              </div>
            </div>
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
            <h2>We’re here to help</h2>
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