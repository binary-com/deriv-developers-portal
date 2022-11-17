import { SandboxIframe, sandboxes } from '../../utility/SandboxIframe/SandboxIframe';

const QuickStart = () => (
    <div className='page-content'>
        <h3>Quick Start</h3>
        <p>The easiest way to understand how Deriv API works is to try our Tick call:</p>
        <SandboxIframe sandbox={sandboxes.ticks} />
        <p>
            We'll start with the ticks example because it's a pretty simple block of code to implement. You don't have
            to log into the Deriv account and get your app authenticated to try it.
        </p>
        <p>
            A tick is a measure of minimum upward or downward movement in the price of a trading commodity. We subscribe
            to the ticks functionality from the Deriv API websocket, which will return new tick data every second. As an
            example you could create an interactive tick graph with this data.
        </p>
        <p>
            You can find other available calls in the <a href='/docs/getting-started/implement-now'>Implement now</a> or
            in the <a href='/api-explorer'>API Explorer.</a>
        </p>
    </div>
);

export default QuickStart;
