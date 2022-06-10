/// <reference types="cypress" />
context("Deriv API full run", () => {
  const testPlans = cy.testsModel('home').getShortestPathPlans();
  testPlans.forEach((plan) => {
    describe(plan.description, () => {
      plan.paths.forEach(cy.itTests('/'));
    });
  });
});
