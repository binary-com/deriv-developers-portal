import { createMachine } from 'xstate';
import { createModel } from '@xstate/test';

const derivAPISkeleton = {
    id: 'deriv_api',
    initial: 'home',
    on: {
        CLICK_PLAYGROUND: {
            target: '.documentation.playground',
        },
        CLICK_DOCUMENTATION: {
            target: '.documentation',
        },
    },
    states: {
        home: {
            initial: 'isDown',
            states: {
                isDown: {
                    on: {
                        CLICK_LOGO: {
                            target: 'isTop',
                        },
                    },
                },
                isTop: {},
            },
            on: {
                CLICK_PLAYGROUND: {
                    target: '#deriv_api.documentation.playground',
                },
                CLICK_DOCUMENTATION: {
                    target: 'documentation',
                },
            },
        },
        documentation: {
            initial: 'documentation',
            states: {
                documentation: {},
                registration: {},
                guide: {},
                playground: {
                    initial: 'notselected_tokenEmpty',
                    states: {
                        notselected_tokenEmpty: {
                            on: {
                                FILL_TOKEN: {
                                    target: 'notselected_tokenFilled',
                                },
                                SELECT_API: {
                                    target: 'selected_tokenEmpty',
                                },
                            },
                        },
                        notselected_tokenFilled: {
                            on: {
                                SELECT_API: {
                                    target: 'selected_tokenFilled',
                                },
                            },
                        },
                        selected_tokenEmpty: {
                            on: {
                                FILL_TOKEN: {
                                    target: 'selected_tokenFilled',
                                },
                            },
                        },
                        selected_tokenFilled: {
                            on: {
                                CLICK_AUTHENTICATE: {
                                    target: 'displaySelectedDoc',
                                },
                            },
                        },
                        displayAuthDoc: {},
                        displaySelectedDoc: {},
                    },
                },
                faq: {},
                jsonSchemas: {},
                bugBounty: {},
            },
            on: {
                CLICK_APP_REGISTRATION: {
                    target: '.registration',
                },
                CLICK_GUIDE: {
                    target: '.guide',
                },
                CLICK_DOCUMENTATION: {
                    target: '.documentation',
                },
                CLICK_PLAYGROUND: {
                    target: '.playground',
                },
                CLICK_FAQ: {
                    target: '.faq',
                },
                CLICK_JSON_SCHEMAS: {
                    target: '.jsonSchemas',
                },
                CLICK_BUG_BOUNTY: {
                    target: '.bugBounty',
                },
            },
        },
    },
};

const derivAPIEvents = {
    CLICK_PLAYGROUND: function () {
        cy.get('[data-id="/api-explorer/"]').click();
        //user clicks
    },
    CLICK_HOME: function () {
        cy.get('[data-id="/"]').click();
    },
    CLICK_APP_REGISTRATION: function () {
        cy.get('[data-id="/docs/app-registration/"]').click();
    },
    CLICK_DOCUMENTATION: function () {
        cy.get('[data-id="/docs/"]').click();
    },
    CLICK_FAQ: function () {
        cy.get('[data-id="/docs/faq/"]').click();
    },
    CLICK_JSON_SCHEMAS: function () {
        cy.get('[data-id="/docs/json-schemas/"]').click();
    },
    CLICK_BUG_BOUNTY: function () {
        cy.get('[data-id="/docs/bug-bounty/"]').click();
    },
    CLICK_GUIDE: function () {
        cy.get('[data-id="/docs/api-guide/"]').click();
    },
    FILL_TOKEN: function () {
        cy.get('[data-testid="apiTokenInput"]').type(Cypress.env('DERIV_API_TOKEN'));
    },
    EMPTY_TOKEN: function () {
        cy.get('[data-testid="apiTokenInput"]').clear();
    },
    SELECT_API: function () {
        cy.get('[data-testid="apiDropdown').click();
        // select the first option in the dropdown starting with data-testid apiDropdownItem
        cy.get('[data-testid*="apiDropdownItem').first().click();
    },
    CLICK_AUTHENTICATE: function () {
        cy.get('button').contains('Authenticate').click();
    },
    CLICK_MAIN_LOGO: function () {
        cy.get('[data-testid="mainLogo"]').click();
    },
    CLICK_LOGO: function () {
        cy.get('[data-testid="home_logo"]').click();
    }
};

