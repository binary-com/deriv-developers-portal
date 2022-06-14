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
                    initial: 'notselected',
                    states: {
                        notselected: {},
                        selected: {},
                        authenticated: {},
                    },
                    on: {
                        PLAYGROUND_SELECT: {
                            target: '.selected',
                        },
                        CLICK_AUTHENTICATE: {
                            target: '.authenticated',
                        },
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
    CLICK_AUTHENTICATE: function () {
      // get input api-token-input
      cy.get('[data-testid="apiTokenInput"]').type(Cypress.env('DERIV_API_TOKEN'));
      // cy get by role button that has the text "Authenticate"
      cy.get('button').contains('Authenticate').click();
      // get playground-console
      cy.get('[data-testid="playgroundConsole"]')
      // get last child of playground-console
      .children().last().contains('account_list');
    },
    PLAYGROUND_SELECT: function () {
        cy.get('[data-testid="apiDropdown').click();
        // select the first option in the dropdown starting with data-testid apiDropdownItem
        cy.get('[data-testid*="apiDropdownItem').first().click();

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
        cy.get('[data-testid=apiPlayground]').should('be.visible');
        checkScroll();
    },
    registration: () => {
        cy.contains(/Log in to your Deriv account to get the API token and start using our API./i).should('be.visible');
        checkScroll();
    },
    documetnation: () => {
        cy.contains(/Quickstart to Deriv API/i).should('be.visible');
        checkScroll();
    },
    faq: () => {
        cy.get('[data-id=faq]').should('be.visible');
        checkScroll();
    },
    jsonSchemas: () => {
        cy.get('[data-id=json-schemas]').should('be.visible');
        checkScroll();
    },
    bugBountry: () => {
        cy.get('[data-id=bug-bounty]').should('be.visible');
        checkScroll();
    },
    guide: () => {
        cy.get('[data-id=api-guide]').should('be.visible');
        checkScroll();
    },
    notselected: () => {
      // cypress no playgroundDocs element exists
      cy.get('[data-testid=playgroundDocs]').should('not.exist');
      cy.get('[data-testid=apiDropdown]').contains(/select api call/i).should('be.visible');
    },
    selected: () => {
        cy.get('[data-testid=playgroundDocs]').should('be.visible');
        cy.get('[data-testid=apiDropdown]').contains(/select api call/i).should('not.exist');
    },
    authenticated: () => {
      cy.get('[data-testid=apiDropdown]').contains(/authorize/i).should('not.exist');
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
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADugHQAWA9gLZgDEAwgDICStA0tgAr0CCAmgOIAlAPIBVAHIARRKHxlY6AC7oyAO2kgAHogAsAViIBOAOy6AzKd0GAHHvNHTAGhABPHQEY3RUwDZtB0wAM2tr29hYAvuFOKBg4BMTkVHRMrNgSQrQiALIAomIAKlz5jEJi6rLySqrqWgh6hibmljZmpvZOrgg+pl5WblY+3gFuulbebpHRaFh4hEQQZADGAK5UKgq4VSpE+AA2uM5QqGTLKhDUnLyCopLYAMo59Dm0+eVyispqSJqIBt49RgMACZTAMAqYgW4gd4OjpzEQ3AEgdogUY3MFgkCAt5JiAYjN4vMlqswOtNp8dvtDsdTucGMw2FwRPkABJ5Yq0Io5N6VT41RBWEwIoHGIy+LGmbQWWF1f5EUb+YHjaFI0y4-FxOYLFZrDZbZIM7BcdjsbACHJ8Rh3fICIolMrfCofarfWqBKxENHeIEi-qCqxImVtfRWPoDbxDEZjCZRPHTTXEbUksn6+mpPgiRgSbmO95bfldAIer0+gx+owBoEy7SefxmAK6ewhSUGdXx2aJ4m68mqA2pdKZXIFO2lHnOr6gN1Fz1ub2+0MVwMuRCzj0GALAqxA3T-RtInGxjUdok60l6z59tiXfjCcRSXO8l2TxDumdzssLyvVkFEMZ+QLBKETRtrEx5Jt2qYpGwABiXAAIpjvmrovtOJbzv6S6dN49i-tolYov4s7YiBBJal2Z49iol7YAAUncpT3LQbJZFwdyIXyyGFsWs6luWX7LggIJGIYATDN4ui6NoEb9MiJEJieybnr2aZsAAQiIfDYKpNz5Dw7FPj8XFvrxn6YSh3i-mWomIkYNZIkCckdtR17XHe+kToZAC0AxEKJ67eFufrrhCMoSdoXg7iEoT7kYjnxNRA7ZOyI4OjIeYcc+CDeT0fnYoFobBVWAnIj0VjrkCZXYWMwJSpEsYqGQKDwN8R6EokYDuQW2W+RueWQgV4JFZ0Pj6JJphQkW5gDMYcVkaeKYUuBFFIWlj4ebUEkBEQeh6LobgQhY9hWDKPEiWYgoGAY-6XbNnbzUp2yoGAUDoLACioJRnWcZt22SRJ+0go2oJBt4Bi-kYgIooNBgSfYt0KRBFJQMs6AoF9mU-Tt-0HUDx0CRYhjjXoYyQhG0bw0tC2qJSBxHCcZxEA1CiwGAuxgIsCiQOjhmLttAQQ7Z+38yK34Wc0eFWLoPoQkYDYU+RVPbHstM0gzLNsxzXMPuOBa89o-MQzWgRGCLAl+GDCqmEqUJDCC8v3ZRNPUvTEBELgywKCQZ7oIsmxa6tOucXrBuC8bpudI2QLypWfyyxVEO6PbimO8rzu0tztQmBZ+sC0bwsGEGNZEEMYobjDZiSSYSeI9T7UZy+3ryoRoYjME4kypdhj9FbMMBlLpPV8tFIAGa4AAjvXCCY39e040dMoRsJNg1iKJu2MMg+K0QABWsCqHcixexQuDNQHK2GdPu0A4dwPFeNlnerLorWBWVibw9RAAEbLFAqn0wonQz4ZQvroLaWNZ6A3nvjUSv5BQjCtuMcElh36fW1ufWoFVwpoQ-BhIaiBPJ+F8pYGsl114+D0LdSenkbI9X8vlMqg0ZTUMlEQpE1g9o+hMK2OqQA */
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
