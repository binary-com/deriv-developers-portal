import { useEffect, useRef, useState, useCallback } from 'react';
import { createSignal } from 'solid-js';
import { useLocation } from 'react-router-dom';
import SchemaWrapper from '../Schema/SchemaWrapper';
import SchemaTitle from '../Schema/SchemaTitle';
import RequestJSONBox from './RequestJSONBox/RequestJSONBox';
import TokenInputField from './TokenInputField/TokenInputField';
import SelectRequestInput from './SelectRequestInput/SelectRequestInput';
import { isDisplayAuthDoc, isDisplaySelectedDoc, send } from '../../../state/stateSignal';
import { api, generateDerivApiInstance } from '../../../global-functions/appid';
import { playground_requests } from '../../../data-stores/playground_requests';
import { data_get_api_token } from '../../../data-stores/data-app-registration';
import { ticksSubject } from '../../../global-functions/ticksSubject';
import styles from './PlaygroundComponent.module.scss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

export const PlaygroundComponent = () => {
    const DEFAULT_VALUE = 'Select API Call - Version 3';
    const [current_api, setCurrentAPI] = useState(api);
    const [is_initial_socket, setIsInitialSocket] = useState(true);
    const [messages, setMessages] = useState([]);
    const [messagesSignal, setMessagesSignal] = createSignal([]);
    const request_input = useRef(null);
    const [request_info, setRequestInfo] = useState({});
    const [response_info, setResponseInfo] = useState({});
    const [scroll_direction, setScrollDirection] = useState('down');
    const [text_data, setTextData] = useState({
        request: '',
        selected_value: DEFAULT_VALUE,
        token: '',
    });
    const [selected, setSelected] = useState(DEFAULT_VALUE);
    const location = useLocation();
    const history = createBrowserHistory();

    // Reset playground state when unmounting the component.
    useEffect(() => {
        return () => {
            send('EMPTY_TOKEN');
        };
    }, []);

    // add/remove event listeners on component mount/unmount
    useEffect(() => {
        // mounting
        document.addEventListener('visibilitychange', documentVisibility);
        // unmounting
        return () => document.removeEventListener('visibilitychange', documentVisibility);
    }, []);

    // If the user switches to a different tab, it will trigger the visibility state.
    const documentVisibility = () => {
        // If the visibility state is hidden, we will close the API.
        if (document.visibilityState === 'hidden') {
            current_api.connection.close();
            ticksSubject.complete();
            setScrollDirection('down');
        }
        // When we switch back to the main window, initiate a new API call.
        setCurrentAPI(api);
    };

    // Dynamically import JSON to update the select value of the playground dropdown.
    useEffect(() => {
        const hash_value = window.location.hash.split('#')[1];
        const request_body = playground_requests.find(el => el.name === hash_value);
        const is_not_placeholder = text_data.selected_value === request_body?.name;
        if (is_not_placeholder) dynamicImportJSON(text_data.selected_value);
    }, [text_data.selected_value]);

    // We need to dynamically import new data when the user selects a function
    // through the link hash.
    useEffect(() => {
        const hash_value = window.location.hash.split('#')[1];
        if (hash_value) {
            dynamicImportJSON(hash_value);
            send('SELECT_API');
        }
    }, [window.location.hash]);

    // A new data object has to be created if the user updates the link hash,
    // This way, new data will be displayed in the UI.
    useEffect(() => {
        if (window.location.hash) {
            const hash_value = window.location.hash.split('#')[1];
            const find_select_value = playground_requests.find(el => el.name === hash_value);
            const hash_text_data = {
                ...text_data,
                request: JSON.stringify(find_select_value?.body, null, 2),
                selected_value: find_select_value?.title,
            };
            setTextData(hash_text_data);
        }
    }, [window.location.hash, playground_requests]);

    const dynamicImportJSON = useCallback(
        selected_value => {
            import(`../../../../config/v3/${selected_value}/send.json`)
                .then(data => {
                    setRequestInfo(data);
                })
                .catch(error => {
                    // eslint-disable-next-line
                    console.log(error);
                });
            import(`../../../../config/v3/${selected_value}/receive.json`)
                .then(data => {
                    setResponseInfo(data);
                })
                .catch(error => {
                    // eslint-disable-next-line
                    console.log(error);
                });
        },
        [setRequestInfo, setResponseInfo]
    );

    const displayAuthDoc = () => dynamicImportJSON('authorize');

    const sendRequest = useCallback(() => {
        if (!request_input.current?.value && text_data.selected_value === DEFAULT_VALUE) {
            alert('Invalid JSON!');
            return;
        }
        let _request;
        try {
            _request = request_input.current?.value && JSON.parse(request_input.current?.value);
        } catch (error) {
            alert('Invalid JSON!');
            return;
        }

        const is_current_api_ready = current_api.connection.readyState === 1;
        const subscribed_tick_history = _request.ticks_history && _request.subscribe === 1;
        let relevant_api = current_api;
        if (!is_current_api_ready && is_initial_socket) {
            relevant_api = generateDerivApiInstance();
            setIsInitialSocket(false);
        } else if (current_api.connection.readyState !== 1 && !is_initial_socket) {
            relevant_api = generateDerivApiInstance();
            setIsInitialSocket(true);
        }
        if (_request.ticks || subscribed_tick_history) {
            ticksSubject.next(_request);
            ticksSubject.subscribe({
                next: res => {
                    setMessagesSignal([
                        ...messagesSignal(),
                        { body: _request, type: 'req' },
                        { body: res, type: 'res' },
                    ]);
                    setMessages(messagesSignal());
                },
                error: err => {
                    setMessages([...messages, { body: _request, type: 'req' }, { body: err, type: 'err' }]);
                },
            });
        }
        if (_request && !_request.ticks) {
            relevant_api
                .send(_request)
                .then(res => {
                    setMessages([...messages, { body: _request, type: 'req' }, { body: res, type: 'res' }]);
                })
                .catch(err => {
                    setMessages([...messages, { body: _request, type: 'req' }, { body: err, type: 'err' }]);
                });
        }
        setCurrentAPI(relevant_api);
    }, [current_api, request_input, messages, is_initial_socket, text_data]);

    const handleAuthenticateClick = useCallback(
        inserted_token => {
            const new_text_data = {
                token: inserted_token,
                selected_value: 'authorize',
                request: JSON.stringify({ authorize: inserted_token }, null, 2),
            };
            const old_text_data = { ...text_data };
            Promise.resolve(setTextData({ ...new_text_data })).then(() => {
                sendRequest();
                if (isDisplaySelectedDoc()) setTextData(old_text_data);
            });
            send('CLICK_AUTHENTICATE');
            if (isDisplayAuthDoc()) displayAuthDoc();
        },
        [setTextData, sendRequest]
    );

    const handleSelectChange = useCallback(
        (event, name) => {
            event.preventDefault();
            history.push(`${location.pathname}#${name}`);
            const request_body = playground_requests.find(el => el.name === event.currentTarget.value);
            const new_text_data = {
                ...text_data,
                selected_value: event.currentTarget.value,
                request: JSON.stringify(request_body?.body, null, 4),
            };
            setTextData({ ...new_text_data });
            send('SELECT_API');
        },
        [text_data]
    );

    const handleTextAreaInput = useCallback(e => setTextData({ ...text_data, request: e.target.value }), [text_data]);

    const json_box_props = {
        current_api,
        sendRequest,
        messages,
        setMessages,
        request_example: text_data.request,
        handleChange: handleTextAreaInput,
        request_input,
        setScrollDirection,
        scroll_direction,
    };

    return (
        <div className={styles.playgroundPageWrapper}>
            <div className={styles.playgroundApiJson}>
                <SelectRequestInput
                    selected_value={text_data.selected_value}
                    handleChange={handleSelectChange}
                    selected={selected}
                    setSelected={setSelected}
                />
                <div className={styles.apiToken}>
                    <TokenInputField sendTokenToJSON={handleAuthenticateClick} token={text_data.token} />
                    <div />
                    <div className={styles.cta}>
                        <SchemaTitle headerSize='h3' className={styles.title}>
                            {data_get_api_token.textFocus}
                        </SchemaTitle>
                        <div className={styles['cta-button']}>{data_get_api_token.button}</div>
                    </div>
                </div>
                <RequestJSONBox {...json_box_props} />
            </div>
            <div id='playground' data-testid='playgroundDocs' className={styles.playgroundApiDocs}>
                <div className={styles.playgroundReqSchema}>
                    <SchemaWrapper info={request_info} />
                </div>
                <div className={styles.playgroundResSchema}>
                    <SchemaWrapper info={response_info} />
                </div>
            </div>
        </div>
    );
};
