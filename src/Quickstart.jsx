import styles from "./Quickstart.module.scss";
import CodeBlock from "./components/CodeBlock/CodeBlock";
import { SandboxIframe, sandboxes } from "../codesandbox/balance/sandbox";

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
        You can find all of the other available calls in the{" "}
        <a href="/api-explorer/">API Explorer</a>.
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
    <h2>Authorize</h2>
    <p>
      While not always the case, most of the functionalities of the Deriv API requires you to authorize
      first with an API token. This example shows how you can authorize before using specific functions.
      In more of the code examples below, you can see aswell how the authorize function is utilized.
    </p>
    <CodeBlock id={"authorize"} />
    <h2>Account balance</h2>
    <p>
      This example shows you how to use the Deriv API to retrieve account
      balance information.
    </p>
    <CodeBlock id={"balance"} />
    <h2>Buy contract</h2>
    <p>
      A contract is an agreement to buy or sell an asset at an agreed-upon
      price. This example shows you how to buy a contract using Deriv API.
    </p>
    <CodeBlock id={"buy-contract"} />
    <h2>Ticks</h2>
    <p>
      A tick is a measure of minimum upward or downward movement in the price of
      a trading commodity. This example shows you how to collect ticks for your
      trading app using Deriv's API.
    </p>
    <SandboxIframe sandbox={sandboxes.ticks} />
    <h2>Ticks history</h2>
    <p>
      With ticks history you are able to make a collection of past ticks.
      It is also possible to subscribe to the websocket to keep track of the past ticks.
    </p>
    <CodeBlock id={"ticks-history"} />
    <h2>Portfolio</h2>
    <p>
      Receive information about your portfolio with outstanding options.
    </p>
    <CodeBlock id={"portfolio"} />
    <h2>Profit table</h2>
    <p>
      This example will retrieve a summary of your account Profit Table.
    </p>
    <CodeBlock id={"profit-table"} />
    <h2>Proposal</h2>
    <p>
      This example is for getting a contract proposal. You'll be able to get the
      price, payout and spot value for your contract.
    </p>
    <p>
      To keep this connection alive in case of inactivity timeouts, see the
      example for Keep alive.
    </p>
    <CodeBlock id={"proposal"} />
    <h2>Keep alive</h2>
    <p>
      In this example you’ll see how to keep a connection alive when getting
      contract proposals via the Deriv API. This example keeps the connection
      alive by sending a ping every 30 seconds.
    </p>
    <CodeBlock id={"keep-alive"} />
    <h2>Sell expired contracts</h2>
    <p>
      This call will try to sell any expired contracts and return the number of sold contracts.
    </p>
    <CodeBlock id={"sell-expired-contracts"} />
    <h2>Website status</h2>
    <p>
      Request the website status. From the API response you will be able to look into general settings like call limits, currencies information, supported languages and much more.
    </p>
    <CodeBlock id={"website-status"} />
  </div>
);

export default QuickStart;
