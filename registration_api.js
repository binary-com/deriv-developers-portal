const { createMachine, actions, interpret, assign } = XState;

const appRegistrationMachine = createMachine({
    id: "register_api",
    initial: "logged_out",
    states: {
        logged_out: {
            id: "logged_out",
            on: {
                LOGIN: "#logged_in",
            },
        },
        logged_in: {
            id: "logged_in",
            initial: "register_tab",
            on: {
                LOGOUT: "#logged_out",
                MANAGE_TOGGLE_TAB: "#manage_tab",
            },
            states: {
                register_tab: {
                    id: "register_tab",
                    initial: "folded_form",
                    on: {
                        LOGOUT: "#logged_out",
                        TOGGLE_FORM: "#unfolded_form",
                        MANAGE_TOGGLE_TAB: "#manage_tab",
                    },
                    states: {
                        folded_form: {
                            id: "folded_form",
                            on: {
                                TOGGLE_FORM: "#unfolded_form",
                            },
                        },
                        unfolded_form: {
                            id: "unfolded_form",
                            on: {
                                TOGGLE_FORM: "#folded_form",
                                SUBMIT_REGISTRATION: "#submitting_registration",
                            },
                            states: {
                                submitting_registration: {
                                    id: "submitting_registration",
                                    initial: "loading_registration",
                                    states: {
                                        loading_registration: {
                                            id: "loading_registration",
                                            invoke: {
                                                src: async (_, event) => await registerApp(event.data),
                                                onDone: {
                                                    target: "#registration_success",
                                                },
                                                onError: {
                                                    target: "#registration_error",
                                                },
                                            },
                                        },
                                        registration_success: {
                                            id: "registration_success",
                                        },
                                        registration_error: {
                                            id: "registration_error",
                                        },
                                    },
                                },
                            }
                        },
                    },
                },
                manage_tab: {
                    id: "manage_tab",
                    initial: "loadingApps",
                    on: {
                        REGISTER_TOGGLE_TAB: "#register_tab",
                        FETCH_APP_LIST: "#loadingApps",
                        DELETE_APP: "#deletingApp",
                        UPDATE_APP: "#updateApp",
                    },
                    states: {
                        loadingApps: {
                            id: "loadingApps",
                            initial: 'loading',
                            states: {
                                loading: {
                                    invoke: {
                                        src: async () => await getAppList(),
                                        onDone: {
                                            target: "#successLoadingApps",
                                        },
                                        onError: {
                                            target: "#errorLoadingApps",
                                        },
                                    },
                                },
                                success: {
                                    id: "successLoadingApps",
                                    on: {
                                        REFETCH: "#loadingApps",
                                    },
                                },
                                error: {
                                    id: "errorLoadingApps",
                                    on: {
                                        RETRY: "#loadingApps",
                                    },
                                },
                            },
                        },
                        deletingApp: {
                            id: "deletingApp",
                            initial: "loadingDelete",
                            states: {
                                loadingDelete: {
                                    id: "loadingDelete",
                                    invoke: {
                                        // get the app id from the event
                                        src: async (_, event) => {
                                            await removeApp(event.data);
                                        },
                                        onDone: {
                                            target: "#successDelete",
                                        },
                                        onError: {
                                            target: "#errorDelete",
                                        },
                                    },
                                },
                                successDelete: {
                                    id: "successDelete",
                                    on: {
                                        REFETCH: "#loadingDelete",
                                    },
                                },
                                errorDelete: {
                                    id: "errorDelete",
                                    on: {
                                        RETRY: "#loadingDelete",
                                    },
                                },
                            },
                        },
                        updateApp: {
                            id: "updateApp",
                            initial: "loadingUpdate",
                            states: {
                                loadingUpdate: {
                                    id: "loadingUpdate",
                                    invoke: {
                                        src: async (_, event) => {
                                            await appUpdate(event.data)
                                        },
                                        onDone: {
                                            target: "#successUpdate",
                                        },
                                        onError: {
                                            target: "#errorUpdate",
                                        },
                                    },
                                },
                                successUpdate: {
                                    id: "successUpdate",
                                    on: {
                                        REFETCH: "#loadingUpdate",
                                    },
                                },
                                errorUpdate: {
                                    id: "errorUpdate",
                                    on: {
                                        RETRY: "#loadingUpdate",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
});

const isStorageSupported = storage => {
    if (typeof storage === 'undefined') {
        return false;
    }
    const test_key = 'test';
    try {
        storage.setItem(test_key, '1');
        storage.removeItem(test_key);
        return true;
    } catch (e) {
        return false;
    }
};

const redirectToLogin = (is_logged_in, language, has_params = true, redirect_delay = 0) => {
    if (!is_logged_in && isStorageSupported(sessionStorage)) {
        const l = window.location;
        const redirect_url = has_params ? window.location.href : `${l.protocol}//${l.host}${l.pathname}`;
        sessionStorage.setItem('redirect_url', redirect_url);
        setTimeout(() => {
            window.location.href = loginUrl({ language });
        }, redirect_delay);
    }
};

const getObject = function (key) {
    return JSON.parse(this.getItem(key) || '{}');
};

const setObject = function (key, value) {
    if (value && value instanceof Object) {
        try {
            this.setItem(key, JSON.stringify(value));
        } catch (e) {
            /* do nothing */
        }
    }
};

const Store = function (storage) {
    this.storage = storage;
    this.storage.getObject = getObject;
    this.storage.setObject = setObject;
};

Store.prototype = {
    get(key) {
        return this.storage.getItem(key) || undefined;
    },
    set(key, value) {
        if (typeof value !== 'undefined') {
            this.storage.setItem(key, value);
        }
    },
    getObject(key) {
        return typeof this.storage.getObject === 'function' // Prevent runtime error in IE
            ? this.storage.getObject(key)
            : JSON.parse(this.storage.getItem(key) || '{}');
    },
    setObject(key, value) {
        if (typeof this.storage.setObject === 'function') {
            // Prevent runtime error in IE
            this.storage.setObject(key, value);
        } else {
            this.storage.setItem(key, JSON.stringify(value));
        }
    },
    remove(key) {
        this.storage.removeItem(key);
    },
    clear() {
        this.storage.clear();
    },
};

const InScriptStore = function (object) {
    this.store = typeof object !== 'undefined' ? object : {};
};

InScriptStore.prototype = {
    get(key) {
        return getPropertyValue(this.store, key);
    },
    set(k, value, obj = this.store) {
        let key = k;
        if (!Array.isArray(key)) key = [key];
        if (key.length > 1) {
            if (!(key[0] in obj) || isEmptyObject(obj[key[0]])) obj[key[0]] = {};
            this.set(key.slice(1), value, obj[key[0]]);
        } else {
            obj[key[0]] = value;
        }
    },
    getObject(key) {
        return JSON.parse(this.get(key) || '{}');
    },
    setObject(key, value) {
        this.set(key, JSON.stringify(value));
    },
    remove(...keys) {
        keys.forEach(key => {
            delete this.store[key];
        });
    },
    clear() {
        this.store = {};
    },
    has(key) {
        return this.get(key) !== undefined;
    },
    keys() {
        return Object.keys(this.store);
    },
    call(key) {
        if (typeof this.get(key) === 'function') this.get(key)();
    },
};

const LocalStore = isStorageSupported(window.localStorage)
    ? new Store(window.localStorage)
    : new InScriptStore();

const CookieStorage = function (cookie_name) {
    this.initialized = false;
    this.cookie_name = cookie_name;
    this.domain = 'api.deriv.com';
    this.path = '/';
    this.expires = new Date('Thu, 1 Jan 2037 12:00:00 GMT');
    this.value = {};
};

CookieStorage.prototype = {
    read() {
        const cookie_value = Cookies.get(this.cookie_name);
        try {
            this.value = cookie_value ? JSON.parse(cookie_value) : {};
        } catch (e) {
            this.value = {};
        }
        this.initialized = true;
    },
    write(val, expireDate, isSecure) {
        if (!this.initialized) this.read();
        this.value = val;
        if (expireDate) this.expires = expireDate;
        Cookies.set(this.cookie_name, this.value, {
            expires: this.expires,
            path: this.path,
            domain: this.domain,
            secure: !!isSecure,
        });
    },
    get(key) {
        if (!this.initialized) this.read();
        return this.value[key];
    },
    set(key, val) {
        if (!this.initialized) this.read();
        this.value[key] = val;
        Cookies.set(this.cookie_name, this.value, {
            expires: new Date(this.expires),
            path: this.path,
            domain: this.domain,
        });
    },
    remove() {
        Cookies.remove(this.cookie_name, {
            path: this.path,
            domain: this.domain,
        });
    },
};

const appId = () => window.localStorage.getItem("config.app_id");


const loginUrl = ({ language }) => {
    const server_url = LocalStore.get('config.server_url');
    const signup_device_cookie = new CookieStorage('signup_device');
    const signup_device = signup_device_cookie.get('signup_device');
    const date_first_contact_cookie = new CookieStorage('date_first_contact');
    const date_first_contact = date_first_contact_cookie.get('date_first_contact');
    const marketing_queries = `${signup_device ? `&signup_device=${signup_device}` : ''}${date_first_contact ? `&date_first_contact=${date_first_contact}` : ''
        }`;
    const getOAuthUrl = () => {
        return `https://oauth.deriv.com/oauth2/authorize?app_id=${appId()}&l=${language}${marketing_queries}&brand=deriv`;
    };

    if (server_url && /qa/.test(server_url)) {
        return `https://${server_url}/oauth2/authorize?app_id=${appId()}&l=${language}${marketing_queries}&brand=deriv`;
    }

    if (window.localStorage.getItem("config.app_id") === 11780) {
        return getOAuthUrl();
    }
    return new URL(getOAuthUrl()).href;
};

let sessionState = sessionStorage.getItem('app_registration_state') || 'logged_out';
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token1');
if (token) {
    sessionStorage.setItem('token1', token);
    sessionStorage.setItem('app_registration_state', 'logged_in');
    sessionState = 'logged_in';
}

function activate(state) {
    const joinedState = state.toStrings().join(' ');
    const elApp = document.getElementById('app-registration-machine');
    const form_checkbox = document.getElementById('expand_form');
    const is_folded_state = joinedState === 'logged_in logged_in.register_tab logged_in.register_tab.folded_form';
    if (elApp) {
        elApp.dataset.state = joinedState;
        elApp.setAttribute("data-state", joinedState);
    }
    if (is_folded_state) {
        if (form_checkbox) form_checkbox.checked = false;
    } else {
        if (form_checkbox) form_checkbox.checked = true;
    }
}

const interpreter = XState
    .interpret(appRegistrationMachine)
    .onTransition(activate)
    .start(sessionState);

const { send } = interpreter;

const unfolded_form_checkbox = document.getElementById('expand_form');
if (unfolded_form_checkbox) {
    unfolded_form_checkbox.addEventListener('change', () => {
        send({
            "type": "TOGGLE_FORM"
        });
    });
}

const register_button = document.getElementById('register_button');
if (register_button) {
    register_button.addEventListener('click', () => {
        send({
            "type": "REGISTER_TOGGLE_TAB"
        });
    });
}

const manage_button = document.getElementById('manage_button');
if (manage_button) {
    manage_button.addEventListener('click', () => {
        send({
            "type": "MANAGE_TOGGLE_TAB"
        });
    });
}

const logout_button = document.getElementById('logout_button');
if (logout_button) {
    logout_button.addEventListener('click', () => {
        send({
            "type": "LOGOUT"
        });
    });
}

const registerLoginButton = document.getElementById('registerLogin');
if (registerLoginButton) {
    registerLoginButton.addEventListener('click', () => {
        redirectToLogin(false, 'EN');
    });
};

const getAppList = async () => {
    const api = new DerivAPIBasic({ endpoint: 'qa10.deriv.dev', lang: 'EN', app_id: 1016 });
    const token1 = sessionStorage.getItem('token1');
    await api.authorize(token1);
    const get_data = await api.appList();
    const app_list = get_data.app_list;
    const app_list_body = document.getElementById('app_list');
    while (app_list_body.firstChild) {
        app_list_body.removeChild(app_list_body.firstChild);
    }
    app_list.forEach((app) => {

        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${app.name}</td>
                        <td>${app.app_id}</td>
                        <td>${app.scopes.join(', ')}</td>
                        <td>${app.redirect_uri}</td>
                        <td>
                            <button class="app-update-btn" onclick="open_update_dialog(${app.app_id}, '${app.name}', '${app.scopes.join(', ')}', '${app.redirect_uri}' )">Update</button>
                        </td>
                        <td>
                            <button class="app-remove-btn" onclick="open_delete_dialog(${app.app_id})">Remove</button>
                        </td>
                        `;
        app_list_body.appendChild(tr);
    });
}

const removeApp = async (app_id) => {
    const api = new DerivAPIBasic({ endpoint: 'qa10.deriv.dev', lang: 'EN', app_id: 1016 });
    const token1 = sessionStorage.getItem('token1');
    await api.authorize(token1);
    await api.appDelete(app_id);
    send({ type: 'FETCH_APP_LIST' });
}

const appUpdate = async ({ app_id, name, redirect_uri, scopes }) => {
    const api = new DerivAPIBasic({ endpoint: 'qa10.deriv.dev', lang: 'EN', app_id: 1016 });
    const token1 = sessionStorage.getItem('token1');
    await api.authorize(token1);
    await api.appUpdate({ app_update: app_id, name, redirect_uri, scopes });
    send({ type: 'FETCH_APP_LIST' });
};

const open_delete_dialog = (app_id) => {
    const dialog = document.getElementById('delete_app_dialog');
    dialog.showModal();
    const delete_app_button = document.getElementById('delete_app_button');
    delete_app_button.addEventListener('click', () => {
        send({ type: "DELETE_APP", data: app_id });
        dialog.close();
    });
}

const open_update_dialog = (app_id, name, scopes, redirect_uri) => {
    const dialog = document.getElementById('update_app_dialog');
    dialog.showModal();
    const update_name = document.getElementById('update_app_name');
    update_name.value = name;
    const update_redirect_uri = document.getElementById('update_app_redirect_uri');
    update_redirect_uri.value = redirect_uri;
    const update_app_button = document.getElementById('update_app_button');

    const update_read_scope = document.getElementById('update_read-scope');
    if (scopes.includes('read')) {
        update_read_scope.checked = true;
    }
    const update_trade_scope = document.getElementById('update_trade-scope');
    if (scopes.includes('trade')) {
        update_trade_scope.checked = true;
    }
    const update_trading_information_scope = document.getElementById('update_trading_information-scope');
    if (scopes.includes('trading_information')) {
        update_trading_information_scope.checked = true;
    }
    const update_payments_scope = document.getElementById('update_payments-scope');
    if (scopes.includes('payments')) {
        update_payments_scope.checked = true;
    }
    const update_admin_scope = document.getElementById('update_admin-scope');
    if (scopes.includes('admin')) {
        update_admin_scope.checked = true;
    }

    const checkedScopes = () => {
        const checked_scopes = [];
        const checkboxes = document.querySelectorAll('#app_scopes input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checked_scopes.push(checkbox.value);
            }
        });
        return checked_scopes;
    }

    update_app_button.addEventListener('click', () => {
        const name = update_name.value;
        const redirect_uri = update_redirect_uri.value;
        const scopes = checkedScopes();
        send({ type: "UPDATE_APP", data: { app_id, name, redirect_uri, scopes } });
        dialog.close();
    });
}

const send_register_button = document.getElementById('btnRegister');
if (send_register_button) {
    send_register_button.addEventListener('click', (event) => {
        event.preventDefault();
        const name = document.getElementById('app_name').value;
        const verification_uri = document.getElementById('app_verification_uri').value;
        const redirect_uri = document.getElementById('app_redirect_uri').value;
        const checkedRegisterScopes = () => {
            const checked_scopes = [];
            const checkboxes = document.querySelectorAll('#register_scopes input[type="checkbox"]');
            checkboxes.forEach((checkbox) => {
                if (checkbox.checked) {
                    checked_scopes.push(checkbox.value);
                }
            });
            return checked_scopes;
        }
        const scopes = checkedRegisterScopes();
        const app_markup_percentage = document.getElementById('app_markup_percentage').value;
        send({
            "type": "SUBMIT_REGISTRATION",
            "data": {
                "name": name,
                "redirect_uri": redirect_uri,
                "scopes": scopes,
                "verification_uri": verification_uri,
                "app_markup_percentage": app_markup_percentage
            }
        });
    });
};

const registerApp = async ({ name, redirect_uri, scopes, verification_uri, app_markup_percentage }) => {
    const api = new DerivAPIBasic({ endpoint: 'qa10.deriv.dev', lang: 'EN', app_id: 1016 });
    const token1 = sessionStorage.getItem('token1');
    await api.authorize(token1);
    await api.appRegister({ name, redirect_uri, scopes, verification_uri, app_markup_percentage });
};
