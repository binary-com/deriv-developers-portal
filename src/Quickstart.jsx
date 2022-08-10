import styles from './Quickstart.module.scss';
import { SandboxIframe, sandboxes } from '../codesandbox/sandbox';

const QuickStart = () => (
  <div className="page-content">
    <h1 className={styles.doc_main_title}>Quickstart to Deriv API</h1>
    <div>
      <p>
        On this page, you&#39;ll find code samples in various programming
        languages showing you how to work with the Deriv API to perform some of
        the most important operations.
      </p>
      <p>
          You can find all of the other available calls in the <a href='/api-explorer/'>API Explorer</a>.
      </p>
      <h3 className={styles.api_sub_title}>Before you begin</h3>
      <ul className="bullet">
        <li>
          Open a <a href="https://deriv.com/">Deriv account</a> (either a demo
          or real account).
        </li>
        <li>
          Create a new token using the{" "}
          <a href="https://app.deriv.com/account/api-token">admin scope</a>.
        </li>
        <li>
          Register your app to receive your <b>app_id</b> or use{" "}
          <b>app_id 1089</b> to test Deriv API.
        </li>
      </ul>
      <h3 className={styles.api_sub_title}>Setting up your environment</h3>
      <p>
        Instructions for setting up your environment and running the examples in
        your desired programming language are given as comments in the code
        samples.
      </p>
    </div>
    <h2>Ticks</h2>
    <p>
      A tick is a measure of minimum upward or downward movement in the price of
      a trading commodity. This example shows you how to collect ticks for your
      trading app using Deriv's API.
    </p>
    <p>
      We start off with an example of ticks, because it is a fairly simple block of code to implement.
      But, if you plan to develop for example a trading application, it is fundamentally also an important feature.
    </p>
    <p>
      We subscribe to the ticks functionality from the Deriv API websocket, which will return new tick data every second or so.
      With this data you could for example create an interactive tick graph.
    </p>
    <SandboxIframe sandbox={sandboxes.ticks} />
    <h2>Ticks history</h2>
    <p>
      With ticks history you are able to get a collection of past tick times and prices.
      It is also possible to subscribe to the websocket to keep track of current and past ticks.
    </p>
    <SandboxIframe sandbox={sandboxes.ticks_history} />
    <h2>Active symbols</h2>
    <p>
      Retrieve a list of all currently active symbols (underlying markets upon which contracts are available for trading).
    </p>
    <p>
      This example retrieves all available active stock symbols. The data contains market and sub-market information related to the symbol.
      In case you want to retrieve active symbols for a specific landing company,
      you can add <code className="inline-code">landing_company</code> to the request object.
    </p>
    <SandboxIframe sandbox={sandboxes.active_symbols} />
    <h2>Contracts for symbol</h2>
    <p>
      For a given symbol, get the list of currently available contracts, and the latest barrier and duration limits for each contract.
    </p>
    <SandboxIframe sandbox={sandboxes.contracts_for_symbol} />
    <h2>Website status</h2>
    <p>
      Request the website status. From the API response you will be able to look into general settings like call limits, currencies information, supported languages and much more.
    </p>
    <SandboxIframe sandbox={sandboxes.website_status} />
    <h2>Proposal</h2>
    <p>
      This example is for getting a contract proposal. You'll be able to get the
      price, payout and spot value for your contract.
    </p>
    <p>
      To keep this connection alive in case of inactivity timeouts, see the
      example for Keep alive.
    </p>
    <SandboxIframe sandbox={sandboxes.proposal} />
    <h2>Keep alive</h2>
    <p>
      In this example you’ll see how to keep a connection alive when getting
      contract proposals via the Deriv API. This example keeps the connection
      alive by sending a ping every 30 seconds.
    </p>
    <SandboxIframe sandbox={sandboxes.keep_alive} />
    <h2>Authorize</h2>
    <p>
      While not always the case, most of the functionalities of the Deriv API requires you to authorize
      first with an API token. This example shows how you can authorize before using specific functions.
    </p>
    <p>
      In order to authorize, the user needs to login to receive a token which will be stored in the local storage of the web browser.
      Then this token can be used to connect to the websocket to retrieve data that requires token authorization.
    </p>
    <p>In more of the code examples below, you can see aswell how the authorize function is utilized.</p>
    <SandboxIframe sandbox={sandboxes.auth} />
    <h2>Portfolio</h2>
    <p>
      Receive information about your portfolio with outstanding options.
    </p>
    <SandboxIframe sandbox={sandboxes.portfolio} />
    <h2>Profit table</h2>
    <p>
      This example will retrieve a summary of your account Profit Table.
    </p>
    <SandboxIframe sandbox={sandboxes.profit_table} />
    <h2>Proposal: Open contract</h2>
    <p>
      Get latest price (and other information) for a contract in the user's portfolio.
    </p>
    <SandboxIframe sandbox={sandboxes.proposal_open_contract} />
    <h2>Sell expired contracts</h2>
    <p>
      This call will try to sell any expired contracts and return the number of sold contracts.
    </p>
    <SandboxIframe sandbox={sandboxes.sell_expired_contracts} />
    <h2>Statement</h2>
    <p>
      Retrieve a summary of account transactions, according to given search criteria.
    </p>
    <SandboxIframe sandbox={sandboxes.statement} />
    <h2>Account balance</h2>
    <p>This example shows you how to use the Deriv API to retrieve account balance information.</p>
    <SandboxIframe sandbox={sandboxes.balance} />
    <h2>Buy contract</h2>
    <p>
      A contract is an agreement to buy or sell an asset at an agreed-upon
      price. This example shows you how to buy a contract using Deriv API.
    </p>
    <SandboxIframe sandbox={sandboxes.buy_contract} />
  </div>
);

export default QuickStart;
