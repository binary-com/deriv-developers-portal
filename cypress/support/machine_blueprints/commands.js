import { createTestModel } from "./createTestModel.js";
import { derivApiMachine } from "./derivApiMachine";
import { homeSliderMachine } from "./homeSliderMachine.js";

const cypressStates = {
  home: () => {
    cy.contains(/deriv api/i).should('be.visible');
    cy.contains(/ways to earn with deriv api/i).should('be.visible');
    cy.contains(/register your app with deriv/i).should('be.visible');
    cy.contains(/sign up as an affiliate, build your app/i).should('be.visible');
    cy.contains(/sign up as a payment agent/i).should('be.visible');
  },
  documentation: () => {
    cy.contains(/quickstart to deriv/i).should('be.visible');
  },
  playground: () => {
    cy.contains(/select api call/i).should('be.visible');
  },
  registration: () => {
    cy.contains(/Log in to your Deriv account to get the API token and start using our API./i).should('be.visible');
  },
  documetnation: () => {
    cy.contains(/Quickstart to Deriv API/i).should('be.visible');
  },
  faq: () => {
    cy.get('[data-id=faq]').should('be.visible');
  },
  jsonSchemas: () => {
    cy.get('[data-id=json-schemas]').should('be.visible');
  },
  bugBountry: () => {
    cy.get('[data-id=bug-bounty]').should('be.visible');
  },
  guide: () => {
    cy.get('[data-id=api-guide]').should('be.visible');
  },  
};

const cypressEvents = {
  CLICK_PLAYGROUND: function () {
    cy.get('[data-id="/api-explorer/"]')
    .click();
    //user clicks
  },
  CLICK_HOME: function () {
    cy.get('[data-id="/"]')
    .click();
  },
  CLICK_APP_REGISTRATION: function () {
    cy.get('[data-id="/docs/app-registration/"]')
      .click();
  },
  CLICK_DOCUMENTATION: function () {
    cy.get('[data-id="/docs/"]')
    .click();
  },
  CLICK_FAQ: function () {
    cy.get('[data-id="/docs/faq/"]')
    .click();
  },
  CLICK_JSON_SCHEMAS: function () {
    cy.get('[data-id="/docs/json-schemas/"]')
    .click();
  },
  CLICK_BUG_BOUNTY: function () {
    cy.get('[data-id="/docs/bug-bounty/"]')
    .click();
  },
  CLICK_GUIDE: function () {
    cy.get('[data-id="/docs/api-guide/"]')
    .click();
  },
};

const cypressMobileStates = {
  home: () => {
    cy.contains(/deriv api/i).should('be.visible');
    cy.contains(/ways to earn with deriv api/i).should('be.visible');
    cy.contains(/register your app with deriv/i).should('be.visible');
    cy.contains(/sign up as an affiliate, build your app/i).should('be.visible');
    cy.contains(/sign up as a payment agent/i).should('be.visible');
  },
  documentation: () => {
    cy.contains(/quickstart to deriv/i).should('be.visible');
  },
  playground: () => {
    cy.contains(/select api call/i).should('be.visible');
  },
  registration: () => {
    cy.contains(/Log in to your Deriv account to get the API token and start using our API./i).should('be.visible');
  },
  documetnation: () => {
    cy.contains(/Quickstart to Deriv API/i).should('be.visible');
  },
  faq: () => {
    cy.get('.doc-main-title').contains(/FAQ/i).should('be.visible');
  },
  jsonSchemas: () => {
    cy.get('.doc-main-title').contains(/JSON Schemas/i).should('be.visible');
  },
  bugBountry: () => {
    cy.get('.doc-main-title').contains(/Bug Bounty/i).should('be.visible');
  },
  guide: () => {
    cy.get('[data-id=api-guide] h1').contains(/API guide/i).should('be.visible');
  },
}

const homeSliderStates = {
  alessandro: () => {
    cy.get(`[aria-label="slider-content"]`).contains(/alessandro/i)
  },
  thiago: () => {
    cy.get(`[aria-label="slider-content"]`).contains(/thiago/i)
  },
  josh: () => {
    cy.get(`[aria-label="slider-content"]`).contains(/josh/i)
  },
}

const homeSliderEvents = {
  DRAG_LEFT: () => {
    cy.get(`[role="slider"][aria-label="home"]`)
    .trigger("mousedown", { button: 0 })
    .trigger("mousemove", { clientX: -275, clientY: 0 })
  },
  DRAG_RIGHT: () => {
    cy.get(`[role="slider"][aria-label="home"]`)
    .trigger("mousedown", { button: 0 })
    .trigger("mousemove", { clientX: 275, clientY: 0 })
  },
  CLICK_LEFT: () => {
    cy.get(`[role="button"][aria-label="left"]`).click();
    cy.wait(1000);
  },
  CLICK_RIGHT: () => {
    cy.get(`[role="button"][aria-label="right"]`).click();
    cy.wait(1000);
  },
}

const itVisitsAndRunsPathTests = (url) => (path) => {
  it(path.description, function () {
    cy.visit(url).then(path.test);
  });
};

cy.itTests = (appAddress) => itVisitsAndRunsPathTests(appAddress);
cy.testsModel = (initialState) => createTestModel(derivApiMachine(initialState), cypressStates, cypressEvents);
cy.testsMobileModel = (initialState) => createTestModel(derivApiMachine(initialState), cypressMobileStates, cypressMobileEvents);
cy.homeSliderTestsModel = () => createTestModel(homeSliderMachine(), homeSliderStates, homeSliderEvents);
