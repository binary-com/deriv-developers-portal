import React from 'react';
import { useSelector } from '@xstate/react';
import { useForm } from 'react-hook-form';
import { useRegisterOrUpdateApp } from '../../../../custom-hooks/useRegisterOrUpdate';
import { isUpdateModeSelector, isRegisterTabIdleSelector } from '../../../../state/selectors';
import { stateService, updatingRow } from '../../../../state/stateSignal';
import { token1 } from '../../../../state/storageSignals';
import Button from '../../../global/Button/Button';
import styles from './AppRegistrationForm.module.scss';
import RegisterAppDialogError from './RegisterAppDialogError/RegisterAppDialogError';

interface FormData {
    api_token_input: string;
    app_name: string;
    app_markup_percentage: number;
    app_redirect_uri: string;
    app_verification_uri: string;
    read_scope: boolean;
    trade_scope: boolean;
    trading_information_scope: boolean;
    payments_scope: boolean;
    admin_scope: boolean;
}

export default function AppRegistrationForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
    } = useForm<FormData>({ mode: 'onBlur' });
    const { registerApp, isLoading, error } = useRegisterOrUpdateApp();
    const isUpdateMode: boolean = useSelector(stateService, isUpdateModeSelector);
    const isOnRegisterTab = useSelector(stateService, isRegisterTabIdleSelector);
    React.useEffect(() => {
        if (isOnRegisterTab) reset();
        if (isUpdateMode) {
            const { name, app_markup_percentage, redirect_uri, verification_uri, scopes } = updatingRow();
            setValue('api_token_input', token1());
            setValue('app_name', name);
            setValue('app_markup_percentage', app_markup_percentage);
            setValue('app_redirect_uri', redirect_uri);
            setValue('app_verification_uri', verification_uri);
            setValue('read_scope', scopes.includes('read') ? true : false);
            setValue('trade_scope', scopes.includes('trade') ? true : false);
            setValue('trading_information_scope', scopes.includes('trading_information') ? true : false);
            setValue('payments_scope', scopes.includes('payments') ? true : false);
            setValue('admin_scope', scopes.includes('admin') ? true : false);
        }
    }, [isUpdateMode, isOnRegisterTab]);

    const registerButtonMessage = isUpdateMode ? 'Update application' : 'Register as application';

    return (
        <React.Fragment>
            <form
                className={styles.frmNewApplication}
                id='frmNewApplication'
                onSubmit={handleSubmit(data => {
                    registerApp(data);
                })}
            >
                <div className={styles.formContent}>
                    <fieldset>
                        <div className={styles.formHeaderContainer}>
                            <h4 className={styles.registerFormHeader}>App information</h4>
                            <div className={styles.description}>
                                <span>Paste your API token with the admin scope here.</span>
                            </div>
                        </div>
                        <div className='api-token-wrapper'>
                            <div className={styles.customTextInput} id='custom-text-input'>
                                <input
                                    {...register('api_token_input', {
                                        required: {
                                            value: true,
                                            message:
                                                'Enter your API token (with the Admin scope) to register your app.',
                                        },
                                        maxLength: {
                                            value: 255,
                                            message: 'Your API token cannot exceed 255 characters.',
                                        },
                                    })}
                                    type='text'
                                    id='api_token_input'
                                    className={styles.apiTokenInput}
                                    readOnly={isUpdateMode}
                                    placeholder=' '
                                />
                                <label>API token (required)</label>
                            </div>
                            {errors.api_token_input && (
                                <span className='error-message'>{errors.api_token_input.message}</span>
                            )}
                            <div className='api-token-warning' />
                            <div className='first'>
                                <div className={styles.customTextInput} id='custom-text-input'>
                                    <input
                                        {...register('app_name', {
                                            required: {
                                                value: true,
                                                message: 'Enter your app name.',
                                            },
                                            maxLength: {
                                                value: 48,
                                                message: 'Your app name cannot exceed 48 characters.',
                                            },
                                        })}
                                        type='text'
                                        id='app_name'
                                        placeholder=' '
                                    />
                                    <label>App name (required)</label>
                                </div>
                                {errors.app_name && <span className='error-message'>{errors.app_name.message}</span>}
                            </div>
                        </div>
                    </fieldset>
                    <div className={styles.expandableForm}>
                        <fieldset>
                            <div className={styles.formHeaderContainer}>
                                <h4 className={styles.registerFormHeader}>Markup</h4>
                                <div className={styles.description}>
                                    <span>
                                        You can earn commission by adding a markup to the price of each trade. Enter
                                        your markup percentage here.
                                    </span>
                                </div>
                            </div>
                            <div className='input-container'>
                                <div>
                                    <div className={styles.customTextInput} id='custom-text-input'>
                                        <input
                                            {...register('app_markup_percentage', {
                                                required: {
                                                    value: true,
                                                    message: 'Enter a markup value.',
                                                },
                                                pattern: {
                                                    value: /^((([0-4]\.([0-9]([0-9])?)?))||([5]\.([0]([0])?)?)||([0-5]))$/,
                                                    message:
                                                        'Your markup value must be equal to or above 0.00 and no more than 5.00.',
                                                },
                                                maxLength: {
                                                    value: 4,
                                                    message: 'Your markup value cannot be more than 4 characters.',
                                                },
                                            })}
                                            type='number'
                                            step='0.01'
                                            id='app_markup_percentage'
                                            className='last'
                                            placeholder=' '
                                            // eslint-disable-next-line
                                            onWheel={(e: any) => e.target.blur()}
                                        />
                                        <label>Markup percentage (required)</label>
                                    </div>
                                    <p className={styles.helperText}>
                                        If you don’t want to earn a markup, enter 0 here. Otherwise, enter a number up
                                        to 5. Maximum: 5.00%.
                                    </p>
                                    {errors.app_markup_percentage && (
                                        <span className='error-message'>{errors.app_markup_percentage.message}</span>
                                    )}
                                </div>
                            </div>
                            <div className={styles.formHeaderContainer}>
                                <h4 className={styles.registerFormHeader}>OAuth details</h4>
                                <div className={styles.description}>
                                    <span>
                                        This allows clients to log in to your app using their Deriv accounts without an
                                        API token.
                                    </span>
                                </div>
                            </div>
                            <div className='input-container'>
                                <div className={styles.customTextInput} id='custom-text-input'>
                                    <input
                                        {...register('app_redirect_uri', {
                                            required: {
                                                value: true,
                                                message: 'Enter your authorisation URL.',
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: 'Your website URL cannot exceed 255 characters.',
                                            },
                                            pattern: {
                                                value: /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/,
                                                message: 'Enter a valid URL. (Example: https://www.[yourname].com)',
                                            },
                                        })}
                                        id='app_redirect_uri'
                                        type='text'
                                        placeholder=' '
                                    />
                                    <label>Authorisation URL (required)</label>
                                </div>
                                <p className={styles.helperText}>
                                    *Please note that this URL will be used as the OAuth redirect URL for the OAuth
                                    authorisation.
                                </p>
                            </div>
                            {errors.app_redirect_uri && (
                                <span className='error-message'>{errors.app_redirect_uri.message}</span>
                            )}
                            <div className='input-container'>
                                <div className={styles.customTextInput} id='custom-text-input'>
                                    <input
                                        {...register('app_verification_uri', {
                                            required: {
                                                value: true,
                                                message: 'Enter a URL.',
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: 'Your verification URL cannot exceed 255 characters.',
                                            },
                                            pattern: {
                                                value: /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/,
                                                message: 'Enter a valid URL. (Example: https://www.[yourname].com)',
                                            },
                                        })}
                                        id='app_verification_uri'
                                        type='text'
                                        placeholder=' '
                                    />
                                    <label>Verification URL (required)</label>
                                </div>
                            </div>
                            {errors.app_verification_uri && (
                                <span className='error-message'>{errors.app_verification_uri.message}</span>
                            )}
                        </fieldset>
                        <div className={styles.scopes} id='register_scopes'>
                            <div>
                                <div className={styles.formHeaderContainer}>
                                    <h4 className={styles.registerFormHeader}>Scope of authorisation</h4>
                                    <div className={styles.description}>
                                        <span>Select the scope for your app:</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.scopesField}>
                                <div className={styles.customCheckboxContainer}>
                                    <input {...register('read_scope')} id='read-scope' type='checkbox' />
                                    <span className={styles.customCheckbox} />
                                </div>
                                <label htmlFor='read-scope'>
                                    <b>Read</b>: You’ll have full access to your clients’ information.
                                </label>
                            </div>
                            <div className={styles.scopesField}>
                                <div className={styles.customCheckboxContainer}>
                                    <input {...register('trade_scope')} id='trade-scope' type='checkbox' />
                                    <span className={styles.customCheckbox} />
                                </div>
                                <label htmlFor='trade-scope'>
                                    <b>Trade</b>: You’ll be able to buy and sell contracts on your clients’ behalf.
                                </label>
                            </div>
                            <div className={styles.scopesField}>
                                <div className={styles.customCheckboxContainer}>
                                    <input
                                        {...register('trading_information_scope')}
                                        id='trading_information-scope'
                                        type='checkbox'
                                    />
                                    <span className={styles.customCheckbox} />
                                </div>
                                <label htmlFor='trading_information-scope'>
                                    <b>Trading information</b>: You’ll be able to view your clients’ trading
                                    information, including their account balance.
                                </label>
                            </div>
                            <div className={styles.scopesField}>
                                <div className={styles.customCheckboxContainer}>
                                    <input {...register('payments_scope')} id='payments-scope' type='checkbox' />
                                    <span className={styles.customCheckbox} />
                                </div>
                                <label htmlFor='payments-scope'>
                                    <b>Payments</b>: You’ll be able to perform deposits and withdrawals on your clients’
                                    behalf.
                                </label>
                            </div>
                            <div className={`${styles.scopesField} mb-0`}>
                                <div className={styles.customCheckboxContainer}>
                                    <input {...register('admin_scope')} id='admin-scope' type='checkbox' />
                                    <span className={styles.customCheckbox} />
                                </div>
                                <label htmlFor='admin-scope'>
                                    <b>Admin</b>: Full account access, including the access to manage security tokens.
                                </label>
                            </div>
                        </div>
                        {errors.admin_scope && <span className='error-message'>{errors.admin_scope.message}</span>}
                        <div className={styles.termsOfConditionRegister}>
                            <span>
                                By registering your application, you acknowledge that you’ve read and accepted the Deriv
                                API{' '}
                            </span>
                            <a
                                href='https://deriv.com/tnc/business-partners-api-user.pdf'
                                target='_blank'
                                rel='noreferrer'
                            >
                                <span>terms and conditions</span>
                            </a>
                            <span>.</span>
                        </div>
                        <div className={styles.registerAppButtonContainer}>
                            <React.Fragment>
                                {isUpdateMode && (
                                    <Button type='secondary' onClick={() => stateService.send('REGISTER_TOGGLE_TAB')}>
                                        Cancel
                                    </Button>
                                )}
                                <Button disabled={isLoading || Object.keys(errors)?.length > 0}>
                                    {registerButtonMessage}
                                </Button>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
                <input type='hidden' id='app_id' name='app_id' />
            </form>
            <RegisterAppDialogError error={error} />
        </React.Fragment>
    );
}
