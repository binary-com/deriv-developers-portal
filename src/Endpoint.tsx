import { app_id, server_url } from './storageSignals';
import styles from './Endpoint.module.scss';
import { useForm } from 'react-hook-form';

interface EndpointData {
    app_id: number;
    server_url: string;
}

export default function EndPoint() {
    console.log('Value: ', app_id(), server_url());
    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm<EndpointData>();

    const params = new URLSearchParams(window.location.search);

    setValue('app_id', app_id());
    setValue('server_url', server_url());

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
                                defaultValue={server_url}
                                placeholder='e.g. frontend.binaryws.com'
                                className={styles.textInput}
                                required
                            />
                            {errors.server_url && (
                                <span className={styles.errorMessage}>{errors.server_url.message}</span>
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
                                defaultValue={app_id}
                                placeholder='e.g. 9999'
                                onClick={() => {
                                    if (server_url) localStorage.setItem('server_url', server_url);
                                    if (app_id && !isNaN(app_id)) localStorage.setItem('app_id', app_id);
                                }}
                                required
                            />
                        </div>
                        {errors.app_id && <span className={styles.errorMessage}>{errors.app_id.message}</span>}

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
