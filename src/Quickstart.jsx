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
