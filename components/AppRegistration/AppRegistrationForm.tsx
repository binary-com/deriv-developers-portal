import { useForm } from 'react-hook-form';
import styles from './AppRegistrationForm.module.scss';

type FormData = {
    api_token_input: string;
    app_name: string;
    app_markup_percentage: number;
    app_redirect_uri: string;
    app_verification_uri: string;
    read_scope: string;
    trade_scope: string;
    trading_information_scope: string;
    payments_scope: string;
}

export default function AppRegistrationForm () {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>();

    return (
        <form id="frmNewApplication" onSubmit={handleSubmit((data) => {console.log(data)} )}>
            <div className={styles.formContent}>
                <fieldset>
                    <div className={styles.formHeaderContainer}>
                        <h4 className={styles.registerFormHeader}>General information</h4>
                        <div className={styles.infoIcon}>
                            <div className={styles.tooltip}>
                                Please create your API token
                                <a href="https://app.deriv.com/account/api-token" className={styles.tooltipLink}>here</a>, and
                                copy it into this field.
                            </div>
                            <div className={styles.infoIconImage} />
                        </div>
                    </div>
                    <div className="api-token-wrapper">
                        <div className={styles.customTextInput} id="custom-text-input">
                            <input {...register("api_token_input", { required: true })} type="text" id="api_token_input" className={styles.apiTokenInput} placeholder=" " />
                            {errors.api_token_input && <span className={styles.errorMessage}>API token is required. wat dis?</span>}
                            <label>API token (Required)</label>
                        </div>
                        <div className="api-token-warning" />
                        <div className="first">
                            <div className={styles.customTextInput} id="custom-text-input">
                                <input {...register("app_name")} type="text" id="app_name" placeholder=" " />
                                <label>App name (Required)</label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className={styles.expandForm}>
                    <input id="expand_form" className={styles.expandFormCheckbox} type="checkbox" autoComplete="off" />
                    <label htmlFor="admin-scope">I'd like to use OAuth or monetise my app</label>
                </div>
                <div className={styles.expandableForm}>
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
                                    <input {...register("app_markup_percentage", { required: true, valueAsNumber: true, maxLength: { value: 4, message:" Too Many Characters"} })} max="4" type="number" id="app_markup_percentage" className="last" placeholder=" " />
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
                                <input {...register("app_redirect_uri")} id="app_redirect_uri" type="text" placeholder=" " />
                                <label>Website URL</label>
                            </div>
                            <p className="helper-text">*Please note that this URL will be used as the OAuth redirect
                                URL for the OAuth authorisation</p>
                        </div>
                        <div className="input-container">
                            <div className="custom-text-input" id="custom-text-input">
                                <input {...register("app_verification_uri")} id="app_verification_uri" type="text" placeholder=" " />
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
                            <input {...register("read_scope")} id="read-scope" type="checkbox" defaultValue="read" />
                            <label htmlFor="read-scope">Read all: Full access to users’ information, including private
                                information</label>
                        </div>
                        <div className="scopes-field">
                            <input {...register("trade_scope")} id="trade-scope" type="checkbox" defaultValue="trade" />
                            <label htmlFor="trade-scope">Trade: Buy and sell contracts on the users’ behalf</label>
                        </div>
                        <div className="scopes-field">
                            <input {...register("trading_information_scope")} id="trading_information-scope" type="checkbox" defaultValue="trading_information" />
                            <label htmlFor="trading_information-scope">Trading information: View users’ trading
                                information, including balance information</label>
                        </div>
                        <div className="scopes-field mb-0">
                            <input {...register("payments_scope")} id="payments-scope" type="checkbox" defaultValue="payments" />
                            <label htmlFor="payments-scope">Payments: Cashier (deposit and withdrawal)</label>
                        </div>
                    </div>
                    <div className="terms-of-conditions-register">
                        <span>By registering your application, you acknowledge that you’ve read and accepted the
                        Deriv API </span>
                        <a href="https://deriv.com/tnc/business-partners-api-user.pdf" target="_blank" rel="noreferrer">
                            <span>terms and conditions</span>
                        </a>
                        <span>.</span>
                    </div>
                    <input type="submit" value="Register new application" className={`${styles.registerAppButton} primary-btn-submit`} id="btnRegister" />
                </div>
            </div>
            <input type="hidden" id="app_id" name="app_id" />
        </form>
    )
}
