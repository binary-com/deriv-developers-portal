const { createMachine, actions, interpret, assign } = XState;

const appRegistrationMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QCcxQJawC5mQfQEMAHdAOgBsB7KGCPSgVywGIAZAeQHEBJAOUVBFKsdFnSUAdgJAAPRAFoALAE4ADKQBsADgDMigOyKdy5QCZTARgCsVgDQgAnoh06tpRVtUbVxnfquqJgC+QfaoGNi4hCQU1LR46BKk4Zg4+FgEAEakAGaU5BCQeHnIALbMACpcnKwAongAYuwASgCy0kIiYpLScghWyqRm+vqBihaeBjoa9k4IilakVhqK5tNa-qYj+iFhaKlRxGRUNEWJyfuR6VmkDBJ5BUUlpaSwDJmlomISUHgp2MgCN0klQCBBEr9-lhAcDmBBJGBSIkAG6UADWiKhhxiJ3i5yx12ydwehToz1e70+WG+kMu0KB4hBlDBEL+dJhjIQKMoAGMGZIANqqAC6HWEokZvUQVn0bgWKwsyn0FkCVkss0QisGph0qhlygsOisOlMG12IAJ0WOcTOSUtGSJ93ypOKlDKFI+X1ZUI5kliLJ+bIi9NhuGQbtIRHIQPJlqOsVOdHxdKiDtuTseZLdLzenup3vZ-KZAdpwd9Ei5ElRfOBQtFSBAnQlPQbfRlcuW4yVKuUaosGoQphWpD8-isFn0BvbO1CFpT+HjuNtF2DqZuxOdT2zHqpNKDqXLzAAwhwAMr1Zq1Hiniq1Zp4AAi3AAghxOGKupLW84daRTQstA0bxlA0fRTQHQ19FILRdA0UwPDUPQ9BnPZVwXHEbSTO15zwNMN0zV0ykqao6kaFp2gbJtgSlBBvFICxDX-ZZfEArQBzcI09A0TjFFUMCDCsc04wwxMEmwtDcPXDMXWeZhTwAVQAIVabgKjwS9rwqZpnwqbh2H4SjxWo79+j0IYtBUfRXA8LZQIHeRFSGKxxgYjQbC0Zy1SEnDF0wsSVwOQk2C4dh5IqD9mykEz5BcCx3EAvxFCMVYEoHSxFHovi1VlBjlBUCZvIk3zROTCSHWYVpn14Z9OHqKpOBqOrn0UiLjNAPo8o0EcDUMVQjC2eCdDSrx6Lc3txxVLQlRQucipEvEklKAgJAIGBJOyUFwR+Z8iCIWB-S2qA4QRJEq3RTEfPm5clpWta002iEdr2g6IUrasizrVqv3azUwK67xTQGQCfC0Uw7EcTUwaWVi+r8CcLNAwrAqtBMFtIG7VrAdaXu23b9oen5mDDCMoxjbdhOtErFuWzHsYJqAnvx5lDre3kPpFL6Wx+hAJ1MQZvF1AJVAsDQGNlCCpuh0CjENcceqRq4UaXLD0Zpu6bnpxnSDAUoiCwBxmA07gbzvPB6sas3ms5qLuYsU0oM7BYdENAxdAHUDBiswwTT50ZXAVtIlb884MfVjbmcevHmE4dgzdj2pWgABQqABNPAbx02prZoixkqWEW9BArxViNCCoKVBZzEQ7iwcUAPsUptHQ6xtNCnIMAaSenGoAfMB25wY6JERbkMQCxXiqbtWW5uNuO8johu97-uwFZmtGU+wzPy52RNW4uLzAGCZVmUZ29QHV33GVAxc9UQCjBGev0Mb66p+x2fO92xe+47sAieQcNkCRmjFgWMl1n4q2bm-b+H8F70yXj-Ve7N6yCCMt9HePNvBdVcPBWWVgPIuHPgxJYbkjB4KNBZXQj8g5U1VrdaemRDZXmNree85tSIVCtpvSKOdTRdX0KLRUwEwZ8xmBDWiRp6JajysscwGgqETxfnQ9azAGi1AqEeAAEngZ8idE54FYMw7OJkRZEMMAYEYKwtATGcvZdKQxhbOX4dYE+blBKzgpqjRRtNyoPlqHUW82jdFGNtjqLqyxDR5VlFOfQEEiFJTULnRQbkximHkVdCBr9yoxzwPJROD5M54FaOwXxwT0EqlUKYcyeCNgmBYv2MRngdCaFUMLDwot2wuDSeA-yDAiAQCBFjUolBCi3D6QMru9N5JjIHvCIep1USjw8crHp0zBnDMRL0-pOAJkRx+FMrZK9uRr0FBzLhbV0HjEWBZXiNkPCyiMKIuYZgMobA0CYA+DippdM8SrTZAy8BDJGX87Zn9JmrL-gAoBZN3RLODkkYFaygWrJ2SWfZAzEG1lOSgreNsLki3oh5awvU4bGHYm86CFTQYBBPkab5yzzgIoBesuSSkVJqSNjebSul9KlL6K4MJnhBoGDeTBQ0A5lTlydoEcphK6VwuCjHMKvKFAuHUDco0hhTC3yVHZMRQ51CuGsIEQChhDRaDlVTCqVUap1RIk1FqZy0EdSSSORUVKrJbHHGxMRBdoIbB8MoDysplQ6BCLOCQ6z4ANlhaJRgWBlUIHkOOcuZgzDCz1A4x5iAhxxQoXgtUfhdB+FDe4sBPz-L2huCSLcZQE3yDyiOHNnq-AGl4kNH1rhNDhJGFsQNAxewWrRpWx01aszulzLuAsZYizd33ACIsCaZb0T5uOZyN8LFpQCJffwcE4IwXvoO5cw70yjsIjmSkXpAw+hnde4EeA3g8h5HAKN2LuEmX8OoUGnhhaaq1UONKKo-XkJgi4LYqpD0q2PfhGS24J2XtLAeG9hY73E2QAmj90FTQtInKsP9WbBx0RlGODyQMXALAgxWnCeFpI1vPXmPct7GSkB5FQWARRGOSDwOCAgJwE3tncJ2RUypVTqh9SoJY0xgK8VeXBCjpVkbUdPeSOD+Yr3IbQVRJ12aTB-gsngoCgRQLgTEWqIDYFezmADV80tc1unycVopzcY7SgJs9bpgCBmQJgW9XMByfUnK8T4hUy5nhlByfEgprIdaGIcSbf4FtN922+YnOXY0agdTPNFm88LtDvEa12QzPG3cE0i0CO4aw3hAsysUBBZ2frQJWKmkakCJbULIwURkpR90Ctax1nrOYr7zl9Bww7N52CzAdNMMNUgeokqQX1HbVYOXIHdZLFrB9T7YAvsbKg7ew2YJuF0N5lYWHSUdqghl-wR2hymnNTZ9r6T-Irfy2torqGStTSaQfK+IscE1b1cLP8xhDCGF7HxUCrXZoPbs9TLrL3DqMxK+MdQ45uIqEwSXcGvnQIzdrroZxehmLLcyTPaB88v7LyR6LP8U5YLSNzjEsRNz86ha1X7Q0ehidw+yO-cnG3n3wJwB9lppB-Cpu0HxXOblz6GFF0G3QU0REDC53lnnZPcYL1Q4LsAJX+FuFFl4fhowWleCS4gaT9jQLcWkc7MjKuw6kF5xrpHfgafWDpwsBnA5Yos9vt4PiLhk32-oSVywlTwnGFdtE+yRp1AJONDI3hfMcuMsBRs5FoKCtoqF46vb2bjB-mvlqwNWq8FWXYjYGbztuJZfSin1ZTKkUHK7vzrb2ede59xW2ZUl897wxdjKAcE3XUne4iaPQFl68HMb+n5vn9UPt74z33UFSbBJVimBdiy+d1gwFnocj93x6PYZQ3tPoy59EFc9YQvypi+gz1BsM3CBZSVJ8DhviJ9YKQ5jWjVP6ySsGg352zGql6P7uwmhDALDjDFq1yGDhbRarCNqizNqTiJb2SkL2LWDjDaB4IuRdJ1prpDCppaoqgBAVb2QBBuDx7jAjDpbKhhpBBAA */
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
                        src: "registerApp",
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
                    src: "getAppList",
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
                error: {},
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
                    src: "removeApp",
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
                successDelete: {},
                errorDelete: {},
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
                    src: "appUpdate",
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
                successUpdate: {},
                errorUpdate: {},
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
        appUpdate: async ({ app_id, app_markup_percentage, name, redirect_uri, verification_uri, scopes }) => {
          const endpoint = getEndpoint();
          const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
          const token1 = getStorageToken();
          await api.authorize(token1);
          await api.send({ app_update: app_id, app_markup_percentage, name, redirect_uri, verification_uri, scopes });
          send({ type: 'FETCH_APP_LIST' });
        },
        registerApp: async ({ name, redirect_uri, scopes, verification_uri, app_markup_percentage }) => {
          const app_id = getSessionAppId();
          const endpoint = getEndpoint();
          const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
          const token1 = getToken();
          await api.authorize(token1);
          await api.send({ app_register: 1, name, redirect_uri, scopes, verification_uri, app_markup_percentage });
        },
        removeApp: async (app_id) => {
          const endpoint = getEndpoint();
          const api = new DerivAPIBasic({ endpoint, lang: 'EN', app_id });
          const token1 = getStorageToken();
          await api.authorize(token1);
          await api.appDelete(app_id);
          send({ type: 'FETCH_APP_LIST' });
        },
        getAppList: async () => {
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
