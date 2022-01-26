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
                            invoke: {
                                src: 'resetFields',
                            },
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
                                    on: {
                                        CLOSE_REGISTER_DIALOG: "#closed_registration_dialog",
                                    },
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
                                        closed_registration_dialog: {
                                            id: "closed_registration_dialog",
                                        },
                                    },
                                },
                            },
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
                        // add GO_UPDATE_MODE event with data
                        GO_UPDATE_MODE: { target: "#update_mode", data: (_, event) => event.data },

                    },
                    states: {
                        loadingApps: {
                            id: "loadingApps",
                            initial: 'loading',
                            on: {
                                GO_TO_EMPTY_STATE: "#empty",
                            },
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
                                empty: {
                                    id: "empty",
                                    on: {
                                        REGISTER_TOGGLE_TAB: "#register_tab",
                                    },
                                },
                                success: {
                                    id: "successLoadingApps",
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
                    },
                },
                update_mode: {
                    id: "update_mode",
                    on: {
                        SUBMIT_REGISTRATION: "#updateApp",
                    },
                    states: {
                        updateApp: {
                            id: "updateApp",
                            initial: "loadingUpdate",
                            states: {
                                loadingUpdate: {
                                    id: "loadingUpdate",
                                    invoke: {
                                        src: async (_, event) => {
                                            await appUpdate(event.data);
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
}, {
    services: {
        resetFields: async () => {
            const form = document.querySelector('#frmNewApplication');
            form.reset();
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
        const redirect_url = has_params ? window.location.href : `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
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


let sessionState = sessionStorage.getItem('app_registration_state') || 'logged_out';
const urlParams = new URLSearchParams(window.location.search);
const token1_in_url = urlParams.get('token1');
if (token1_in_url) {
    sessionStorage.setItem('token1', token1_in_url);
    sessionStorage.setItem('app_registration_state', 'logged_in');
    sessionState = 'logged_in';
}


// token field api_token_input onchange set token
const token_input = document.getElementById('api_token_input');
if (token_input) {
    token_input.onchange = (e) =>{
        const token = e.target.value;
        if (token) {
            sessionStorage.setItem('token1', token);
        }
    };
}

const getToken = () => {
    if (token_input) {
        return token_input.value;
    }
};

const getStorageToken = () => {
    return sessionStorage.getItem('token1');
}

// get app_id from url
const app_id_in_url = urlParams.get('app_id');
// if app_id is in url, set it in LocalStore
if (app_id_in_url) {
    LocalStore.set('config.app_id', app_id_in_url);
}

const getSessionAppId = () => app_id_in_url || LocalStore.get("config.app_id");

// get endpoint from url
const endpoint_in_url = urlParams.get('endpoint');
// if endpoint is in url, set it as config.server_url
if (endpoint_in_url) {
    LocalStore.set('config.server_url', endpoint_in_url);
}

// add getEndpoint function
const getEndpoint = () => endpoint_in_url || LocalStore.get('config.server_url');



const loginUrl = ({ language }) => {
    const server_url = getEndpoint();
    const signup_device_cookie = new CookieStorage('signup_device');
    const signup_device = signup_device_cookie.get('signup_device');
    const date_first_contact_cookie = new CookieStorage('date_first_contact');
    const date_first_contact = date_first_contact_cookie.get('date_first_contact');
    const marketing_queries = `${signup_device ? `&signup_device=${signup_device}` : ''}${date_first_contact ? `&date_first_contact=${date_first_contact}` : ''
        }`;
    const getOAuthUrl = () => {
        return `https://oauth.deriv.com/oauth2/authorize?app_id=${getSessionAppId()}&l=${language}${marketing_queries}&brand=deriv`;
    };

    if (server_url && /qa/.test(server_url)) {
        return `https://${server_url}/oauth2/authorize?app_id=${getSessionAppId()}&l=${language}${marketing_queries}&brand=deriv`;
    }
    return getOAuthUrl();
};

function activate(state) {
    const joinedState = state.toStrings().join(' ');
    const elApp = document.getElementById('app-registration-machine');
    const form_checkbox = document.querySelector('span#expand_form');
    const is_folded_state = joinedState === 'logged_in logged_in.register_tab logged_in.register_tab.folded_form';
    if (elApp) {
        elApp.dataset.state = joinedState;
        elApp.setAttribute("data-state", joinedState);
    }
    if (is_folded_state) {
        if (form_checkbox) form_checkbox.classList.remove("active-checkbox");
    } else {
        if (form_checkbox) form_checkbox.classList.add("active-checkbox");
    }
}

const interpreter = XState
    .interpret(appRegistrationMachine)
    .onTransition(activate)
    .start(sessionState);

const { send } = interpreter;

const unfolded_form_checkbox = document.querySelector('span#expand_form');
if (unfolded_form_checkbox) {
    unfolded_form_checkbox.addEventListener('click', () => {
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
        const all_checkboxes = document.querySelectorAll("[data-state~='logged_in.register_tab'] input[type='checkbox']");
        all_checkboxes.forEach(checkbox => {
            if (checkbox.hasAttribute("checked")) {
                const custom_checkbox = checkbox.parentElement.querySelector(".custom-checkbox");
                checkbox.removeAttribute("checked");
                custom_checkbox.classList.remove("active-checkbox");
            }
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
    const app_id = getSessionAppId();
    const endpoint = getEndpoint();
    const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
    const token1 = getStorageToken();

    // rewrite skeleton to have div inside td with class="skeleton"
    const skeleton = `<tr>
        <td><div class="skeleton"></div></td>
        <td><div class="skeleton"></div></td>
        <td><div class="skeleton"></div></td>
        <td><div class="skeleton"></div></td>
        <td><div class="skeleton"></div></td>
    </tr>`;

    // create an array with 5 skeleton
    const skeleton_array = Array(5).fill(skeleton);
    // for each skeleton create a tr
    const app_list_element = document.getElementById('app_list');
    const is_app_list_tr_loaded = app_list_element.querySelectorAll('tr').length > 0;
    if (!is_app_list_tr_loaded) {
        skeleton_array.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = item;
            app_list_element.appendChild(tr);
        });
    }

    await api.authorize(token1);
    const get_data = await api.appList();
    const app_list = get_data.app_list;
    // send go to empty state when no app_list
    if (!app_list.length) {
        send({
            "type": "GO_TO_EMPTY_STATE"
        });
    };
    const app_list_body = document.getElementById('app_list');
    while (app_list_body.firstChild) {
        app_list_body.removeChild(app_list_body.firstChild);
    }
    app_list.forEach((app) => {
        const { active, app_id, app_markup_percentage, appstore, github, googleplay, homepage, name, redirect_uri, scopes, verification_uri} = app;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${name}</td>
                        <td>${app_id}</td>
                        <td>${scopes.join(', ')}</td>
                        <td>${redirect_uri}</td>
                        <td>
                            <button aria-label="Update app" class="app-btn update-icon" onclick="go_update_mode(${active}, '${app_id}', '${app_markup_percentage}', '${appstore}', '${github}', '${googleplay}', '${homepage}', '${name}', '${redirect_uri}', '${verification_uri}', '${scopes.join(', ')}')"><span>Remove app</span></button>
                            <button aria-label="Delete app" class="app-btn delete-icon" onclick="open_delete_dialog(${app_id})"><span>Update app</span></button>
                        </td>
                        `;
        app_list_body.appendChild(tr);
    });
}

const removeApp = async (app_id) => {
    const endpoint = getEndpoint();
    const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
    const token1 = getStorageToken();
    await api.authorize(token1);
    await api.appDelete(app_id);
    send({ type: 'FETCH_APP_LIST' });
}

const appUpdate = async ({ app_id, app_markup_percentage, name, redirect_uri, verification_uri, scopes }) => {
    const endpoint = getEndpoint();
    const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
    const token1 = getToken();
    await api.authorize(token1);
    await api.appUpdate({ app_update: app_id, app_markup_percentage, name, redirect_uri, verification_uri, scopes });
    send({ type: 'FETCH_APP_LIST' });
};

const open_delete_dialog = (app_id) => {
    const dialog = document.getElementById('delete_app_dialog');
    dialog.showModal();
    const delete_app_button = document.getElementById('delete_app_button');
    if (delete_app_button) delete_app_button.addEventListener('click', () => {
        send({ type: "DELETE_APP", data: app_id });
        dialog.close();
    });
}

const go_update_mode = (...app) => {
    const [_active, app_id, app_markup_percentage,
        _appstore, _github, _googleplay, _homepage, name,
        redirect_uri, verification_uri, scopes] = app;
    send({ type: "GO_UPDATE_MODE"}); // TODO: send app_id through xstate
    
    // get register your application fields
    const app_name_input = document.getElementById('app_name');
    const app_redirect_uri_input = document.getElementById('app_redirect_uri');
    const app_verification_uri_input = document.getElementById('app_verification_uri');
    const app_markup_percentage_input = document.getElementById('app_markup_percentage');
    const app_id_input = document.getElementById('app_id');
    app_id_input.setAttribute('value', app_id);

    // prefill in the fields with app data
    app_name_input.value = name;
    app_redirect_uri_input.value = redirect_uri;
    app_verification_uri_input.value = verification_uri;
    app_markup_percentage_input.value = app_markup_percentage;

    const custom_read_checkbox = document.querySelector("span#read-scope");
    const read_checkbox = document.querySelector("input#read-scope");
    if (scopes.includes("read")) {
        custom_read_checkbox.classList.add("active-checkbox");
        read_checkbox.setAttribute("checked", "");
    } else {
        custom_read_checkbox.classList.remove("active-checkbox");
        read_checkbox.removeAttribute("checked");
    }

    const custom_trade_checkbox = document.querySelector("span#trade-scope");
    const trade_checkbox = document.querySelector("input#trade-scope");
    if (scopes.includes("trade")) {
        custom_trade_checkbox.classList.add("active-checkbox");
        trade_checkbox.setAttribute("checked", "");
    } else {
        custom_trade_checkbox.classList.remove("active-checkbox");
        trade_checkbox.removeAttribute("checked");
    }
    
    const custom_trading_information_checkbox = document.querySelector("span#trading_information-scope");
    const trading_information_checkbox = document.querySelector("input#trading_information-scope");
    if (scopes.includes("trading_information")) {
        custom_trading_information_checkbox.classList.add("active-checkbox");
        trading_information_checkbox.setAttribute("checked", "");
    } else {
        custom_trading_information_checkbox.classList.remove("active-checkbox");
        trading_information_checkbox.removeAttribute("checked");
    }

    const custom_payments_scope_checkbox = document.querySelector("span#payments-scope");
    const payments_scope_checkbox = document.querySelector("input#payments-scope");
    if (scopes.includes("payments")) {
        custom_payments_scope_checkbox.classList.add("active-checkbox");
        payments_scope_checkbox.setAttribute("checked", "");
    } else {
        custom_payments_scope_checkbox.classList.remove("active-checkbox");
        payments_scope_checkbox.removeAttribute("checked");
    }

    const custom_admin_scope_checkbox = document.querySelector("span#admin-scope");
    const admin_scope_checkbox = document.querySelector("input#admin-scope");
    if (scopes.includes("admin")) {
        custom_admin_scope_checkbox.classList.add("active-checkbox");
        admin_scope_checkbox.setAttribute("checked", "");
    } else {
        custom_admin_scope_checkbox.classList.remove("active-checkbox");
        admin_scope_checkbox.removeAttribute("checked");
    }
}


// handle outside click to close delete_app_dialog
const delete_app_dialog = document.getElementById('delete_app_dialog');
if (delete_app_dialog) delete_app_dialog.addEventListener('click', (event) => {
    if (event.target === delete_app_dialog) {
        delete_app_dialog.close();
    }
});

// handle outside click to close update_app_dialog
const update_app_dialog = document.getElementById('update_app_dialog');
if (update_app_dialog) update_app_dialog.addEventListener('click', (event) => {
    if (event.target === update_app_dialog) {
        update_app_dialog.close();
    }
});

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
        // read app_id from hidden input
        const app_id = document.getElementById('app_id').value;
        send({
            "type": "SUBMIT_REGISTRATION",
            "data": {
                "name": name,
                "redirect_uri": redirect_uri,
                "scopes": scopes,
                "verification_uri": verification_uri,
                "app_markup_percentage": app_markup_percentage,
                "app_id": app_id,
            }
        });
    });
};

const registerApp = async ({ name, redirect_uri, scopes, verification_uri, app_markup_percentage }) => {
    const app_id = getSessionAppId();
    const endpoint = getEndpoint();
    const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
    const token1 = getToken();
    await api.authorize(token1);
    await api.appRegister({ name, redirect_uri, scopes, verification_uri, app_markup_percentage });
};

const open_register_dialog = () => {
    const dialog = document.getElementById('register_app_dialog');
    dialog.showModal();
};

const close_register_dialog = () => {
    const dialog = document.getElementById('register_app_dialog');
    dialog.close();
}

// handle register_got_it button
const register_got_it = document.getElementById('register_got_it');
if (register_got_it) register_got_it.addEventListener('click', (event) => {
    close_register_dialog();
});

// handle register_app_manage button
const register_app_manage = document.getElementById('register_app_manage');
if (register_app_manage) register_app_manage.addEventListener('click', (event) => {
    close_register_dialog();
    send({ type: "MANAGE_TOGGLE_TAB"});
});


// close delete_app_dialog when delete_app_keep_button is clicked
const delete_app_keep_button = document.getElementById('delete_app_keep');
if (delete_app_keep_button) {
    delete_app_keep_button.addEventListener('click', () => {
        delete_app_dialog.close();
    });
}

// close delete_app_dialog when close_delete_dialog is clicked
const close_delete_dialog = document.getElementById('close_delete_dialog');
if (close_delete_dialog) {
    close_delete_dialog.addEventListener('click', () => {
        delete_app_dialog.close();
    });
}

// close update_app_dialog when update_app_cancel is clicked
const update_app_cancel = document.getElementById('update_app_cancel');
if (update_app_cancel) {
    update_app_cancel.addEventListener('click', () => {
        update_app_dialog.close();
    });
}

// close update_app_dialog when close_update_dialog is clicked
const close_update_dialog = document.getElementById('close_update_dialog');
if (close_update_dialog) {
    close_update_dialog.addEventListener('click', () => {
        update_app_dialog.close();
    });
}

const signout_button = document.getElementById('logout');
if (signout_button) {
    signout_button.addEventListener('click', () => {
        send({ type: "LOGOUT" });
        sessionStorage.removeItem('token1');
        sessionStorage.removeItem('app_registration_state');
        // clear tokens from search params
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.delete('token1');
        searchParams.delete('token2');
        window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);
    });
}

// handle empty_go_back to send go to register
const empty_go_back = document.getElementById('empty_go_back');
if (empty_go_back) empty_go_back.addEventListener('click', () => {
    send({ type: "REGISTER_TOGGLE_TAB" });
});

// handle close_register_dialog to send CLOSE_REGISTER_MODAL
const close_register_dialog_button = document.getElementById('close_register_dialog');
if (close_register_dialog_button) close_register_dialog_button.addEventListener('click', () => {
    send({ type: "CLOSE_REGISTER_DIALOG" });
});

// handle register_got_it in the same way
const register_got_it_button = document.getElementById('register_got_it');
if (register_got_it_button) register_got_it_button.addEventListener('click', () => {
    send({ type: "CLOSE_REGISTER_DIALOG" });
});

// handle register_app_manage
const register_app_manage_button = document.getElementById('register_app_manage');
if (register_app_manage_button) register_app_manage_button.addEventListener('click', () => {
    send({ type: "MANAGE_TOGGLE_TAB" });
});
