export const isLoggedInSelector = (state) => state.matches('registration.logged_in');
export const isManageAppsTabSelector = (state) => state.matches('registration.logged_in.manage_tab');
export const isManageAppsEmptySelector = (state) => state.matches('registration.logged_in.manage_tab.loadingApps.empty');
export const isDeletingAppModal = (state) => state.matches('registration.logged_in.manage_tab.deletingApp.modal');
export const isMobileSelector = (state) => state.matches('responsive.mobileS')
|| state.matches('responsive.mobileM') || state.matches('responsive.mobileL') || state.matches('responsive.mobileTablet');
export const isRegisterSuccessSelector = (state) => state.matches('registration.logged_in.register_tab.success_modal') || state.matches('registration.logged_in.update_mode.success_modal');
export const isRegisterErrorSelector = (state) => state.matches('registration.logged_in.register_tab.error_modal') || state.matches('registration.logged_in.update_mode.error_modal');
export const isUpdateModeSelector = (state) => state.matches('registration.logged_in.update_mode');
