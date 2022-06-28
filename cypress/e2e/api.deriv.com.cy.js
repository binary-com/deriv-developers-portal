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
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADutmAExgB0AFgPYC2YAxAMIAyAkkwNLYAKLAggE0A4gCUA8gFUAcgBFEofNVjoALumoA7BSAAeiALQBWAGwB2cgEYSATjMBmEvZsAOAAxHLLgDQgAnoiWQeT2RgAsZmHuNm4RLpZGAL6JvigYOAREpBQ09MzsXNiy4kySALIAotIAKvzVbOLSOkoq6lo6+gjG5la2Dk6uHl6+AQgm9iFmlibhJGFhJjEuNsmpaFh4hMRk5BDUAMYArvSaqrhtmuT4ADa4flCo1IeaEOSa1KqwYNdg+6qQ2FU1AA1mBNBVaPhVH4GAAxNgsFjYariThVZrKNQabRIPSIFwuMLkDwmFwOcyRMJGEaGUnkcLxWIE+zTBIrFIgNIbTLbCh7I4nM4XK63e6PZ6vd6fb6-f4QQEgsEQqEwgDKFRYFSY1Ww-B4bAxrWxHXxhOJpjJ9gp82p-lpLnpUUsTJcLJMbNWnPWGS22V2B2OYKF2JFdweTxebw+Xx+fwBQNB4Mh0PyHG4-Ek1QAElV6kw6hVDVj2rjOmYzG5yISZuWbEZIuFbaMrZYrPYpv0bIsFp6uT6sjt+YHTucQzcw+LI1KY7L44rNLD0NcfhAGOrNdrdfqixcTQgCUSSZbrVSaV06QznVFXayjOy1ulNgO+QHBaOtKGxRHJdGZXH5QmYKLsukCpoUGbZrmHAFjuxqloEbjuOQZgkG4zixCYJhzGYNhnkY+HkGElhmMsphREYyz2L23pPry-oCkG76XOOX4SlG0qxnKCqJsBK4MBUZQ8NUgjIqi6K4i0xY4qAnQHuapLkuWNpngYF5Oi6boehyfa0X6Q5vsKLHhmxM7-txSrJjC8KIqJaJNBJmK7vB+5mkeimUk29qOoy16aXe1GPjyemvoxhmisZkamVxgFJiqYHppmOY1NB1SFg5RoljJgT2O2VgkZEzr2PEngkGeJCRMS9hhH09huCh7jmAF3K+oOIUjmFE7fuQUVzjxS58awaa6olUH5qlsGZXiCDWGYRhVl2FGIZYNg2CQJhhCpak+cyrLuk1-Z0fpoVjuFk6vD1AHzrxoECUJIkonZE3SVNcluVaSmnna54OpeGm3veXqBS1L4Me12LxVuPDYKIFTCGwqrVKIdQNPZiiOXBWVdLVRJFcyNjLUVHj2Ges1VlMMzVfMiyIQDOlBa1oPBloEPCJIbCyGlaMZc9nQGNjIQEq6+M2ITRjE19BgkBRxKRGSmEkCQ0xoVR2k0fTIPDkzmgQ8UpSVDUyONE9e45TYxIiy4a02PMHaeVjbhm66AxeG4TiKyrD7Nc+9Ga0xEN8EIYhSHIxvOXzsQC3jBPuGLZ7WBMLjhLLDuxCRCT7bpDO+xcEOwvwACKoeY+HOOC840dE2e7YJ+2hIE1hFMZ+rPsGeDg2FAAUqqjTYKqTA5mU-CqkXU0l5HQsV7HEtYVYzpuNMjLlYsJhN8DLfHcz7fcAAQpIwjYNvwfCSPvP87jE8W5XX0mFW7jxGSxGoYsJGr97R1g5vBTcIPbDSNgLDiGEOIE+hgKIWFCCLeeBIZg5XFqMSwVoBblSiDhRChIzAr1VkDZ8-sBAiAkDIeQ6UpJ7lUl2WeRErQmHnhECiZVwghAWLYIw88cpTEJK-XkOsSjlFzIbVGIBJJOWLsvChCDMI0Nmj4CWphZ6uFWuYS2rslKcOyBDH+f8AFAJAeeaWToYikkcE7XCEsFiHiKlIqWKEqTp09O8FA8BcR0zXrkCgsB9iPGXAqfAOiDDLErORROJBmSkjQipawlZUHz1mrNa2zpaZqxcXQMAvj8ZEkCUYYJrpQlwMMATZC0Q3AzEyY4VwYRVFZ1bh+d+WsdGKwCfMLwFZbBrVJFXBh4xHBVRys6ZY5SsFe0Om1LW5BUBgCgOgWAqhUBMV8TPGYQwKx3nntMExoxFhVgpHecw1DqFiwqRrKplwoCHHQCgOZJByALM8EsmIQRFgqTWoefKTgHCZNaQc9eH9mKnS6tOP80V5zKmhLsSZLF+CHFUJQWQBwdFYUrNQqBngRZETmHhOqkwrFS1CPMds-TPYHWCozJin4Io-g4rOS6iZgV+CjNgfkcLUJXLcEigmqKNpfUWiEcYCwEhBCdkkAZhLKkbx+Z1Ni-zOK9QsiqHR2zmWspRdYDlowl5WCYYsJ+5hEKfJqSSoyZ12IXXMgufqkBQWwHBZC6FsLiHCKmr0yJqF0ILCwhENZiB3RzTCCygxixHDrRcLq4Z+rfkSt-FKqlQEzU-npbarmJDnKOuQs6mIrrsIerGASEI+McKmGXmLTBBLM6HNFaSw1krKUmuuhAHRzpZEoTQmm+W7qzwRACeVFlmEUKoQ8MG4lHVWKRQBdK2KIKIBgtFBCqFML9h1rYXlMkRE0LFWsFXKqxJiK1VdMi0wOV+3ZxOuK4dkaTU0rpQyu1GMHULuIkuwqq7SpfR9RYFl8Q7BGKqp4A9Rzy1dWNTFGl86EGLoKiuvlT74HLGJGEKqiEco02Wj+stBr-0jqjaakCrwJ2WtFKqdDs663lTmssGYd9loKJVYYH6CyLZFXInYINQqS1fJGahky6Hq0xovfGwR6NJqdBmiRha5GVpPLPOtQiVi6wINQeVJjxbm56sHWS7qnGYo1qI54eaZGlpifWuEsW9IiorSKnefCaEzDIe+X+iUcqUIKq8MiqqyrHlrXpLYAkFZE4uyLYDQZRLD0flcb4qWlZPBeHcAreIqE7aSxZebO95UMHV1iNZkZAAzXAABHC5VyWE3I8Hc1ZVceiumcBEd6PK6zpZJQAK1gFoVU+xKBgFoLgRxCb7W83mQV4iRWVkPOng6II5dZP+P6LV4UAAjQ4UBt4RmhHl65-Xln3MzZWOWdglZER9Zqj2-nhWlu+b4ox49y6XynqMPm1sqxuyWURSxB3nHPlSUVQiicgkhPcLkro4Qzauy7FhKqs1nXJGSEAA */
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
