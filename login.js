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

const loginUrl = ({ language }) => {
    const server_url = LocalStore.get('config.server_url');
    const signup_device_cookie = new CookieStorage('signup_device');
    const signup_device = signup_device_cookie.get('signup_device');
    const date_first_contact_cookie = new CookieStorage('date_first_contact');
    const date_first_contact = date_first_contact_cookie.get('date_first_contact');
    const marketing_queries = `${signup_device ? `&signup_device=${signup_device}` : ''}${
        date_first_contact ? `&date_first_contact=${date_first_contact}` : ''
    }`;
    const getOAuthUrl = () => {
        return `https://oauth.deriv.com/oauth2/authorize?app_id=${getAppId()}&l=${language}${marketing_queries}&brand=deriv`;
    };

    if (server_url && /qa/.test(server_url)) {
        return `https://${server_url}/oauth2/authorize?app_id=${getAppId()}&l=${language}${marketing_queries}&brand=deriv`;
    }

    if (getAppId() === 11780) {
        return getOAuthUrl();
    }
    return new URL(getOAuthUrl()).href;
};

const registerLoginButton = document.getElementById('registerLogin');
if (registerLoginButton) {
    registerLoginButton.addEventListener('click', () => {
        redirectToLogin(false, 'EN');
    });
};
