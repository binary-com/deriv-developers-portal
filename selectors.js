export const isLoggedInSelector = (state) => state.matches('registration.logged_in');
export const isManageAppsTabSelector = (state) => state.matches('registration.logged_in.manage_tab');
export const isManageAppsEmptySelector = (state) => state.matches('registration.logged_in.manage_tab.loadingApps.empty');
export const isDeletingAppModal = (state) => state.matches('registration.logged_in.manage_tab.deletingApp.modal');
export const isMobileSelector = (state) => state.matches('responsive.mobileS')
|| state.matches('responsive.mobileM') || state.matches('responsive.mobileL') || state.matches('responsive.mobileTablet');