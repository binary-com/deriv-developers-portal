import { useLocalStorage } from './useLocalStorage';
import styles from './Endpoint.module.scss';
import { useForm } from 'react-hook-form';

export default function EndPoint() {
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();

    const [server_url, setServerUrl] = useLocalStorage('server_url', 'https://blue.binaryws.com');
    const language: string = 'EN';
    const [app_id, setAppId] = useLocalStorage('app_id', '31063');
    const brand_name: string = 'deriv';

    const socket_url = `wss://${server_url}/websockets/v3?app_id=${app_id}&l=${language}&brand=${brand_name}`;

    return (
        <>
            <form>
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
                                value={server_url}
                                onChange={el => setServerUrl(el.target.value)}
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
                                value={app_id}
                                onChange={el => setAppId(el.target.value)}
                                placeholder='e.g. 9999'
                                required
                            />
                        </div>
                        {errors.app_id && <span className={styles.errorMessage}>{errors.app_id.message}</span>}
                        <div className={styles.url}>
                            <span className={styles.urlLabel}>Connected to :</span>{' '}
                            <div className={styles.urlId}> {socket_url}</div>
                        </div>
                        <div className={styles.buttons}>
                            <button
                                type='submit'
                                className={styles.submitButton}
                                onClick={() => {
                                    {
                                        el => {
                                            setServerUrl(el.target.value);
                                            setAppId(el.target.value);
                                        };
                                    }
                                }}
                            >
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
}
