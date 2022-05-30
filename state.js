import { createMachine } from "xstate";

export const stateMachine = createMachine({
    id: "app",
    type: "parallel",
    states: {
        hamburger: {
            initial: "hamburger_closed",
            states: {
                hamburger_open: {
                    initial: "documentation_open",
                    states: {
                        documentation_open: {
                            on: {
                                TOGGLE_DOCUMENTATION: {
                                    target: "documentation_closed",
                                },
                            },
                        },
                        documentation_closed: {
                            on: {
                                TOGGLE_DOCUMENTATION: {
                                    target: "documentation_open",
                                },
                            },
                        },
                    },
                    on: {
                        TOGGLE_HAMBURGER: {
                            target: "hamburger_closed",
                        },
                        CLICK_OUTSIDE: {
                            target: "hamburger_closed",
                        },
                    },
                },
                hamburger_closed: {
                    on: {
                        TOGGLE_HAMBURGER: {
                            target: "hamburger_open",
                        },
                    },
                },
            },
        },
        registration: {
            initial: "logged_out",
            states: {
                logged_out: {
                    on: {
                        LOGIN: {
                            target: "logged_in",
                        },
                    },
                },
                logged_in: {
                    initial: "register_tab",
                    states: {
                        manage_tab: {
                            invoke: {
                                src: "setEnvironment",
                            },
                            initial: "loadingApps",
                            states: {
                                loadingApps: {
                                    initial: "loading",
                                    states: {
                                        empty: {},
                                        success: {},
                                        error: {},
                                        loading: {
                                            on: {
                                                ERROR: {
                                                    target: "error",
                                                },
                                                SUCCESS: {
                                                    target: "success",
                                                },
                                                EMPTY: {
                                                    target: "empty",
                                                },
                                            },
                                        },
                                    },
                                },
                                deletingApp: {
                                    initial: "modal",
                                    states: {
                                        loadingDelete: {
                                            on: {
                                                SUCCESS: {
                                                    target: "successDelete",
                                                },
                                                ERROR: {
                                                    target: "errorDelete",
                                                },
                                            },
                                        },
                                        successDelete: {},
                                        errorDelete: {},
                                        modal: {
                                            on: {
                                                DELETE: {
                                                    target: "loadingDelete",
                                                },
                                                CANCEL: {
                                                    target: "#app.registration.logged_in.manage_tab.idle",
                                                },
                                            },
                                        },
                                    },
                                },
                                idle: {},
                            },
                            on: {
                                FETCH_APP_LIST: {
                                    target: ".loadingApps",
                                },
                                DELETE_APP: {
                                    target: ".deletingApp",
                                },
                                GO_UPDATE_MODE: {
                                    target: "update_mode",
                                },
                            },
                        },
                        register_tab: {
                            initial: "idle",
                            states: {
                                idle: {
                                    on: {
                                        SUBMIT: {
                                            target: "submitting",
                                        },
                                    },
                                },
                                submitting: {
                                    on: {
                                        SUCCESS: {
                                            target: "success_modal",
                                        },
                                        ERROR: {
                                            target: "error_modal",
                                        },
                                    },
                                },
                                success_modal: {
                                    on: {
                                        CLOSE_MODAL: {
                                            target: "idle",
                                        },
                                    },
                                },
                                error_modal: {
                                    on: {
                                        CLOSE_MODAL: {
                                            target: "idle",
                                        },
                                    },
                                },
                            },
                            on: {
                                LOGOUT: {
                                    target: "#app.registration.logged_out",
                                },
                            },
                        },
                        update_mode: {
                            initial: "idle",
                            states: {
                                idle: {
                                    on: {
                                        SUBMIT: {
                                            target: "updating",
                                        },
                                    },
                                },
                                updating: {
                                    on: {
                                        SUCCESS: {
                                            target: "success_modal",
                                        },
                                        ERROR: {
                                            target: "error_modal",
                                        },
                                    },
                                },
                                success_modal: {
                                    on: {
                                        CLOSE_MODAL: {
                                            target: "#app.registration.logged_in.manage_tab",
                                        },
                                    },
                                },
                                error_modal: {
                                    on: {
                                        CLOSE_MODAL: {
                                            target: "#app.registration.logged_in.manage_tab",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    on: {
                        LOGOUT: {
                            target: "logged_out",
                        },
                        MANAGE_TOGGLE_TAB: {
                            target: ".manage_tab",
                        },
                        REGISTER_TOGGLE_TAB: {
                            target: ".register_tab",
                        },
                    },
                },
            },
        },
        responsive: {
            initial: "desktopLaptopL",
            states: {
                desktopLaptopL: {},
                desktopLaptopM: {},
                desktopScreen4k: {},
                mobileL: {},
                mobileM: {},
                mobileS: {},
                mobileTablet: {},
            },
            on: {
                GO_LAPTOP_L: {
                    target: ".desktopLaptopL",
                },
                GO_LAPTOP: {
                    target: ".desktopLaptopM",
                },
                GO_SCREEN4K: {
                    target: ".desktopScreen4k",
                },
                GO_MOBILE_L: {
                    target: ".mobileL",
                },
                GO_MOBILE_M: {
                    target: ".mobileM",
                },
                GO_MOBILE_S: {
                    target: ".mobileS",
                },
                GO_TABLET: {
                    target: ".mobileTablet",
                },
            },
        },
    },
});
