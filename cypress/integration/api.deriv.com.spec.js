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
                playground: {},
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
        cy.contains(/select api call/i).should('be.visible');
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
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADugHQAWA9gLZgDEAwgDICStA0tgAr0CCAmgOIAlAPIBVAHIARRKHxlY6AC7oyAO2kgAHogCMAdgAMRAJwAOACxn9ZgEz6AzDcsBWADQgAnoidmnRM9qdrO11dI20TfX1dAF9otxQMHAJicio6JlZsCSFaEQBZAFExABUuYsYhMXVZeSVVdS0EPUNTCytbB2tnN08EMyNdPztrbTM7IzMANn1tB1j4tCw8QiIIMgBjAFcqFQVcOpV05jYudnZsAQK+RgBlYoEyiqqkEBrFZTUXxrG7Il1rQIDSy6SYGVweLz6IzGYajcZTGZzOIgBJLZKrDbbMC7fYfI6ZPgiRgSArVOTvepfRA-P4A6xAqKg-Tg3p6XymJyTWZRMKTawA+YoxZJFZrLY7PYHfFsbK5QolR6VMm1D4Nal2X7-QG6YFMlmIOz6azGJxGJwmIxGHkDSaC1Ei4hirE4qUMY4cbj8YTiKQvN4HNV9DW07W6sE9LxOQZhQLBULhSIxZH25aOzES3GqaXYABiXAAisqKZ9QN9g1r6TrGeGIQgIoMLSYNdpJsFzSY7cLUxjxdjJXi3ZkAFI3SrYG60AASBTyXBuRYDVKDmrpDJBNd6wW0Jqs-wt2isnM7iW7TozroybAAQiI+Ngr6ISjwF6qlzSK2u9RG+pZjP5DeY4SAk4x5ooQ2acLwgiPr6MjkoupbUtY36TCYJh+PooLmLooyTBMZigQ62ayvkRSlOUSp+vBr6IX0yG1nGf7MgMRp2No2imLEyIqGQKDwC8KboqkYAvpStE2N+-TQqanQmHoJjWEytrJl26Jnn2mYqD2zr9mJrzUXpjSgr4Ux2FyZqOJM-jfvSkwmpyZoakYZlaoRp7phpBxEKgYBQOgsAKKgmmiSWmiIMZfituZ3hdFZ2jfk49jGNYCn9HGdhNsyblqR5LofEQUCbOgKAhYGEWmdFlnWbWLbQqYeiTKakzTGaRjKQsJ45b2eWqEQ+AADa4O4UCoGQmwqBApVLuVUUcTFUzVb0oLbpYKVWrhmHjNloq5bpWnCVN4kmIM0z8pywQak4Th2DZwZtcdmFGF0ExmtY21pt1e1EAAZrgACOh1hQgM1mXNVXxbWETbhaFjBJhFpRiBKmdTtn2aUQABWsCqDc6wkGAFC4PxcEqoZ4W6CZs0WbFi0Go1f6NboTb8v4sbvdp575QARpsUBXmNuy9CTxZlRTkWg9TC0Q70YxmDCOpcoa3itm9yNgR9OnBVRpOhd8UIhpWYbMt+5jGFaaH0plZihEmHXq4DjThN+AC0vxXdYOEuWhkSJdoYDO6MXHREAA */
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
