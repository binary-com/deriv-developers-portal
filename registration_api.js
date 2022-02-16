const { createMachine, actions, interpret, assign } = XState;

const appRegistrationMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QCcxQJawC5mQfQEMAHdAOgBsB7KGCPSgVywGIAZAeQHEBJAOUVBFKsdFnSUAdgJAAPRABYAnKQDsAJkUqAjAGYVANnUqArJoA0IAJ6IAtIoAM80vodqAHPc3rjxgL6+LVAxsXEISCmpaPHQJUiDMHHwsAgAjUgAzSnIISDxM5ABbZgAVLk5WAFE8ADF2ACUAWWkhETFJaTkEFR0nLX1jdS1jdzV7FwtrBBsht2NnLTcdNSVTfR0h-0C0BNDiMioaXJi47ZCk1NIGCUzs3PyC0lgGFILRMQkoPHjsZAI22KoBAgMU+3ywv3+zAgkjApBiADdKABrWFg3bhA5RY5o85pK43HJ0e6PZ6vLDvUGncF-cQAyhAkFfKkQ2kIBGUADGNMkAG17ABdZrCUS0jqILRqYbORTyeTrNxqLRKrQqCa2LRyrSkRTGLSKFy6hY6MabEA4sL7SJHWLm5J465ZQl5SiFEkvN6MsEsyQRBkfJnBamQ3DIF2kIjkP7E817CKHOjYqmhO2XB23Ikuh5Pd3kz3M7l0v2UwPeiRsiSIrn-PmCpAgFoi9p1zoSqUuWXyxXK1VWdU6fT6UgeJT62Y+Dz6U0xjFWhM2pO41MEu6Zt1kikBhKl5gAYQ4AGUqnUKjx98UKnU8AARbgAQQ4nCFrVFzcQik0pGGksUbm0P6W8hqlMGqKDopAaG4ihqHoxj6G4MxTguFpxli86BsmFz4o6K6FCUZSVDU9RNHWDb-GKCD6LKqieO49j2Is7gakB0yUYO7hKNBKjyNBraIeh+Cxpi1onPxeAplh6bOrh+4AKoAEINNwxR4Mep7FHUt7FNw7D8CRwpka+CB9HRpB9Co9EeNoSpqGozEqno2pQTqmrmf+fE7AJM7xtEaEeWJqRsFw7AycUT6NlIhk6GBcEaGMso-pK6x2YYg56NB8H2Co8E9PI7lnMhQlziJfl2swDS3rwt6cFUpScOUNW3nJYUGaAnTrFo9imY4bhuPIxizLobjMe+bjahxuo-i4-SKHliQFbOPmkAUBASAQMD+WkgLAh8t5EEQsC+ttUBQjCcIVsiqJIYJC3HMtq3rSmW0grt+2HSC5aVgWNbNS+rWIP2kpDjxfVKPBco9pMNg6AM4HQ2oJhqHBPjcTos3opa3m3Sta1gBtb07XtB1PR8zAhmGEZRqu04Y6hS3Yw9FzE1AL1E-SR0fZyX0Cj9TZ-QgAOjQqUXQ-0Oi-oozEaGB0HGFF-T2Lq8jqGjnk08Jd043jTMs6QYAFEQWCWMwqncGeF54LV9UW41PMRXzZlOFFxhK-19FLO4QEw2s8M9QMMqwcsk4BGaV1ebTGsM5tbPPYTuvIKGyDGxU6kAJq2+RYuLNqiqeFxsHcbLkugbDsv9sYCsasrwfUyh6v07jj3RwT+3MJw7AW+3FQNAACsUKd4GemkVOnkXyB1n4dZRzs-hq8j6JLxpDj1kodcs5c9EHWyiddmOxBHDcXDk5BgBSL341AV5gMfOAnRIsLsiixX5Tv4f13jR8nzHRDn5f19gBzVZaTfT0s+Xmsh-o+DmKYWW+gbI6nsHqeevYpjDE6k5aCY8VT503iHbeYc673QPmkD+p89o-yvifMApN47k0jFgaMoc1ZFX3u-ChpDv5M1-pQgBXNayCH0r9cB-NIGfh1ADDQ5dEHMUoqNdBsDBgji0Creau86aENYdfL+JIOQcjgLALhN9jzVGTjuAAEiPPm0MVDKGdr1X29h+wA2Yv1Jw6DuimAcLqHBNdCqLRYSmEhWiybIAMVQ48qcLFCP7Ag0g-YJSOA7HqCWyCbDaDUNnUC9gbJZMmsol+BDNalRNmbS8lsCLFBtiA8K5EHaxOhi7DwDEPYpNSoYaGfRRhKjGDoHUeT8HMLfqVYxxQzF4FvN3bueBWCm1ClUlqUS9ROAViYFYjgdSSzlLE5euosl9UcHoPpTC-GDICleColRzxjImZEtqizSDLOnuXFY0j1jgQMDZLKsoHFwUObXAZ6jSptzwDJbuV4h54AaOwM5NzxSGEdvUkwjT3ZDRSb+dJ8VJRcUxdxNQvzfHHAYEQCAfxcYFEoDkS4RKSVnyZjJKlN9oR3zOoiR+PibqxEJcSnAeAyUUs5dSshtL6X-3ZIA3k3M5mCJbPIX89zy6mCyb7RUQEOlDgcPRWBGqorcTxeyylXLSXkthPynANKm5QDpQa6hCdwx0IYXgo5BLhU8qNfqgVHDzWWpJTw6sEr+GgLtkIjUsqFYK1cEqrQQEehqrogqT5ipIIGF1aok1hq+XCrPk8HReivWGIqMMsxMKjKGnuQ47QlFNCDSQZMH8MbMp6jGAOUwbhk201TS69NBqz7BNzWE5OdQ06SrAS2WW6T4KUQAv2cyEoi5dXfAsKC1iepK1ytXRhfzFrtt5VQ2SCklIqRPDMjSWkdJFoWArZwA0JQz11P2ZijihwOKghZOUZc-BrodRumIgU24hSLVFS9sVKKg0SpGlJfQJSxPUD0IY+pKIqFbdaMqFUqo1Xwg1JqQ7A2dGGDYnoGhliKBVDKiGthoZzElMMMWHilSwP8MHCQRr4B1jZd5RgWAz0Dkcj4JYGpm2QWreqfQDjwJ6mNIYPUCwlaIaKraC4y4MyFCLX7bUSpl0DBsn1QTwEOKfkRnoXQhgNAyhk4tOT9oFNSSzKSD0-ovQFnPpuH4BYz0dTmFO4YCMUbqDsmLTq5lQbCaNEMbx678W+XyuJNMTpiTZnXHmEsDn7P-DwFm3RsBmP+uqYZDUgNG0IOo9BWBtlwPcU6hBHUM9M69VM4mUSUXLOxZs7mOz+Z-hPyDLSPAwSz0F3uQOArswis2V8+ZZwaz1W-iWKYWrEW5oNewop6zOYNzJdpKQDkVBYC5DW5IPAwICAHDPZKdJ7ZNQKmVCqOyMqtRT1AlBMWPTUYfr8vk2TSEFuSSaythLW4XNYfIpoMCX5m1-gYoBcDAxRoQSmx4OKNWXvP36WZj7mFos4QKEWmUNibKg71ODuyCp0nvlinKYTmSZqI7mm9lH9XUjKZ8KphYvUNNr209MSCcwScOCVmsDwSxZtqMKYzc1Osmb-vLqNNY-UBNiwMPqe95dtRwy8DKhUi7Bf+JF0WHWesDaTCy-MtqA3wKwLcEjF2P5JZ6hLhocyRXTDPa3q95HWMAXa6OjrNLej-1ZVGg89QYxXYOPvX1T8QtFSIxUNoBBmuTlRx17HHrAPIrWPRX1d8P46JYJ0JLeC4foK8b6ojRUCGqfoy-XveP58Wb-rFoOHZU9Qaz3Z7KdJMt4awW0Nxfocf3fELYVozhbCwD-rHp1RvIMZ6ynZy4ZQaz4YmGsXKPvwuB+aObto9L+iR++5VEDIHsxvlOJSbBQcA3TBcT6s7Liq-I6kECZv4JoS98qAP90I-jjYHSJlM4YTwmBgEkndcEXdHUq9+8H9B9m469zcJ44pp4wY55mIsoucpYskADZgEdnckcwChdI5-0VROoHlVlnkUkoItQnJ1go8DABxV1sDqdXcOVnVt03VTVBVPVhUz0opRpuI55dB1BhNlVIdwJjMVQaDXINhy9VZK9WC01jUM0yFvcMte1OMlBwJeo4MlBtB68VV98Zg85KIpZhMW0pCVE21mDXVU1u0aFkAVCU97YK11ClBaDK0dDwNOpepWx5Acl1B3xZZBct1LCFCiAuCNRSBeD9B+DEYskwNIZV450iNQJjRzdMpKd6CK9wtZCO1R97Cg1YpwjA4ojBDYjbBZRBYn1I80ULJZtlML1ZZuIoIlBiNfw7Is9HJ3AfxfwVRnJDksdAMHBgMEpZYSiphRhZZ2jIJF055DAy9-AgA */
createMachine({
  id: "register_api",
  initial: "logged_out",
  states: {
    logged_out: {
      on: {
        LOGIN: {
          target: "#register_api.logged_in",
        },
      },
    },
    logged_in: {
      initial: "register_tab",
      states: {
        register_tab: {
          initial: "folded_form",
          states: {
            folded_form: {
              invoke: {
                src: "resetFields",
              },
              on: {
                TOGGLE_FORM: {
                  target: "#register_api.logged_in.register_tab.unfolded_form",
                },
              },
            },
            unfolded_form: {
              states: {
                submitting_registration: {
                  initial: "loading_registration",
                  states: {
                    loading_registration: {
                      invoke: {
                        src: "_inline",
                        onDone: [
                          {
                            target:
                              "#register_api.logged_in.register_tab.unfolded_form.submitting_registration.registration_success",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#register_api.logged_in.register_tab.unfolded_form.submitting_registration.registration_error",
                          },
                        ],
                      },
                    },
                    registration_success: {},
                    registration_error: {
                      invoke: {
                        src: "handleError",
                      },
                    },
                    closed_registration_dialog: {},
                  },
                  on: {
                    CLOSE_REGISTER_DIALOG: {
                      target:
                        "#register_api.logged_in.register_tab.unfolded_form.submitting_registration.closed_registration_dialog",
                    },
                  },
                },
              },
              on: {
                TOGGLE_FORM: {
                  target: "#register_api.logged_in.register_tab.folded_form",
                },
                SUBMIT_REGISTRATION: {
                  target:
                    "#register_api.logged_in.register_tab.unfolded_form.submitting_registration",
                },
              },
            },
          },
          on: {
            LOGOUT: {
              target: "#register_api.logged_out",
            },
            MANAGE_TOGGLE_TAB: {
              target: "#register_api.logged_in.manage_tab",
            },
          },
        },
        manage_tab: {
          invoke: {
            src: "setEnvironment",
          },
          initial: "loadingApps",
          states: {
            loadingApps: {
              initial: "loading",
              states: {
                loading: {
                  invoke: {
                    src: "_inline",
                    onDone: [
                      {
                        target:
                          "#register_api.logged_in.manage_tab.loadingApps.success",
                      },
                    ],
                    onError: [
                      {
                        target:
                          "#register_api.logged_in.manage_tab.loadingApps.error",
                      },
                    ],
                  },
                },
                empty: {
                  on: {
                    REGISTER_TOGGLE_TAB: {
                      target: "#register_api.logged_in.register_tab",
                    },
                  },
                },
                success: {},
                error: {
                  on: {
                    RETRY: {
                      target: "#register_api.logged_in.manage_tab.loadingApps",
                    },
                  },
                },
              },
              on: {
                GO_TO_EMPTY_STATE: {
                  target:
                    "#register_api.logged_in.manage_tab.loadingApps.empty",
                },
              },
            },
            deletingApp: {
              initial: "loadingDelete",
              states: {
                loadingDelete: {
                  invoke: {
                    src: "_inline",
                    onDone: [
                      {
                        target:
                          "#register_api.logged_in.manage_tab.deletingApp.successDelete",
                      },
                    ],
                    onError: [
                      {
                        target:
                          "#register_api.logged_in.manage_tab.deletingApp.errorDelete",
                      },
                    ],
                  },
                },
                successDelete: {
                  on: {
                    REFETCH: {
                      target:
                        "#register_api.logged_in.manage_tab.deletingApp.loadingDelete",
                    },
                  },
                },
                errorDelete: {
                  on: {
                    RETRY: {
                      target:
                        "#register_api.logged_in.manage_tab.deletingApp.loadingDelete",
                    },
                  },
                },
              },
            },
          },
          on: {
            REGISTER_TOGGLE_TAB: {
              target: "#register_api.logged_in.register_tab",
            },
            FETCH_APP_LIST: {
              target: "#register_api.logged_in.manage_tab.loadingApps",
            },
            DELETE_APP: {
              target: "#register_api.logged_in.manage_tab.deletingApp",
            },
            GO_UPDATE_MODE: {
              target: "#register_api.logged_in.update_mode",
            },
          },
        },
        update_mode: {
          states: {
            updateApp: {
              initial: "loadingUpdate",
              states: {
                loadingUpdate: {
                  invoke: {
                    src: "_inline",
                    onDone: [
                      {
                        target:
                          "#register_api.logged_in.update_mode.updateApp.successUpdate",
                      },
                    ],
                    onError: [
                      {
                        target:
                          "#register_api.logged_in.update_mode.updateApp.errorUpdate",
                      },
                    ],
                  },
                },
                successUpdate: {
                  on: {
                    REFETCH: {
                      target:
                        "#register_api.logged_in.update_mode.updateApp.loadingUpdate",
                    },
                  },
                },
                errorUpdate: {
                  on: {
                    RETRY: {
                      target:
                        "#register_api.logged_in.update_mode.updateApp.loadingUpdate",
                    },
                  },
                },
              },
            },
          },
          on: {
            SUBMIT_REGISTRATION: {
              target: "#register_api.logged_in.update_mode.updateApp",
            },
          },
        },
      },
      on: {
        LOGOUT: {
          target: "#register_api.logged_out",
        },
        MANAGE_TOGGLE_TAB: {
          target: "#register_api.logged_in.manage_tab",
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
        handleError: async (context, event) => {
            console.log("Context and event: ", context, event);
            console.log("event data: ", event.data);
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
    token_input.onchange = (e) => {
        const token = e.target.value;
        if (token) {
            sessionStorage.setItem('token1', token);
        }
    };
}

const is_production = window.location.hostname === 'api.deriv.com';
if (is_production) {
    const app_id = 31063;
    const server_url = 'https://green.binaryws.com';
    localStorage.setItem('app_id', app_id);
    localStorage.setItem('server_url', server_url);
}

const app_id_in_url = urlParams.get('app_id');
if (app_id_in_url) localStorage.setItem('app_id', app_id_in_url);
const endpoint_in_url = urlParams.get('endpoint');
if (endpoint_in_url) localStorage.setItem('server_url', endpoint_in_url);

const getToken = () => {
    if (token_input) {
        return token_input.value;
    }
};

const getStorageToken = () => {
    return sessionStorage.getItem('token1');
}

const getSessionAppId = () => localStorage.getItem("app_id");
// add getEndpoint function
const getEndpoint = () => localStorage.getItem('server_url');



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
        const api_token_input_element = document.getElementById('api_token_input');
        all_checkboxes.forEach(checkbox => {
            if (checkbox.hasAttribute("checked")) {
                const custom_checkbox = checkbox.parentElement.querySelector(".custom-checkbox");
                checkbox.removeAttribute("checked");
                custom_checkbox.classList.remove("active-checkbox");
            }
        });
        api_token_input_element.removeAttribute('readonly');
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
        const { active, app_id, app_markup_percentage, appstore, github, googleplay, homepage, name, redirect_uri, scopes, verification_uri } = app;
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
    const token1 = getStorageToken();
    await api.authorize(token1);
    await api.send({ app_update: app_id, app_markup_percentage, name, redirect_uri, verification_uri, scopes });
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
    send({ type: "GO_UPDATE_MODE" }); // TODO: send app_id through xstate

    // get register your application fields
    const app_name_input = document.getElementById('app_name');
    const app_redirect_uri_input = document.getElementById('app_redirect_uri');
    const app_verification_uri_input = document.getElementById('app_verification_uri');
    const app_markup_percentage_input = document.getElementById('app_markup_percentage');
    const app_id_input = document.getElementById('app_id');
    const api_token_input_element = document.getElementById('api_token_input');
    app_id_input.setAttribute('value', app_id);

    // prefill in the fields with app data
    app_name_input.value = name;
    app_redirect_uri_input.value = redirect_uri;
    app_verification_uri_input.value = verification_uri;
    app_markup_percentage_input.value = app_markup_percentage;
    api_token_input_element.value = getStorageToken();
    // set api_token_input to readonly
    api_token_input_element.setAttribute('readonly', true);

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
    await api.send({ app_register: 1, name, redirect_uri, scopes, verification_uri, app_markup_percentage });
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
    send({ type: "MANAGE_TOGGLE_TAB" });
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

const clearFields = () => {
    document.getElementById('app_name').value = '';
    document.getElementById('app_redirect_uri').value = '';
    document.getElementById('app_verification_uri').value = '';
    document.getElementById('app_markup_percentage').value = '';
    const checkboxes = document.querySelectorAll('#register_scopes input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        const custom_checkbox = checkbox.parentElement.querySelector('.custom-checkbox');
        checkbox.removeAttribute('checked');
        custom_checkbox.classList.remove('active-checkbox');
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
    clearFields();
});

// handle register_app_manage
const register_app_manage_button = document.getElementById('register_app_manage');
if (register_app_manage_button) register_app_manage_button.addEventListener('click', () => {
    send({ type: "MANAGE_TOGGLE_TAB" });
});
