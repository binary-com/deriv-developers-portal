export const derivApiMachine = (initial = 'home') => ({
  id: "current_api_deriv_com",
  initial,
  on: { CLICK_PLAYGROUND: "playground", CLICK_DOCUMENTATION: "documentation" },
  states: {
    documentation: {
      on: { ...documentationNavigationEvents },
    },
    registration: {
      on: { ...documentationNavigationEvents },
    },
    guide: {
      on: { ...documentationNavigationEvents },
    },
    playground: {
      on: { CLICK_HOME: "home", CLICK_DOCUMENTATION: "documentation" },
    },
    home: {
      on: { CLICK_PLAYGROUND: "playground", CLICK_DOCUMENTATION: "documentation" },
    },
    faq: {
      on: { ...documentationNavigationEvents },
    },
    jsonSchemas: {
      on: { ...documentationNavigationEvents },
    },
    bugBounty: {
      on: { ...documentationNavigationEvents },
    },
  },
});
const documentationNavigationEvents = {
  CLICK_APP_REGISTRATION: "registration",
  CLICK_GUIDE: "guide",
  CLICK_DOCUMENTATION: "documentation",
  CLICK_PLAYGROUND: "playground",
  CLICK_HOME: "home",
  CLICK_FAQ: "faq",
  CLICK_JSON_SCHEMAS: "jsonSchemas",
  CLICK_BUG_BOUNTY: "bugBounty",
};
