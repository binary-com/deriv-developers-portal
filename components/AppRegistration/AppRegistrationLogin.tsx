import { oauthUrl } from '../../appRegistrationEffects';
export default function AppRegistrationLogin() {
    return (
        <div className="app-registration-login">
            <div className="login-image" />
            <div className="login-title bold">Log in to your Deriv account to get the API token and start
                using our API.
            </div>
            <a href={oauthUrl()} id="registerLogin" className="register-login-button main-register-btn">Log in to my Deriv account</a>
        </div>
    )
}
