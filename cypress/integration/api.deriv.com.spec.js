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
                                CLICK_AUTHENTICATE: {
                                    target: 'displayAuthDoc',
                                },
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
                                CLICK_AUTHENTICATE: {
                                    target: 'displayAuthDoc',
                                },
                                SELECT_API: {
                                    target: 'selected_tokenFilled',
                                },
                            },
                        },
                        selected_tokenEmpty: {
                            on: {
                                CLICK_AUTHENTICATE: {
                                    target: 'displayAuthDoc',
                                },
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
                home: {},
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
    SELECT_API: function () {
        cy.get('[data-testid="apiDropdown').click();
        // select the first option in the dropdown starting with data-testid apiDropdownItem
        cy.get('[data-testid*="apiDropdownItem').first().click();
    },
    CLICK_AUTHENTICATE: function () {
        cy.get('button').contains('Authenticate').click();
    },
};

const derivAPIStates = {
    home: () => {
        cy.contains(/deriv api/i).should('be.visible');
        cy.contains(/ways to earn with deriv api/i).should('be.visible');
        cy.contains(/register your app with deriv/i).should('be.visible');
        cy.contains(/sign up as an affiliate, build your app/i).should('be.visible');
        cy.contains(/sign up as a payment agent/i).should('be.visible');
        checkScroll();
    },
    playground: () => {
        // checkScroll(); TODO children states cause scroll to not be at top
        cy.get('[data-testid=apiPlayground]').should('be.visible');
    },
    registration: () => {
        checkScroll();
        cy.contains(/Log in to your Deriv account to get the API token and start using our API./i).should('be.visible');
    },
    documetnation: () => {
        checkScroll();
        cy.contains(/Quickstart to Deriv API/i).should('be.visible');
    },
    faq: () => {
        checkScroll();
        cy.get('[data-id=faq]').should('be.visible');
    },
    jsonSchemas: () => {
        checkScroll();
        cy.get('[data-id=json-schemas]').should('be.visible');
    },
    bugBountry: () => {
        checkScroll();
        cy.get('[data-id=bug-bounty]').should('be.visible');
    },
    guide: () => {
        checkScroll();
        cy.get('[data-id=api-guide]').should('be.visible');
    },
    notselected_tokenEmpty: () => {
        // cypress no playgroundDocs element exists
        cy.get('[data-testid=playgroundDocs]').should('not.exist');
        cy.get('[data-testid=apiDropdown]')
            .contains(/select api call/i)
            .should('be.visible');
    },
    notselected_tokenFilled: () => {
        // input is filled with token
        cy.get('[data-testid="apiTokenInput"]').should('have.value', Cypress.env('DERIV_API_TOKEN'));
        cy.get('[data-testid=apiDropdown]')
            .contains(/select api call/i)
    },
    selected_tokenEmpty: () => {
        // apiTokenInput is empty
        cy.get('[data-testid="apiTokenInput"]').should('have.value', '');
        cy.get('[data-testid=apiDropdown]')
            .contains(/select api call/i)
            .should('not.exist');
    },
    selected_tokenFilled: () => {
        cy.get('[data-testid="apiTokenInput"]').should('have.value', Cypress.env('DERIV_API_TOKEN'));
        cy.get('[data-testid=apiDropdown]')
            .contains(/select api call/i)
            .should('not.exist');
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
const checkScroll = () => {
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
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADugHQAWA9gLZgDEAwgDICStA0tgAr0CCAmgOIAlAPIBVAHIARRKHxlY6AC7oyAO2kgAHogAsAViIBOAOy6AzKd0GAHHvNHTAGhABPHQEY3RUwDZtB0wAM2tr29hYAvuFOKBg4BMTkVHRMrNgSQrQiALIAomIAKlz5jEJi6rLySqrqWgh6hibmljZmpvZOrgg+pl5WblY+3gFuulbebpHRaFh4hEQQZADGAK5UKgq4VSpE+AA2uM5QqGTLKhBEKmQKsGC7YIsKkNgKZADWYCo5FPgKzsnMbC4InyAAk8sVaEUcuU5IplGokJpEG4AEyBIhGEweTHaHwotzaDo6FEojEogzefx9IzaNw0yYgGIzeLzJarD4bLY7faHY6nc6Xa63e6PCDPN4fL4-P4AMUY9Ho2HyQhYeRhlXhNUQNh63lMI28KNGOoMbiJdVxRF0wSMHmCphsxm0DKZcTmCxWa058O5ByOJzOFyuNzuDyeL3en2+v2oAGUcvQcrR8tguOxGOq4dVEbU3AErEYiLijOTdGiTAYAijzaNC0MjL4jFZ825vCYXdM3cQPez1psfXs-XzA4KQyLwxKVDL0Ls7hB-qkgaDwcwoZmtlqENjPLaC+SAqYDPiDAYa-miAWq25D6iDHorB3YrNu2yvf3VL7eQGBcHhWGxRGHzTrOkBxgmSYpmmGaIhUWYIqAtQ6oYQz6qifRHtWLiIE2+j5to4wono1oUhMUSMp2z6sp6HLvtsg5fvyRBjv+4qRlKMYMACqbAmCBSrvk0IwbCG45siFikiYljWmMISmNoVg1gWRD1pYDaUiY9Jka6lE9m+XL0f6jHMaKrGStGsryoqyqqmUQkatmCHIh4AREIRfgBN4MltjS5oNp4uj9GW2ImPipiPsy7qvjR+k8oZgbGROkbAXOC6AjxK6QgJ66aqJW6mOSrlBfiqIErohq+VYuE2L4hrWBhD5aRRLK6dF8Kpam7DsNgAg5HwjCxvkAhFCUtkyMJOWOV0562oa5L9AWzaYZ0bT6FYfQDN4QwjGMpFTE+zVRX2WztXwIiMBIgljfZ8FIlNVgYq2JKmmtTZVuatKGBYgS6PYsl+OFXZUb23qqO16SZLkBTDaU2UObdgT3TNT3za9S3Ip5hgBEeVhGnqP1Vt4AM6YdIMqO1nC8IIoiSLDN21AjD2zc9C1vVhdRohevj+EEslhLoRMHdRR1tZxqQylwACKtObgzSNzS9i3mm2PQ2It2jkvqQyE41+2RULpPtQAUrGpTYLGtBglkXCxtLuWy498ss2jCDlpjwzeLo1qbf0hEC3rwO0e1ABCIh8NgQfU-kPC25N9tMyjits4E3gXqaATDAENJ5iSfvoOT3D8MI4hSHZcGbgAtAMRDp5Wnn4mtlb5TW1peGVIShATRi52DGTZOC0OjSAsEiZNlc9DXHk4-NjfO4RKuViiVgUk2lJz5EZGXCg8CItpLKJGAMe3WP1dY5P9dLwezs+Po1r6ii+bmAMxi50Dek+i1wtw8PE23Z7Ll6ERa8aIfoOnNI9TGZgCwnj8IeAwL8P6kyIKgMAUB0CwAUKgWih9ah-yLNaT2QCLD2AUknSkF5MR3nvvlAwnt7DwJJrRIgUBljoBQNgxAuCAEEPykQ0BSd9D+FKmMfEm0dr0P1owgyw4fxClDCZQCUZpTsK3FWbQn0SxbW0JnA8jgk7yRPvhQ8+E1oa2dDrCKL4JExSHN+IMsjxwAUnMlSAyimxqM2sMNaP164hDPKSQYgQ7x3jbvhcRAdrEMXin+eRk52KdCumXXKeZKzKQCH-VEQwtFjCVqMIswwLB6j8KMVsYS34fikbYhKjikozjnMovMh4vDjDzM2B0Royzmigcpe+dJIHp3wl3cxgMEGSNitI+YaD6JcGWAoEgEglj1IdPda8YwPI0PknJEhnRdBViaXqLGfg9A1VKa1cpYzbEQEmTyWM0TIDzMWPUssBgLz5TSVWDykDfKe2rgSQpgQTADEGXtCxr9Tl0XOfyVxQxlJbS8SWfovi2YohMD8laQQjzBA8icz+2x97KLxFaQRa0RjBA9uaE8hh+iwNGGkkkJShnEysT6AAZrgAAjsozh+CAo8JAVsxAm1Cw2FpOSEsthhjYsQQAK1gKoWMiwSBgAoLgbeCSR6-x2XgwBvLiHmjRJ4JehojBYwoQtBqwLhkMK5AAI2WFAIOAZfics1VwnlwDdVJ3TheAsIxDzjAPJYSVWDS7qtqIvNRctmao3NOXPw1dLC4gDSEHp-MGXxGUeXPMhYJ512npfGN141FvP1P4VC+Y4HryAA */
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
