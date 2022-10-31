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
                                CLICK_DROPDOWN: {
                                    target: 'selecting_api',
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
                        selecting_api: {},
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
        cy.get('[data-id="/app-registration/"]').click();
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
    CLICK_DROPDOWN: function () {
        cy.get('[data-testid="apiDropdown').click();
    },
    CLICK_AUTHENTICATE: function () {
        cy.get('button').contains('Authenticate').click();
    },
    CLICK_MAIN_LOGO: function () {
        cy.get('[data-testid="mainLogo"]').click();
    },
    CLICK_LOGO: function () {
        cy.get('[data-testid="home_logo"]').click();
    },
};

const derivAPIStates = {
    home: () => {
        isScrollOnTop();
        cy.contains(/deriv api/i).should('be.visible');
        cy.contains(/ways to earn with deriv api/i).should('be.visible');
        cy.contains(/register your app with deriv/i).should('be.visible');
        cy.contains(/sign up as an affiliate, build your app/i).should('be.visible');
        cy.contains(/sign up as a payment agent/i)
            .should('be.visible')
            .scrollIntoView();
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
        cy.contains(/Quickstart to Deriv API/i)
            .should('be.visible')
            .scrollIntoView();
        cy.contains(/Keep alive/i)
            .should('be.visible')
            .scrollIntoView();
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
        cy.get('[data-testid=apiDropdown]').contains(/authorize/i);
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
            .contains(/authorize/i)
            .should('not.exist');
    },
    selecting_api: () => {
        // data-testid searchInput should be in focus
        cy.get('[data-testid="searchInput"]').should('have.focus');
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
    /** @xstate-layout N4IgpgJg5mDOIC5QTAJwJYDcD6BDADugHQAWA9gLZhHqwAiZA7gHYDEAwgDICS7A0tk4B5AOJDEofGVjoALujLMJIAJ6IALAAYAbEXUB2bQGYAHAFYTATgCMNy5rMAaEAA9EAJmvui7y5-tmZtb6ZvomAL7hzigYOATE5FQcPPzYAAqcAIIAmiIASkIAqgBydMpSMvKKym4I7p5E+kb2Ju5GRtrq7qEmzmoIluZ6DtpWbZZmmu6R0WhYeISklGDJvAJ0QuyFALIAosUAKpkH3ELF5dJyCkpIrh4NTS1tHV09fYgAtLaWeibW1upmkF1NZtFMZiAYvN4kQIGQAMYAVyozFkuCqzCI+AANrgVFBUGREcwIERmGRZLAwNiwPDZJBsLIyABrMDMXYUfCyFSsABi3E4nGwByEfH2F0q1xqiH0mkarTMg309i6+hB7wQHyM6nURCMTXUQX07nUJn1lghULiizhSJRaIxWNx+MJxNJ5Mp1Np9IgjJZbI5XJ5AGVdpxduwDthMmluBKrtVbrVZfLukqVe41dYNVq-HqDUaTWblZa5tbiLbkWyHdcnXiCUSSWSKVSaXSGUzWezOdzVqk6AU0hsAOrnW4VBM3UC1L5y4wmZVp6w6TN-HOGuXWUI6HTaTNmfWl2ILCsIquo9G1nH111Nj2t70d-3MXnobE0iCsUPhyPR2PxjFpQQToiBMTR1E6fQ1RXTMjBzdwTF0ZVNH+dxNHabQQigo9oRtM97UvRQ6xdRtSQfdtfU7AMex5flBWFUVxXHS5AKTDQflaGxNCwyxTUsGx1Hg3wfB0KC2leawOm0HDy1hfDq0IzFrxIt0iHIn0-S7V930gPsBEyQoDgACX2E52GOXYAKlNiEEBUDFUQvxBnGASc2CawiD3bUjHcbQgiMIJAhkk85LtBSMT0v80mwPJdhEbhgwOPJjlOMdJBY6zp0+XwTE82wILMXwjG4k1BNUT57B+LwDAmQFmgmaSokhMsQsrAiIq4NZsBEQpuDoSzmMlRMss1LcjE8mxZU6MDQTXcrNX4uVEIPExDRCVbJOCmE2vC65Io2LY9kOFKzis4a7k1XLDGaAxtEw3z9TCNySs8hxLCafRglGfQtrwsKLw6lIBAyHJ8iKUozqnC7JN0UFTH+AEzE6Bxenmr4t11bU-L3cwJh8n6mqtVr5IBvbOtSXlMgARUhoCEI8zQbCR-iLDMHVeLctpdE0BctzQlD9VW37T3+mtFEigApYMzmwYN2BM7ZMmDWmbK6bnbB8hdPvZuC0ck4JQMzLMAR8k1hdC88xbYcmBAAIUKERsFt8GDmyFWRu3IheNlBcLEBA99Dc+qiCRs1ioQyZtEGYXIpB3IChKMpBsnZR+g+Z4fE8JpissHztGCdxnFqQ1dUmE1Pr8Ux6Zjm3sAOnZTJOtKQAnVjQDTowAS9rz6jaIJuLK2pFR+QEpmKppMJ8sxIia8kUHgW4iZhRJqFoBgWHdi7NA1LRdFu0wLDsWwHHNleaFgA4yHwTfam3+aINy5oQgQgxNHArRp8Jlrl+WG-srK-o7RxqmhNBMbiiFjDdHNjtUmREYFWz-pqdQeZDBaDVFodoucAGfFBB5awJgCGdDBCaQIppoEkytkQVAYAoC0FkKgRSiCPjGiqv4fUngo5vycHrQYRBQTl07oMAhfxGqzGPNtChikiBQEROgFATDRjjT3BrWwbRuhPTRu9X4y52gGENAhXi5DRZSOUg2VS94vQUU0tRIMTDO76CIFMYE6Esb5wcOuTCXtGaWHzsgqO+oIJGMtiY50Zi7wtksRpKiL43wfiYZmJazNCH-BsMYeCapPKax8UzXyWEgntSvKE28ZFIlPi7IGbk8SUzmCjsk2wcN4LgVApXbiUFtSeEQvk3aRFTHFLUqUyiz5tJxOTm3C66dqlJMQikhpesAp8KNPg4wW5DCgi6bApSRTSKwloMpTIiJZAkAYPCKpiTanTPqWktGfk9D-EZpJVUPR1mUN6dsiAuznTBgGcc059lzn50ubrfomNfAQVcX8bom0v7iL+sEx0rzVLqXQMwKAJ5EFtDlIMQqXhAh3W6OuJGnlRgoV7saQIRhnkhJvKROxIJHGQowa45c3C05s0xehTCe4HChC8JSx0AAzXAABHBRvkvY2Ekg4EEO5tA710BMQYOhAgmgBOCaFuERZwtrAAK1gIoYM8ISBgAoLgBe6UhpQxnMYKqd0S4qpqRqLwPw0IHn1P8TWJ91WyXgVIgARoiKAttGyVNGZlcZyzQLGijsaTufxA7zXqD8N+IR871HaePPlYbW5hpnCEcaXgNbGlBPYdxetTSly5fYAEC5tQRC9Wi0N51c1QT4WwotnDS1py3FHEOgRzBvy8PVOtkQgA */
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
