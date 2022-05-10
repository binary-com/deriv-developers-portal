import { Link } from '@tanstack/react-location';
import { useSelector } from '@xstate/react';
import styles from './ApiGuide.module.scss';
import Navigator from './components/Navigator/Navigator';
import { isMobileSelector } from './selectors';
import { stateService } from './stateSignal';
import CodeBlockSingleLanguage from './components/CodeBlock/CodeBlockSingleLanguage';
import ticksJSON from './public/demos/json/ticks.json';
import nestedJSON from './public/demos/json/nested.json';
import statusJSON from './public/demos/json/status.json';
import schemaJSON from './public/demos/json/schema.json';

import howAPIWorksUrl from './img/how-api-works.png';
import apiPlaygroundUrl from './img/api-playground.png';
import showJSONSchemaUrl from './img/show-json-schema.png';
import apiTokenPageUrl from './img/api-token-page.png';
import readAccessUrl from './img/read-access.png';
import howOauthWorksUrl from './img/how-oauth-works.png';
import signupUrl from './img/signup.png';
import ApiGuideTable from './ApiGuideTable';

export default function ApiGuide() {
  const isMobile = useSelector(stateService, isMobileSelector);
  const tickContent = JSON.stringify(ticksJSON, null, 2);
  const nestedContent = JSON.stringify(nestedJSON, null, 2);
  const statusContent = JSON.stringify(statusJSON, null, 2);
  const schemaContent = JSON.stringify(schemaJSON, null, 2);
  return (
    <div className={styles.apiGuide}>
      {!isMobile && <Navigator />}
      <div className={styles.apiGuideContent}>
        <h1>API guide</h1>
        {isMobile && <Navigator />}
        <div className={styles.textBlock}>
          <h2 id="what-is-api">What is API?</h2>
          <p>
            API stands for Application Programming Interface - a software that allows 2 or more computer programs to communicate with each other. These 2 programs are usually referred to as server and client.
          </p>
          <ul>
            <li>
              <strong>Server</strong>
              <p>
                A server contains information required by a client, can grant access to this information, and performs actions with it.
              </p>
              <p> The server defines how it should be spoken to, what actions it will perform, what information it will give, and its format. </p>
              <p> All these details are usually determined in an API specification. For example, here is the <a href="https://developer.twitter.com/en/docs/twitter-api">API specification for Twitter</a>.</p>
            </li>
            <li>
              <strong>Client</strong>
              <p> A client is a software program that talks to the server to either obtain information or ask the server to perform certain actions. </p>
              <p> Clients can be written in any programming language as long as that language can implement the communication standards specified by the server. </p>
              <p> The communication between a server and a client happens with the help of API requests, also known as API calls. The API calls are sent from a client to a server and back. The client and server can be written in different programming languages. </p>
            </li>
          </ul>
          <p>Here is a representation of how an API works:</p>
          <div className={styles.apiGuideImage}><img src={howAPIWorksUrl} alt="How API works" loading="lazy" /></div>
          <h3>Client libraries</h3>
          <p> Client libraries are pre-written pieces of code that can be used to send API calls instead of writing codes from scratch. </p>
          <p> Using a client library is optional but highly recommended, as it makes it much easier and efficient to start working with the API. </p>
          <p> For example, configuring the correct protocol to talk to the server may require several steps without the client library, but using a ready-made code can shorten the process to just one step. </p>
          <p> A client library also makes it easier to adapt to API updates. In many cases, if the API has a significant update, the client library is updated too. The developer of the client that uses API won’t need to make any changes to their code and will just need to update the version of the client library. </p>
        </div>
        <div className={styles.textBlock}>
          <h2 id="the-deriv-api">The Deriv API</h2>
          <h3 id="what-can-you-do-with-the-deriv-api">What can you do with the Deriv API?</h3>
          <p>The Deriv API allows you to perform nearly all functions of the Deriv platforms, since they
            share the same API.
            For our CFD platforms (Deriv MT5 and Deriv X), the API functionality is only available for some account management
            actions.</p>
          <p>Our API users typically perform the following activities:</p>
          <ul>
            <li>
              <p>Build websites similar to Deriv but with different features.</p>
            </li>
            <li>
              <p>Create desktop apps to execute trades for themselves and their clients.</p>
            </li>
            <li>
              <p>Explore historical tick information.</p>
            </li>
            <li>
              <p>Automate services as payment agents.</p>
            </li>
          </ul>
          <h3 id="how-can-you-earn-with-deriv-api">How can you earn with Deriv API?</h3>
          <ul>
            <li>
              <p>You can earn commission on trades and payments your clients perform via the
                websites and apps you
                create with Deriv API. Get more details about the commission plans <a href="https://deriv.com/partners/affiliate-ib/" rel="noreferrer" target="_blank">here</a>. </p>
            </li>
            <li>
              <p>You can also earn from markups on every contract purchased via a trading app you created
                with Deriv API. The
                markup is defined by you and can be up to 5%.</p>
            </li>
          </ul>
          <p>Here is an example of how the markup is calculated:</p>
          <ul className={styles.markupCalc}>
            <p>To get a payout of <b>2 USD:</b></p>
            <li>Client stake without markup = <b>1.07 USD</b></li>
            <p>With the markup (e.g. 2%), a client pays:</p>
            <li>Client's stake with the markup = Stake + (payout x markup)</li>
            <li>Client's stake with the markup = 1.07 USD (2 USD x 2%) = <b>1.11 USD</b></li>
          </ul>
          <h3>Conditions of using the Deriv API</h3>
          <p>The Deriv API is free of charge and is subject to our <a href="https://deriv.com/terms-and-conditions">terms
            and conditions</a> and <a href="https://deriv.com/tnc/business-partners-general-terms.pdf">copyright</a>.</p>
          <p>Should you run into any difficulties using it or if you need assistance, please contact us via one of our
            support forums or via <a href="mailto:api-support@deriv.com">email</a>.</p>
        </div>
        <div className={styles.textBlock}>
          <h2 id="technical-specifications-of-the-deriv-api">Technical specifications of the Deriv API</h2>
          <p>It is only possible to communicate with the Deriv API using WebSockets; it does not support other protocols. Any
            data passed to the Deriv API should be in JSON format, while the comprehensive all-in-one client library is
            available in JavaScript and Python.</p>
          <h3 id="websockets">WebSockets</h3>
          <p>The WebSockets protocol is an advanced version of the communication channel that is available in all popular
            programming languages. It allows the server to send information to the client and maintain the connection without
            the client requesting it every time.</p>
          <p>In comparison, APIs using REST over HTTP don't maintain a connection to the client once the server has replied to
            it.</p>
          <p>The WebSockets protocol provides clients with a faster and more efficient way to receive updated information as
            soon as it becomes available. For example, you can subscribe to account balance updates and the Deriv servers will
            send the new balance to your client in real time.</p>
          <p>A client can also subscribe and receive several types of different information simultaneously over a single
            connection.</p>
          <p>For more information on how to write a client using WebSockets, visit this <a href="/docs/">guide</a>.</p>
          <h2 id="json">JSON</h2>
          <p>JavaScript Object Notation (JSON) is a data format based on JavaScript. However, it is completely
            language-independent, and can be used by any modern programming language. JSON has a good balance between being
            readable by humans and by machines, making it both user-friendly and computer-efficient.</p>
          <p>Here is an example of the JSON formatted code, where “ticks” is the name of the attribute and “R_100” is the
            value of that attribute.</p>
        </div>
        <div className={styles.apiCodeBlock}><CodeBlockSingleLanguage lang="json" content={tickContent} /></div>
        <p>Data in JSON can also be nested, so if you wanted to send user information with an address, it could look like:</p>
        <div className={styles.apiCodeBlock}><CodeBlockSingleLanguage lang="json" content={nestedContent} /></div>
        <p>When you are writing an API client, you will write something like <code className="inline-code">print address.street_number </code> 
        (depending on the programming language) to print the street number.</p>
        <p>This nesting can have as many levels as required to convey the information.</p>
        <p>For example, when we send information about account status, it requires several levels to print information (<code className="inline-code">print authentication.identity.services.manual</code>) about the manual Identity service status:</p>
        <div className={styles.apiCodeBlock}><CodeBlockSingleLanguage lang="json" content={statusContent} /></div>
        <h2 id="json-schemas">JSON Schemas</h2>
        <p>JSON Schema is a defined format for the JSON messages used to describe their structure to Deriv API users. In a nutshell, it’s a standardised way of explaining what a JSON request should look like using JSON itself.</p>
        <p>Here is an example of the part of the JSON Schema that is used to tell developers what to send when they request the balance of an account:</p>
        <div className={styles.apiCodeBlock}><CodeBlockSingleLanguage lang="json" content={schemaContent} /></div>
        <p>You can see that the balance is a required attribute, the value must equal 1, and the account is an optional attribute. But if you choose to send it, it must be a string (word) and has to match the described pattern.</p>
        <p>JSON Schemas on Deriv are divided into schemas we accept (request) and schemas we send (response).
          You can find the detailed JSON schemas for each API call on our <a href="/api-explorer/">API Explorer</a>.</p>
        <div className={styles.apiGuideImage}><img src={apiPlaygroundUrl} alt="API Guide" loading="lazy" /></div>
        <p>To see the raw JSON schemas, click on the braces within each call.</p>
        <div className={styles.apiGuideImage}><img src={showJSONSchemaUrl} alt="API Guide" loading="lazy" /></div>
        <p>The JSON Schema also forms the documentation for the API Explorer.</p>
        <h2 id="authorisation">Authorisation</h2>
        <p>Third-party developers can authorise calls to the API in two different ways: via API token or via OAuth2.</p>
        <h3>API token</h3>
        <p>An API token is a unique identifier of a client that requests access from a server. It's the simplest way of authorisation.</p>
        <p>The Deriv API token has to be generated by a client <a href="https://app.deriv.com/account/api-token">here</a>, along with setting the appropriate access level.</p>
        <div className={styles.apiGuideImage}><img src={apiTokenPageUrl} alt="API Guide" loading="lazy" /></div>
        <p>The access level for each API token has to match the required access level of each API call, which can be found in the <Link to="/api-explorer">API Explorer</Link> as well.</p>
        <p>For example, on the screenshot below, you can see that to be able to use the Account Status, a token with read access level must be used.</p>
        <div className={styles.apiGuideImage}><img src={readAccessUrl} alt="API Guide" loading="lazy" /></div>
        <p>Following the authorisation of a WebSocket connection, subsequent calls on that connection will be considered user actions.</p>
        <p>Please bear in mind that the API token can be used with any app, so both your app and your clients need to keep it secure.</p>
        <h3>OAuth2</h3>
        <p>OAuth stands for Open Authorisation - a protocol that allows a client access resources hosted on a server on behalf of the user without revealing the credentials.</p>
        <p>This type of authorisation allows clients to log in to third-party apps using their Deriv accounts without creating an API token. In this case, the third-party app does not see the user's password or permanent API token, which makes it safer.</p>
        <p>The OAuth2 authentication requires more steps to set up, but it is the safest way for developers to share access to their app with their clients.</p>
        <p>For more information on OAuth2, visit <a href="https://aaronparecki.com/oauth-2-simplified/">this guide</a>.</p>
        <p>Here is the visual representation of how the OAuth authorisation connection works:</p>
        <div className={styles.apiGuideImage}><img src={howOauthWorksUrl} alt="API Guide" loading="lazy" /></div>
        <h2>What do you need to do to use OAuth authorisation for Deriv API?</h2>
        <ul>
          <li>
            <p>Specify the URL that will be used as the OAuth Redirect URL on the <a href="https://developers.binary.com/applications/">API
            registration</a> page
            in the 'Website URL' field.</p>
          </li>
          <li>
            <p>Add a login button on your website or app and direct users to <b>https://oauth.binary.com/oauth2/authorize?app_id=your_app_id</b> where your_app_id is the ID of your app.
            </p>
          </li>
        </ul>
        <div className={styles.apiGuideImage}><img src={signupUrl} alt="API Guide" loading="lazy" /></div>
        <p>Once a user signs up, they will be redirected to the URL that you entered as the Redirect URL. This URL will have arguments added to it with the user's session tokens, and will look similar to this:</p>
        <p><code className="inline-code">https://mywebsite.com/redirect/?acct1=cr799393& token1=a1-f7pnteezo4jzhpxclctizt27hyeot&cur1=usd& acct2=vrtc1859315& token2=a1clwe3vfuuus5kraceykdsoqm4snfq& cur2=usd&state=</code></p>
        <p>In the parameters of the URL you will see all the accounts and the session token for each account.</p>
        <ul><li>Pass these tokens to the Authorize API call in order to perform actions on behalf of the account.</li></ul>
        <h2 id="performing-trades-via-deriv-api">Performing trades via Deriv API</h2>
        <p>You can perform a simple contract purchase with a code from our list of examples on the <Link to="/docs/">quick start page</Link>.</p>
        <p>However, while the simple example will work for most cases, it does not perform any checks to see if the asset is available for purchase or show the potential payout if they proceed with the purchase.</p>
        <p>To receive this additional information, you can perform several steps once you are authorised and before purchasing the contract.</p>
        <ul>
          <li>Call <a>Active Symbols</a> to get the list of active symbols.</li>
          <li>Call <a>Contracts For Symbol</a> to see what contracts can be purchased.</li>
          <li>Call <a>Price Proposal</a> to get the current payout level for the contract. Setting "subscribe": 1 gives regular updates.</li>
          <li>Call <a>Buy Contract</a> with the ID given in the Price Proposal to open a trade. Note the contract_id from the response. Setting “subscribe” : 1 will send you updates on the contracts status as <a>Proposal Open Contract</a> responses.</li>
          <li>Monitor the <b>“is_sold”</b> attribute of the <b>Proposal Open Contract</b> response to see when the contract is finished. Once the contract is finished, you can check the <b>“status”</b> attribute to see if the contract has been won or lost.</li>
        </ul>
        <h2 id="table-mapping">Table mapping</h2>
        <h3>Deriv website contract types to API parameter names</h3>
        <p>If you would like to copy certain contract types from our websites, the following table will describe how the contract type is referred to using the API.</p>
        <div className={styles.apiGuideTableContainer}><ApiGuideTable /></div>
      </div>
    </div>
  )
}
