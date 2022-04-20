import AppManagement from './AppManagement';
import './AppRegistration.scss';
import { oauthUrl } from './appRegistrationEffects';
import { send } from './stateSignal';

export default function AppRegistration() {
  return (
    <div id="app-registration-machine" className="register-app-form">
      <div className="app-registration-login">
        <div className="login-image" />
        <div className="login-title bold">Log in to your Deriv account to get the API token and start
          using our API.
        </div>
        <a href={oauthUrl()} id="registerLogin" className="register-login-button main-register-btn">Log in to my Deriv account</a>
      </div>
      <div className="app-registration-logged-in">
        <div className="app-registration-header">
          <h2 id="form-title" className="doc-sub-title form-title">Your Apps</h2>
          <h4 className="form-subtitle">Register your app to get an app ID and start using Deriv API for personal or
            business purposes</h4>
        </div>
        <div className="registered-apps-tabs">
          <button onClick={() => send('REGISTER_TOGGLE_TAB')} id="register_button" className="register-button">
            Register your application
          </button>
          <button onClick={() => send('MANAGE_TOGGLE_TAB')} id="manage_button" className="manage-button">
            Manage existing applications
          </button>
        </div>
        <div className="register-app">
          <form id="frmNewApplication">
            <div className="form-content">
              <fieldset>
                <div className="form-header-container">
                  <h4 className="register-form-header">General information</h4>
                  <div className="info-icon">
                    <div className="tooltip">
                      Please create your API token
                      <a href="https://app.deriv.com/account/api-token" className="tooltip-link">here</a>, and
                      copy it into this field.
                    </div>
                    <img src="/img/info-icon.svg" alt="Info" />
                  </div>
                </div>
                <div className="api-token-wrapper">
                  <div className="custom-text-input" id="custom-text-input">
                    <input type="text" id="api_token_input" className="api-token-input" placeholder=" " />
                    <label>API token (Required)</label>
                  </div>
                  <div className="api-token-warning" />
                  <div className="first">
                    <div className="custom-text-input" id="custom-text-input">
                      <input type="text" id="app_name" name="app_name" pattern="^[\w\s-]{1,48}$" placeholder=" " required />
                      <label>App name (Required)</label>
                    </div>
                  </div>
                </div></fieldset>
              <div className="expand-form">
                <input id="expand_form" className="expand-form-checkbox" type="checkbox" autoComplete="off" />
                <label htmlFor="admin-scope">I'd like to use OAuth or monetise my app</label>
              </div>
              <div className="expandable-form">
                <fieldset>
                  <div className="form-header-container">
                    <h4 className="register-form-header">Markup</h4>
                    <div className="info-icon">
                      <div className="tooltip">For each trade performed on your app, you will receive a
                        commission. Set a markup percentage below to determine the commission you will
                        make.</div>
                      <img src="/img/info-icon.svg" alt="Info" />
                    </div>
                  </div>
                  <div className="input-container">
                    <div>
                      <div className="custom-text-input" id="custom-text-input">
                        <input id="app_markup_percentage" type="text" maxLength={5} className="last" placeholder=" " />
                        <label>Markup percentage</label>
                      </div>
                      <p className="helper-text">(0.00-5.00%)</p>
                    </div>
                  </div>
                  <div className="form-header-container">
                    <h4 className="register-form-header">Authorisation</h4>
                    <div className="info-icon">
                      <div className="tooltip">To use OAuth, please fill out the following fields. These
                        details can be changed later using the app_update API call.</div>
                      <img src="/img/info-icon.svg" alt="Info" />
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="custom-text-input" id="custom-text-input">
                      <input id="app_redirect_uri" type="text" maxLength={255} placeholder=" " />
                      <label>Website URL</label>
                    </div>
                    <p className="helper-text">*Please note that this URL will be used as the OAuth redirect
                      URL for the OAuth authorisation</p>
                  </div>
                  <div className="input-container">
                    <div className="custom-text-input" id="custom-text-input">
                      <input id="app_verification_uri" type="text" maxLength={255} placeholder=" " />
                      <label>Verification URL</label>
                    </div>
                  </div>
                </fieldset>
                <div className="scopes" id="register_scopes">
                  <div>
                    <div className="form-header-container">
                      <h4 className="register-form-header">OAuth authorisation levels</h4>
                      <div className="info-icon">
                        <div className="tooltip">Please select the level of access you would like clients to
                          give to your app.</div>
                        <img src="/img/info-icon.svg" alt="Info" />
                      </div>
                    </div>
                    <p>Bear in mind that you generally need only
                      <b>'Trade'</b> and
                      <b>'Trading information'</b> access.
                    </p>
                  </div>
                  <div className="scopes-field">
                    <input id="read-scope" type="checkbox" defaultValue="read" />
                    <label htmlFor="read-scope">Read all: Full access to users’ information, including private
                      information</label>
                  </div>
                  <div className="scopes-field">
                    <input id="trade-scope" type="checkbox" defaultValue="trade" />
                    <label htmlFor="trade-scope">Trade: Buy and sell contracts on the users’ behalf</label>
                  </div>
                  <div className="scopes-field">
                    <input id="trading_information-scope" type="checkbox" defaultValue="trading_information" />
                    <label htmlFor="trading_information-scope">Trading information: View users’ trading
                      information, including balance information</label>
                  </div>
                  <div className="scopes-field mb-0">
                    <input id="payments-scope" type="checkbox" defaultValue="payments" />
                    <label htmlFor="payments-scope">Payments: Cashier (deposit and withdrawal)</label>
                  </div>
                </div>
                <div className="terms-of-conditions-register">
                  <span>By registering your application, you acknowledge that you’ve read and accepted the
                    Deriv API </span>
                  <a href="https://deriv.com/tnc/business-partners-api-user.pdf" target="_blank" rel="noreferrer">
                    <span>terms and conditions</span></a><span>.</span>
                </div>
                <button className="primary-btn-submit register-app-button" id="btnRegister"><span>Register new
                  application</span></button>
              </div>
            </div>
            <input type="hidden" id="app_id" name="app_id" defaultValue />
          </form>
          {/* add register_app_dialog dialog with success.svg and "Success!" title and two buttons white "Got it" button and red "Manage application" button */}
          <dialog open id="register_app_dialog" className="registration-dialog dialog-wrapper">
            <div className="dialog dialog-register">
              <div className="dialog-header">
                <img id="close_register_dialog" src="/img/close_dialog.svg" alt="Close" />
              </div>
              <div className="dialog-body dialog-body-register">
                <img className="dialog-success" src="/img/success.svg" alt="Success!" />
                <h3>Success!</h3>
                <div className="dialog-question">You have successfully registered your application. You can now start
                  using Deriv API</div>
              </div>
              <div className="dialog-footer">
                <button className="dialog-btn-cancel" id="register_got_it">Got it</button>
                <button className="dialog-btn-submit" id="register_app_manage">Manage application</button>
              </div>
            </div>
          </dialog>
        </div>
        <AppManagement />
      </div>
      <button id="logout" className="app-registration-signout gray-btn-submit">Sign out</button>
    </div>
  )
}
