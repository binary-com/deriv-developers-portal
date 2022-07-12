import styles from './Endpoint.module.scss';
import { useForm } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import { app_id, server_url, setAppId, setServerUrl } from './storageSignals';

const EndPoint = () => {
    const {
        register,
        formState: { errors },
    } = useForm({ mode: 'onSubmit' });

    const inputServerRef = useRef();
    const inputAppRef = useRef();
    const language = 'EN';
    const brand_name = 'deriv';
    const server_url_ui = server_url();
    const app_id_ui = app_id();
    const socket_url = `wss://${server_url()}/websockets/v3?app_id=${app_id()}&l=${language}&brand=${brand_name}`;

    const handleClick = () => {
        const updatedAppId = inputAppRef.current.value;
        const updatedServerUrl = inputServerRef.current.value;
        setAppId(updatedAppId);
        setServerUrl(updatedServerUrl);
    };

    useEffect(() => {
        // window.location.reload();
    }, []);

    return (
        <>
            <form onSubmit={handleClick}>
                <div className={styles.pageContent}>
                    <div className={styles.header}>Change API endpoint</div>
                    <div className={styles.content}>
                        <div className={styles.customTextInput} id='custom-text-input'>
                            <div className={styles.inlineLabel}>Server_URL</div>
                            <input
                                {...register('server_url', {
                                    required: {
                                        value: true,
                                        message: 'Server is Required',
                                    },
                                })}
                                name='server_url'
                                defaultValue={server_url_ui}
                                ref={inputServerRef}
                                placeholder='e.g. frontend.binaryws.com'
                                className={styles.textInput}
                                required
                            />
                            {errors.server_url && (
                                <span className={styles.errorMessage}>{errors.socket_url.message}</span>
                            )}
                            <div className={styles.inlineLabel}>App_id</div>
                            <input
                                {...register('app_id', {
                                    required: {
                                        value: true,
                                        message: 'App ID is required',
                                    },
                                    pattern: {
                                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                                        message: 'Only Numbers Allowed',
                                    },
                                })}
                                name='app_id'
                                className={styles.textInput}
                                id='app_id'
                                defaultValue={app_id_ui}
                                placeholder='e.g. 9999'
                                ref={inputAppRef}
                                required
                            />
                        </div>
                        {errors.app_id && <span className={styles.errorMessage}>{errors.app_id.message}</span>}
                        <div className={styles.url}>
                            <span className={styles.urlLabel}>Connected to :</span>{' '}
                            <div className={styles.urlId}> {socket_url}</div>
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
        </>
    );
};

export default EndPoint;
