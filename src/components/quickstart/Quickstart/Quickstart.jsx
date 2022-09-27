import styles from './Quickstart.module.scss';
import { SandboxIframe, sandboxes } from '../../utility/SandboxIframe/SandboxIframe';

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
    <h3>Here is how our API works</h3>
    <p>
      Below, you see a code example on retrieving <b>tick data</b> from the API. A tick is a measure of minimum upward or downward movement in the price of
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
    <h3>Ticks API call example</h3>
    <SandboxIframe sandbox={sandboxes.ticks} />
  </div>
);

export default QuickStart;
