import styles from "./Quickstart.module.scss";
import CodeBlock from "./components/CodeBlock/CodeBlock";

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
    <CodeBlock id={"ticks"} />
    <h2>Ticks history</h2>
    <p>
      With ticks history you are able to make a collection of past ticks.
      It is also possible to subscribe to the websocket to keep track of the past ticks.
    </p>
    <CodeBlock id={"ticks-history"} />
  </div>
);

export default QuickStart;
