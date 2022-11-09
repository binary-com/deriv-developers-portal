import { oauthUrl } from '../../../global-functions/appRegistrationEffects';
export default function BuildYourApp() {
    return (
        <div>
            <h3>Build your app</h3>
            <div>
                <h5>1. Open a Deriv account</h5>
                <p>
                    <a href='https://deriv.com/signup'>Sign up</a> for a Deriv account (either a demo or a real account)
                    at no charge.
                </p>
            </div>
            <div>
                <h5>2. Create an API token</h5>
                <p>
                    To gain access to the Deriv API, you'll need an API token with the Admin scope. We'll use this token
                    to tag your application to your Deriv account.
                </p>
                <p>Follow these steps to create an API token:</p>
                <ul className='numbered-list'>
                    <li>
                        <a href={oauthUrl()}>Log in</a> to your Deriv account and go to{' '}
                        <a href='https://app.deriv.com/account/api-token'>Manage account settings &gt; API token.</a>
                    </li>
                    <li>
                        Select the <strong>Admin</strong> scope, enter a name for your token, and click{' '}
                        <strong>Create</strong>.
                    </li>
                    <li>
                        Your API token will appear in the list at the bottom of the screen. You'll need it for the next
                        step.
                    </li>
                </ul>
            </div>
            <div>
                <h5>3. Register your application</h5>
                <p>
                    You'll get your app ID when you register your application. With this app ID and the API token from
                    the previous step, your application can talk to the Deriv API. Also, whenever you need support, just
                    quote your app ID when talking to our Customer Support team.
                </p>
                <p>Follow these steps to register your application:</p>
                <ul className='numbered-list'>
                    <li>
                        <a href={oauthUrl()}>Log in</a> to your Deriv account and{' '}
                        <a href='/app-registration'>complete this form</a>. Remember the API token you created during
                        the previous step? You'll need it in this step.
                    </li>
                    <li>
                        After your application is registered, it will appear in the{' '}
                        <strong>Manage existing applications</strong> tab. You may now delete your API token.
                    </li>
                </ul>
            </div>
        </div>
    );
}