const derivAPIStates = {
    home: () => {
        isScrollOnTop();
        cy.contains(/deriv api/i).should('be.visible');
        cy.contains(/ways to earn with deriv api/i).should('be.visible');
        cy.contains(/register your app with deriv/i).should('be.visible');
        cy.contains(/sign up as an affiliate, build your app/i).should('be.visible');
        cy.contains(/sign up as a payment agent/i).should('be.visible').scrollIntoView();
    },
    playground: () => {
        // checkScroll(); TODO children states cause scroll to not be at top
        cy.get('[data-testid=apiPlayground]').should('be.visible').scrollIntoView();
    },
    registration: () => {
        isScrollOnTop();
        cy.contains(/Log in to your Deriv account to get the API token and start using our API./i).should('be.visible');
    },
    documetnation: () => {
        isScrollOnTop();
        cy.contains(/Quickstart to Deriv API/i).should('be.visible').scrollIntoView();
        cy.contains(/Keep alive/i).should('be.visible').scrollIntoView();
    },
    faq: () => {
        isScrollOnTop();
        cy.get('[data-id=faq]').should('be.visible').scrollIntoView();
    },
    jsonSchemas: () => {
        isScrollOnTop();
        cy.get('[data-id=json-schemas]').should('be.visible').scrollIntoView();
    },
    bugBountry: () => {
        isScrollOnTop();
        cy.get('[data-id=bug-bounty]').should('be.visible').scrollIntoView();
    },
    guide: () => {
        isScrollOnTop();
        cy.get('[data-id=api-guide]').should('be.visible').scrollIntoView();
    },
    notselected_tokenEmpty: () => {
        // apiTokenInput should not have value
        cy.get('[data-testid="apiTokenInput"]').should('have.value', '');
    },
    notselected_tokenFilled: () => {
        // input is filled with token
        cy.get('[data-testid="apiTokenInput"]').should('have.value', Cypress.env('DERIV_API_TOKEN'));
    },
    selected_tokenEmpty: () => {
        // apiTokenInput is empty
        cy.get('[data-testid="apiTokenInput"]').should('have.value', '');
    },
    selected_tokenFilled: () => {
        cy.get('[data-testid="apiTokenInput"]').should('have.value', Cypress.env('DERIV_API_TOKEN'));
    },
    displayAuthDoc: () => {
        cy.get('[data-testid=apiDropdown]')
        .contains(/authorize/i)
        cy.get('[data-testid=playgroundDocs]')
            .should('be.visible')
            .contains(/authorize/i);
    },
    displaySelectedDoc: () => {
        cy.get('[data-testid=apiDropdown]')
        .contains(/authorize/i)
        .should('not.exist');
        cy.get('[data-testid=playgroundDocs]')
        .should('be.visible')
        // should not contain authorize
        .contains(/authorize/i).should('not.exist');
    },
};

// cypress check if the scroll is at the top of the page
const isScrollOnTop = () => {
    cy.window()
        .its('scrollY')
        .should($scrollY => {
            // expect($scrollY).to.have.value(0);
            expect($scrollY).to.be.closeTo(0, 0);
        });
};

// recursive function that mutates derivAPISkeleton to add tests from derivAPIStates
const addTests = (skeleton, testStates) => {
    if (skeleton.states) {
        Object.keys(skeleton.states).forEach(stateKey => {
            skeleton.states[stateKey].meta = {};
            skeleton.states[stateKey].meta.test = testStates[stateKey];
            addTests(skeleton.states[stateKey], testStates);
        });
    }
};

addTests(derivAPISkeleton, derivAPIStates);

