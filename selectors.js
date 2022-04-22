export const isLoggedInSelector = (state) => state.matches('registration.logged_in');
export const isManageAppsTabSelector = (state) => state.matches('registration.logged_in.manage_tab');
export const isManageAppsEmptySelector = (state) => state.matches('registration.logged_in.manage_tab.loadingApps.empty');
