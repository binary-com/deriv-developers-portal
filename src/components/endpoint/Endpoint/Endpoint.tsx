import React from 'react';
import styles from './Endpoint.module.scss';
import { useForm } from 'react-hook-form';
import { stateService } from '../../../state/stateSignal';
import { app_id, server_url, setAppId, setServerUrl, socket_url } from '../../../state/storageSignals';

const EndPoint = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({ mode: 'onChange' });

    const server_url_ui = server_url();
    const app_id_ui = app_id();
    const socket_url_ui = socket_url();

    const handleClick = data => {
        setAppId(data.app_id);
        setServerUrl(data.server_url);
        stateService.send('LOGOUT');
        sessionStorage.removeItem('token1');
        data.preventDefault();
    };

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit(handleClick)}>
                <div className={styles.pageContent}>
                    <div className={styles.header}>Change API endpoint</div>
                    <div className={styles.content}>
                        <div className={styles.customTextInput} id='custom-text-input'>
                            <div className={styles.inputField}>
                                <label className={styles.inlineLabel}>Server_URL</label>
                                <input
                                    {...register('server_url', {
                                        required: {
                                            value: true,
                                            message: 'Server is Required',
                                        },
                                        pattern: {
                                            value: /^([\w-]+\.)+[\w-]+(`[\w- ;,.\/?%&=])*?$/,
                                            message: 'Please enter a valid server URL',
                                        },
                                    })}
                                    name='server_url'
                                    defaultValue={server_url_ui}
                                    placeholder='e.g. frontend.binaryws.com'
                                    className={styles.textInput}
                                    required
                                />
                                {errors.server_url && (
                                    <span className={styles.erorMessage}>{errors.server_url?.message}</span>
                                )}
                            </div>
                            <div className={styles.inputField}>
                                <label className={styles.inlineLabel}>App_id</label>
                                <input
                                    {...register('app_id', {
                                        required: {
                                            value: true,
                                            message: 'App ID is required',
                                        },
                                        pattern: {
                                            value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                            message: 'Please enter a valid app ID',
                                        },
                                    })}
                                    name='app_id'
                                    className={styles.textInput}
                                    defaultValue={app_id_ui}
                                    placeholder='e.g. 9999'
                                    required
                                />
                                {errors.app_id && <span className={styles.errorMessage}>{errors.app_id?.message}</span>}
                            </div>
                        </div>
                        <div className={styles.url}>
                            <span className={styles.urlLabel}>Connected to :</span>{' '}
                            <div className={styles.urlId}> {socket_url_ui}</div>
                        </div>
                        <div className={styles.buttons}>
                            <button type='submit' className={styles.submitButton}>
                                Submit
                            </button>
                            <span style={{ marginLeft: '1.6rem' }} />
                            <button
                                type='button'
                                onClick={() => {
                                    localStorage.removeItem('app_id');
                                    localStorage.removeItem('server_url');
                                    localStorage.removeItem('socket_url');
                                    window.history.replaceState({}, document.title, window.location.pathname);
                                    stateService.send('LOGOUT');
                                    sessionStorage.removeItem('token1');
                                    location.replace('/app-registration/');
                                    window.location.reload();
                                }}
                                className={styles.resetButton}
                            >
                                Reset to original settings
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default EndPoint;
