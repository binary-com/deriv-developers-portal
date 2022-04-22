import React from 'react';
import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import styles from "./Faq.module.scss";
import CodeContent from './CodeContent';

const FAQ = () => {
 
  return (
    <div className={styles.pageContent}>
      <div className={styles.withBg}>
        <h1 className={styles.docmMainTitle}>FAQ</h1>
        <Accordion>
          <AccordionItem title="What is the easiest way to get started with Deriv API?">
            <p>
              View our <a href="https://api.deriv.com/docs/">code samples</a>.
              You can use these code snippets in your app to open a connection
              to our WebSocket API service. Explore our 
              <a href="/playground"> API playground</a> for the method calls you
              need for your app.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I build my own front-end app?">
            <p>
              Simply copy our open-source code and  adapt it for your needs.
              Follow these steps to get started:
            </p>
            <ol>
              <li>
                Open a <a href="https://www.github.com">GitHub</a> {" "}
                account.
              </li>
              <li>
                Download the{" "}
                <a href="https://desktop.github.com">
                  GitHub Desktop application
                </a>
                .
              </li>
              <li>
                Fork any of our{" "}
                <a href="https://github.com/binary-com/?q=&type=&language=javascript&sort=">
                  open-source front-end repositories
                </a>
                .
              </li>
              <li>Make the code changes in your fork.</li>
              <li>
                Publish your fork using the{" "}
                <a href="https://pages.github.com/">GitHub Pages</a>{" "}
                facility.
              </li>
              <li>
                For SSL and website acceleration for your app, open a free
                account on
                <a href="https://www.cloudflare.com/"> Cloudflare</a>.
              </li>
            </ol>
          </AccordionItem>
          <AccordionItem title="Can someone build an app for me?">
            <p>
              Sure! You may hire developers who are familiar with JavaScript and
              WebSocket technology to build your app for you.
            </p>
          </AccordionItem>
          <AccordionItem title="Will I earn commissions if a client signed up with Deriv using my app?">
            <p>Yes! Follow these steps:</p>
            <ol>
              <li>
                Sign up as an{" "}
                <a href="https://deriv.com/partners/affiliate-ib/">
                  affiliate
                </a>
                .
              </li>
              <li>
                Insert your affiliate token into the{" "}
                <a href={`playgound/#new_account_virtual`} passHref={true}>
                  <code className={styles.code}>new_account_virtual</code>
                </a>{" "}
                call in your app.
              </li>
            </ol>
          </AccordionItem>
          <AccordionItem title="How else can I earn?">
            <p>Here are some ways:</p>
            <ol>
              <li>
                Sign up as a {" "}
                <a href="https://deriv.com/partners/payment-agent/">
                payment agent
                </a> {" "}
                to process local payments for our clients in your country. You
                may automate your payment agent facility using the {" "}
                <a href={"/playground/#paymentagent_transfer"} passHref={true}>
                 <code className={styles.code}>paymentagent_transfer</code>
                </a>{" "}
                API call.
              </li>
              <li>
                If you are prepared to offer higher contract prices than ours,
                you may add a <strong>markup percentage</strong> when you
                <a href="/docs/app-registration"> register</a> your app. This is
                a percentage of contract payouts, and it’s added to all contract
                prices in your app. The aggregate markup is
                paid to you around the 15th of every month. Sign up as our affiliate and contact your Affiliate
                Manager to learn more.
              </li>
            </ol>
          </AccordionItem>
          <AccordionItem title="What does it mean if a schema property has the ‘sensitive’ attribute?">
            This means we will treat the value of this property as confidential,
            and will never return it in any API response. It is used for
            passwords and tokens.
          </AccordionItem>
          <AccordionItem title="What is copy trading?">
            <p>
              Copy trading allows a client (the Copier) to automatically copy
              the trades of another client (the Trader).
            </p>
            <p>
              To allow others to copy your trades, set the ‘allow_copiers’
              setting via the{" "}
              <a href="/playground/#set_settings">set settings</a> call.
            </p>
            <p>
              The Trader may create a read-only API token and provide it to the
              Copier.
            </p>
            <p>
              Enabling ‘allow_copiers’ will also make the copytrading statistics
              call available. The statistics call provides the information about
              an account. This is so that potential copiers have an idea about
              the trader’s past performance.
            </p>
            <p>
              To start copying, use the {" "}
              <a href="/playground/#copy_start">copy start</a> call. To
              stop copying, use {" "}
              <a href="/playground/#copy_stop">copy stop</a>.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I check for server status updates?">
            <p>
              Use the{" "}
              <a href="/playground/#website_status">website status</a> {" "}
              call to check whether the website is online or not.
            </p>
          </AccordionItem>
          <AccordionItem title="How do I subscribe to server status notifications?">
            <p>
              This JavaScript code opens a WebSocket and makes a subscription
              for server status notifications. When a message is received, it
              sends the website status message, if available:
            </p>
            <CodeContent lang="javascript" 
              data={` 
                const WebSocket = require('ws');
                const ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?l=EN&app_id=1089');
                
                ws.on('open', function open() {
                    ws.send(JSON.stringify({
                        website_status: 1,
                        subscribe: 1
                    }));
                });
                
                ws.on('message', function incoming(data) {
                    data = JSON.parse(data);
                    console.log('website status: %s', data.website_status.site_status);
                    if (data.website_status.message) {
                        console.log('status message: %s', data.website_status.message);
                    }
                });
              `}
             />
          </AccordionItem>
          <AccordionItem title="How do I get help?">
            Visit our{" "}
            <a href="https://binary.vanillacommunity.com/">dev forum</a> {" "}
            or email
            <a href="mailto:api-support@deriv.com?subject=API+Question:+">
               {" "}
              api-support@deriv.com
            </a>
            .
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
