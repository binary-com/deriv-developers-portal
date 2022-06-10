export const navigationMachine = () => ({
    id: 'navigation',
    initial: 'hamburger',
    on: {
        CLICK_HOME: 'home'
    },
    states: {
        hamburger: {
            on: { CLICK_HOME: 'home' }
        },
        home: {
            on: { CLICK_DOCUMENTATION: 'documentation' }
        },
        documentation: {
            on: { CLICK_QUICKSTART: 'quickstart' }
        },
        quickstart: {
            on: { CLICK_APP_REGISTRATION: 'app_registration' }
        },
        app_registration: {
            on: { CLICK_API_GUIDE: 'api_guide' }
        },
        api_guide: {
            on: { CLICK_FAQ: 'faq' }
        },
        faq: {
            on: { CLICK_JSON_SCHEMAS: 'json_schemas' }
        },
        json_schemas: {
            on: { CLICK_BUG_BOUNTY: 'bug_bounty' }
        },
        bug_bounty: {
            on: { CLICK_API_PLAYGROUND: 'api_playground' }
        },
        api_playground: {
            on: { CLICK_CLOSE: 'close' }
        },
    }
});