export const derivApiMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADugHQAWA9gLZhHqwAqZ+AjAMQDCAMgJJsDS2HAPIBxQYlD4ysdABd0ZAHbiQAD0QBmACwB2Ik3XbtATgBMTIwDZ1+pgBoQAT0SaDRIwA4mABgsBWf+pGvkxMAL6h9igYOATE5FTs3HzYAAocAIIAmsIASoIAqgByACLKktJyispqCCZmRNqBXu4m6uoWmia+2u72TggevkSaXr4W7qaBvl4m4ZFoWHiEpJRgiTz8xYJs+QCyAKKFdOl0XIKFZVKy8kpIqoh1TA1NLW0dXT19iAC05kbDniYLiCQKYFhmcxAUUWsSIEDIAGMAK5UBQyXCVBREfAAG1wDigqDISIUECICjIMlgYBxYARMkg2BkZAA1mAFPsKPgZA4WAAxLgcDjYOiCXiHS4VG7VRDaLwNFq+DzGLydbSaOyOH5aTREAxaYLaEyadwGIyQ6ExZbw5Go9GY7F4glEklkilUml0hkQJms9mc7m8gDK+w4+zYdGw6RSXEl1yqdxqcoVXWVRlVJnVmv630CJj1jU0huNpuMFoWVuINpR7PtN0d+MJxNJ5Mp1Np9MZzLZCj56BxtIgLBDYYjUZjccxMoQHSI7lVHUMIwsdUaXwQ3xM7gsDXTIRMXje2m62nL0SWVcRNbRGPruMbLpb7a9Xb9HK5PP5guFovFFzu5TxrcoA1Jo-wtEY3jHsYJpGJBmjrpuJj-AeFiGK0nTBO0FhnjC1pXnat6KA2zrNmSz6dj63bsn2A6QOsyTpPkdAABKHKcbAnPsk7SomzjqHOSrbqYHitHBQKIUw2hPCuWjqCYfj6ME-i4ZWcIEbWREKAx-DRik2A5PswhcEGdA5CcZz-hIVxTnxG7Ie4RAWOYmh+Mh6heEamgIVqG7pv8TDGsYvguIEQQ4REUIVhe6m2ppmI6dgwj5FwxTcQBNm8SBPxML4AkWJBcodPOYKeIhcHytueXuEWx41foqkxdWhEJZwGzYFsOwHEcFnnDxCbZRujnaFYRg6BYaEKQYny+b8nn5uCSqNNJI3uKekWWk1Gk3q1ST8GkWS5AUJT9cB9wIPoO5guogJAmMIy+L0s0hCFequWMW5KnlmaNbCzXxTciV8ukACKp3TluTxeJBYxwY9IVgT5OaBe0RDNNJvgHl4+g9Jov34XFO2A21yQAFJBuc2BBmwbG7OkQbg3ZnQ7tjRjyWt0neWzknWLoLRLiELh1HjG3RX9211ooiUAEL5MI2DS8ddCZIzg3dPKY1ymtj0uHl2g83BRBjKaHmfT4Hj4+giUHdkeRFKUGVSgNs2tAJjyNB5bMKVJJj2KBr3TEF5itC0niW4lnV7OxvVWSAgG2aAObWLqlitHUrTBJ5Pk1Eq-wuDMHmNGh8m+OEkUUig8B3JtsLxNQtAMMwqvneYAnQwe6YjGBFUWOuLhPDo2Med0gyGOt8znrXqw0PQjAmM3Oe5YJmPY6NmZoX31jDHK+ijMY7gnpbKxUAviBgv87fQ6qqpwemve+eoj3b1YB8TOY5ijEf-1E8R3+S2d8csrnW+GBfMI0RjqhGG0NmSMcrOT0O4RBHRwTGn8CaL+EstJEFQGAKAtAZCoC0qfDcRoApmDZkac+XhRiSQ8HoFcOhrAeEQZ4CKE88KXkJv-IgUAkToBQMQ744x8rkKYWnboT0cxGF0CabwbQdBFi3GNDBXCsH3lIq6VsHoOzel9D2AMPJBGZkqrDJBIRIJWEQjqAsBofYmjNCo683D1FNk0e6CiujqK9n7IOIxyYD4FTMe-SxLt1ROXZpYGGCloKOJaneJ0rinyekono-0H5+jWSdmdGom5-GmO3OY66iEDy6gmK0TyhgtBmG3LEgGxEXGPnIskzxb5aK+MdkBacuSTGBIKcE9QPMhi5Skkwbc1hujOTYVFSeBMnFqISY0uEtB1HpCRDIEgxRER+J6cw5y-TEJ+GGCEaG+g1QSNqT-LEDSyJLNgOooMzTICbIRNswSvS9kWIGb5XU8kxpWFcuMQKWELnOIWWRIxY03m7MKSEnM709RoWukabo5iQVYIAGa4AAI6CJXDucSu8QreHBPffork3BCR8P4Y0QIISixmZwuZDoABWsBFBBgRCQMAFBcBV0yZ0uyQjAj0I6CFGlAT1yBRQqMNo0l9Bbk-vSjhsUmX1gAEZIigNLZshiOkJ2AVYJ4a0FLSNaKMqS646gX08mMQKGFynj2mcqv+RC9VAJyceASgVW6UIKtQ3wkkTS6g+t4MYRUejmiVZWQRY89CiN9emGhz1YZG38Ig7yiKRizDLkAA */
    createMachine(derivAPISkeleton);

const derivAPIModel = createModel(derivApiMachine, { events: derivAPIEvents });

/// <reference types="cypress" />
context('Deriv API full run', () => {
    const testPlans = derivAPIModel.getShortestPathPlans();
    testPlans.forEach(plan => {
        describe(plan.description, () => {
            plan.paths.forEach(path => {
                it(path.description, function () {
                    cy.visit('/').then(path.test);
                });
            });
        });
    });
});
