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
                        notselected: {
                            on: {
                                PLAYGROUND_SELECT: {
                                    target: 'selected',
                                },
                                CLICK_AUTHENTICATE: {
                                    target: 'authenticated',
                                },
                            },
                        },
                        selected: {
                            on: {
                                CLICK_AUTHENTICATE: {
                                    target: 'authenticated',
                                },
                                PLAYGROUND_SELECT: {},
                            },
                        },
                        authenticated: {},
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
            .children()
            .last()
            .contains('account_list');
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
    notselected: () => {
        // cypress no playgroundDocs element exists
        cy.get('[data-testid=playgroundDocs]').should('not.exist');
        cy.get('[data-testid=apiDropdown]')
            .contains(/select api call/i)
            .should('be.visible');
    },
    selected: () => {
        cy.get('[data-testid=playgroundDocs]').should('be.visible');
        cy.get('[data-testid=apiDropdown]')
            .contains(/select api call/i)
            .should('not.exist');
    },
    authenticated: () => {
        cy.get('[data-testid=apiDropdown]')
            .contains(/authorize/i)
            .should('not.exist');
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
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADugHQAWA9gLZgDEAwgDICStA0tgAr0CCAmgOIAlAPIBVAHIARRKHxlY6AC7oyAO2kgAHogAsAViIBOAOy6AzKd0GAHHvNHTAGhABPHQEY3RUwDZtB0wAM2tr29hYAvuFOKBg4BMTkVHRMrNgSQrQiALIAomIAKlz5jEJi6rLySqrqWgh6hibmljZmpvZOrgg+pl5WblY+3gFuulbebpHRaFh4hEQQZADGAK5UKgq4VSpE+AA2uM5QqGTLKhBEKmQKsGC7YIsKkNScvIKiktgAyjn0ObT55TkimUaiQmkQRgMnjcBl0ACYAqY4W5zDC3B0dPVtFYTHCjAEjPjdEY3EZJiAYjN4vMlqswOtNiCdvtDsdTudLtdbvdHhBksw2FwRPkABJ5Yq0Io5QGVEE1RDGfR6AzeSwGAI2bx9DEIXTEwxNbTmbxw7wk0zkylxOYLFZrDZbZkHI4nM5EG53B5PBgC7BC0Xi5hSmXA6pg2qQuFEAn2bRmixwlXaHW+bxEM1GPHDOHmPraS3Ta3EW10hmOvbOtluj08p4vfjCcQSL4-P4AsEVUOg0C1IbaQwIvTaNyqtxwvE63QoohxqG+eEm3RmguxWbF2n2xmqfmpLjsdjYAQ5PiMT75ARFEplDtArbyroaogkk2J-o4qwBOE6tr6Kx9AbeEMIxjBMUQUoWa40na9IOiCO5sHwIiMBI0o3rKYY9oggRWE+I7jlCf5GB+X4uO4BpmAExKmCE1EGCuVI2huMFbio8FpBk2TipepQhne4ZYY+z74W+RGfjqI44eqBhwlYcJLhY+KmvRRZQaWsHbj6qT1m8Ta8XK-EPjhQmvoRxE6toOZEGMfiBMEoRNMpkElpuWxsQAYlwACKekYeChm4S+BHvmJpEIPGVnYp+Fn+COATeI51LOcxrmaWwABSnylF8tBilkXCfD53Z+dhAXCaZIWdDmRiGAEwyqrocbjLJ+ZgVaTlMWWcGpdgABCIh8L17z5DwhX3iVxlBaJJGdIEaZWFCtVuASw6fnCCWEGx2mNpIo0GQAtAM0YBOqWrIn+6pIpODVeEuIShJ+y6tRB8RsekmS5AU3HXjIt76ZhCAHT0tUnbJb4XdNiBwkaVnqjJKpEd40lGpEYGXCg8Bgm11KJGAu3-YDR0g2d82IhDXSqkQDWmGOGq5qYxjreu0GdaoqkuX9ICdnx-16gEM4NXqKI5lRVjiSaNVmDiBgGDZ0uM2zyVMqgYBQOgsAKKgLF435vP83oU5Igppii6FPgGFZhIywiSKwlR8tJSz2xQMs6AoNrtS60OguGyL376DFehjMigEgfbHXqdsFasq6HJXDWXoQO7CqIzO0tLjiJKjJC34pxnVuk7bZJPauiXhyxTrR+y7rcgnScIKDT5SSiRjeNT1OTnFhiqqawTBGMFrFwxTNqeXUculXuDLAoJAwegiybJAdfzVGJLzZCf5Tn4JudJmOF6oS4yIroBKJmHzMRxX49nHXox89JQQNSOU7jkYOqJnNOJxdRqrWNRA9TCXRi59y44zrj4KMlhqZ-hGMEVUOppaGH6PTWEH54TBzPiPR0AAzXAABHG+x89be2FvYbeiBALVRsMORMmZbDDAwezVmAArWAqhPiLBnhQXAGMfroSKh7QhXsDYkONm-amMMTT4mMOvIiVgGGK1ZgAI2WFAHqroFCdF4V2e8nsBbCKNmQh8fNCIjHpofCwdFB4qQdhHOuMl+wTREmZUKe0-DRksMOaWdCfB6EZnXPaS1qrAziqDc6pMdQBOou4z81hn54ksCjcIQA */
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
