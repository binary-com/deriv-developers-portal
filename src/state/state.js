import { createMachine } from 'xstate';

export const stateMachine =
    /** @xstate-layout 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-hwjxGFzkco9R2jwUjbKE0FILm8kzBKt-NqGNEQqSWyenWQqSJzi+ixIqRUMQrKSbQxhrDOG8MEY8kR8cpGKPMCozRuj7JOQ8mMPyP4hhzAI3Ota6k3LAhJ2-Nk0mkGemZFRJeDRlkkMoeczJ1zHmwBeZIypvzam6PMwY0xljGa37SnRP1FEdt0S3ivKLOsoRomohotSGU8ZstSZc9hgrRXlO+f8+poL3IuZhYi5ySOSqNjcv1GlUWLDzNzvOJ+aNgRijKvOI5nL0nZNuYU55pTPmWDM0EP0Dy9ocEqG07p-TNWLaXllLqe8ttWLKjrAkTY1IwyBGuPER8B2Bt5bk+5xT3mStXZu8MZQCllJVfLEGqRIsihGWmvO0kTq1RzsmkJhsrEsTMWvGD3Lx35PDfO7D67t34Ycim6FqQ4WjBzeiy9siX4jNzTyKNJ6Zx2vhG7l1xJiJ4jtqiBTo7+XofFd83DhniPFJKRRwZp6LaCqBhtt+YXnWziPh67+9d9InOy6G-L0bl36fDEmyFmb7OosXRfZmi8-4jLqNbF4QqjLZYpIiMSVJ2ShN-TSiW05WB6A8CCbAKQjAoiM+C3zeQMgMVbG7rYztzLdSInxwSNs1xcjdj5bjcIWXTS4bcvAeY9JrSvEoJaVkHQuA8GYPwZYrIFsqvdzEblkawwYndtSU35pG8tGZGQZv7BW-dE77aAjEAMX-SmlLb8JL5r+6OMcDArdHWgv3n+Ky9emQn9aOIa1HLxr+lyAlXUkQWHUmP+PhvzQp8L8gBBkMeRwwZHPX+NKFuCPXtM-DFIXEMW8XwBIcyVEQyFsPVGBGTXgdPUIHIViJ6W4NLd2K-DuflXfa4ciNRAyFscTDdM5amaBYpJyAOXyNCLcMAMrdPQMbUJUOMZWVAzUV8AyG8QPNKBDRUUg7ic5SgyZagxmJCegFCbyaSe5ZBWAGvV3WrGKZgqMLwMTbYFhHvP+XwZraILwP6KxBAqghmbhJqaQ9CeFRFJg24FgtQ9g1iTguWXUXfIMKNP9DIADXtEVC5Yw-WCSMwhqCwgIpVP9blfIJKFhOzVuLQsmL9LjM4CIeaIw0Qkw-wyQrCOgkI8kMImRSIpUaIwmPIbUQ+B-XEQqQqZIvOMQ7hbaTyaGAIlqQKJVKxTPdpdEFsckP6XZdVW4aMKMD7KkE5LwgpHwlIvwmqWo+qHyWQlBRotqdPbsT+R8VrN8EhG4HvDLcMP9bg84A0BKYAsg7wkQqo1IiYqGcwyw-hOYsABY92eKa4J6VYxlCId6IoKaQqWIAXHEIYw4kY44umaoyGHaC4wRfoEIiIeKH9FERiTUCI96bsYBZ8W2Vg1QyogE041yc4wIpVa4WUWDSAmElrMaJtRUFg2xXUJUXPNxQDYQ9hXwiGGqYJG4rnEWO-T8SWaWckLfesH5XfP7SIHPGIRDYY2k3RekgOAzdtdkm2TkjEROWIbUKMUmTIaNUaQQzWUUopSZAxIuEuZkxQkNNKRE1uPUbAlEN6fSVuYkd2KWQIW8UTaXGkiguk7Urha+aeWeXgeqDFTUXwaMUoAyPFUWfPGKR8D8W4EoVENUxiYU34zUqFWBIGCeJcGY+Qp5MElk9GfQ7uH5NRZUTINU4k5Rb8FgztLrbjB-NEzhJM+BJcXhfhdMhbbETPTGCklsbsPjesaI4Bc4REYINsTUR0kU50sU10mslyDFEmHMjtPMsswssNVKHM73NLR2C4Ks1gGFGZW5JknEzsgoYIdJLEMMaMbEW4dcuZWFWZGFNcSckXd2ZiREY4aaPXQFA8zEdtf8QyZUWMoQkcrU6FUpS825VM1BUE5fbIT6DIHPI0D8nA9IHKfwP5GIGC1EXUc8zcm5QJespFDBZfKkRU2IDIW2MkKIV4z+TIeIezHVR8dU0ZP8hM4SDCipBbEMi8C4TYa8LknwEaH8jU+iylH0uCi8SM3IREA+QY0WDEdxDFd2TKJKWUG4ItOMQ+UaIc34rdRNWqWAMjUjVARQNAXSydFZJQ+sP8blDtFsUzVsQIH7fSJKCNNLRJFiG4bsG9TS6vHSxgfSmjRgQ9TMyJMy9tZsH3QZGy7koINAlUTtO-EoNRNyndLSzy1AAUDgJMFgAIMjdPQKiykK6y8ozKEsyXKkPUKM+0g47iDShK-afAa7MAIy4Nc8N8JEIKyy4Kv8fKgnfqO4KWKhWxDpHtdS4DL1GGGqjyPyg0xq7K4Kqy9q2yk9IotRHJNVAySA+K4a6q2q59NHelVVZqnKmasKyDCE7JZUDpfIEgrLYYyq9a+gUasAKQRCVqLKva6atqw6kMRbEnFaoU2xbgta-U7a19cAgkYoLXEHdtW4AtXizAc3QbE7GnGHMbMrNgVMJzYwQsLANQTgJVEoJ2AeEgnwBII62RJhB8cvZUUHfrSnVzanK3C7UrALa1AyOLEoQVBhZLOWBSu4HbZiNuViGXOGhGhXVTALFG11HLdG3gTG7G-y9IbIHIRUPpMoSWUijbD8PYT42NS4S6sg2GiHO5OmkrcbAkCakWTsJbeIFbUaSXCzVifwMPQZDox4zw3Ww7OG2ms7RGm3eHbDVccW1DSW6WjgVjZta8VxWxX8SMdrBaqWTUQyeIY5AW-Wj2wrWnRXW3JfWWi8bEJiXUC4fnd2DEVi78T+bJZiMoR8CaH4s3N2-WoW63ZgJXSAMWpzAUeXLG4OrO0WaIKaUkf07rXUTKCIT3MShJDA6NWijAPW47eu+mpuzO029+AoBWGUH9X3I0bklue2nYcIckO4ZsJO2TH0o0XnfOxUQu4G9IaMEkXUK8azKWIISeqPGPVMePVAKIH0oyW0jIBiTIBIP7I6xiZEDEMkU8-c4-aPQJV+xgPwMAvvIoHJPFbIHZD6sPYB0nf8a8UBCBngPC3fBRRWP+-YJResfYZED3R4kTN8ICdPbk7I2ITtDsg5CoyocoIAA */
    createMachine({
        id: 'app',
        type: 'parallel',
        states: {
            hamburger: {
                initial: 'hamburger_closed',
                states: {
                    hamburger_open: {
                        initial: 'documentation_open',
                        states: {
                            documentation_open: {
                                on: {
                                    TOGGLE_DOCUMENTATION: {
                                        target: 'documentation_closed',
                                    },
                                },
                            },
                            documentation_closed: {
                                on: {
                                    TOGGLE_DOCUMENTATION: {
                                        target: 'documentation_open',
                                    },
                                },
                            },
                        },
                        on: {
                            TOGGLE_HAMBURGER: {
                                target: 'hamburger_closed',
                            },
                            CLICK_OUTSIDE: {
                                target: 'hamburger_closed',
                            },
                        },
                    },
                    hamburger_closed: {
                        on: {
                            TOGGLE_HAMBURGER: {
                                target: 'hamburger_open',
                            },
                        },
                    },
                },
            },
            registration: {
                initial: 'logged_out',
                states: {
                    logged_out: {
                        on: {
                            LOGIN: {
                                target: 'logged_in',
                            },
                        },
                    },
                    logged_in: {
                        initial: 'register_tab',
                        states: {
                            manage_tab: {
                                invoke: {
                                    src: 'setEnvironment',
                                },
                                initial: 'loadingApps',
                                states: {
                                    loadingApps: {
                                        initial: 'loading',
                                        states: {
                                            empty: {},
                                            success: {},
                                            error: {},
                                            loading: {
                                                on: {
                                                    ERROR: {
                                                        target: 'error',
                                                    },
                                                    SUCCESS: {
                                                        target: 'success',
                                                    },
                                                    EMPTY: {
                                                        target: 'empty',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    deletingApp: {
                                        initial: 'modal',
                                        states: {
                                            loadingDelete: {
                                                on: {
                                                    SUCCESS: {
                                                        target: 'successDelete',
                                                    },
                                                    ERROR: {
                                                        target: 'errorDelete',
                                                    },
                                                },
                                            },
                                            successDelete: {},
                                            errorDelete: {},
                                            modal: {
                                                on: {
                                                    DELETE: {
                                                        target: 'loadingDelete',
                                                    },
                                                    CANCEL: {
                                                        target: '#app.registration.logged_in.manage_tab.idle',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                    idle: {},
                                },
                                on: {
                                    FETCH_APP_LIST: {
                                        target: '.loadingApps',
                                    },
                                    DELETE_APP: {
                                        target: '.deletingApp',
                                    },
                                    GO_UPDATE_MODE: {
                                        target: 'update_mode',
                                    },
                                },
                            },
                            register_tab: {
                                initial: 'idle',
                                states: {
                                    idle: {
                                        on: {
                                            SUBMIT: {
                                                target: 'submitting',
                                            },
                                        },
                                    },
                                    submitting: {
                                        on: {
                                            SUCCESS: {
                                                target: 'success_modal',
                                            },
                                            ERROR: {
                                                target: 'error_modal',
                                            },
                                        },
                                    },
                                    success_modal: {
                                        on: {
                                            CLOSE_MODAL: {
                                                target: 'idle',
                                            },
                                        },
                                    },
                                    error_modal: {
                                        on: {
                                            CLOSE_MODAL: {
                                                target: 'idle',
                                            },
                                        },
                                    },
                                },
                                on: {
                                    LOGOUT: {
                                        target: '#app.registration.logged_out',
                                    },
                                },
                            },
                            update_mode: {
                                initial: 'idle',
                                states: {
                                    idle: {
                                        on: {
                                            SUBMIT: {
                                                target: 'updating',
                                            },
                                        },
                                    },
                                    updating: {
                                        on: {
                                            SUCCESS: {
                                                target: 'success_modal',
                                            },
                                            ERROR: {
                                                target: 'error_modal',
                                            },
                                        },
                                    },
                                    success_modal: {
                                        on: {
                                            CLOSE_MODAL: {
                                                target: '#app.registration.logged_in.manage_tab',
                                            },
                                        },
                                    },
                                    error_modal: {
                                        on: {
                                            CLOSE_MODAL: {
                                                target: '#app.registration.logged_in.manage_tab',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        on: {
                            LOGOUT: {
                                target: 'logged_out',
                            },
                            MANAGE_TOGGLE_TAB: {
                                target: '.manage_tab',
                            },
                            REGISTER_TOGGLE_TAB: {
                                target: '.register_tab',
                            },
                        },
                    },
                },
            },
            responsive: {
                initial: 'desktopLaptopL',
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
                        target: '.desktopLaptopL',
                    },
                    GO_LAPTOP: {
                        target: '.desktopLaptopM',
                    },
                    GO_SCREEN4K: {
                        target: '.desktopScreen4k',
                    },
                    GO_MOBILE_L: {
                        target: '.mobileL',
                    },
                    GO_MOBILE_M: {
                        target: '.mobileM',
                    },
                    GO_MOBILE_S: {
                        target: '.mobileS',
                    },
                    GO_TABLET: {
                        target: '.mobileTablet',
                    },
                },
            },
            location: {
                initial: 'deriv_location',
                states: {
                    deriv_location: {
                        on: {
                            TOGGLE_BRANDING_OFF: {
                                target: 'third_party_location',
                            },
                        },
                    },
                    third_party_location: {
                        on: {
                            TOGGLE_BRANDING_ON: {
                                target: 'deriv_location',
                            },
                        },
                    },
                },
            },
            playground: {
                initial: 'notselected_tokenEmpty',
                states: {
                    notselected_tokenEmpty: {
                        initial: 'displayAuthDoc',
                        states: {
                            displayAuthDoc: {},
                        },
                        on: {
                            FILL_TOKEN: {
                                target: 'notselected_tokenFilled',
                            },
                            SELECT_API: {
                                target: 'selected_tokenEmpty',
                            },
                            CLICK_AUTHENTICATE: {
                                target: '.displayAuthDoc',
                            },
                        },
                    },
                    selected_tokenEmpty: {
                        initial: 'displayAuthDoc',
                        states: {
                            displayAuthDoc: {},
                        },
                        on: {
                            EMPTY_TOKEN: {
                                target: 'notselected_tokenEmpty',
                            },
                            FILL_TOKEN: {
                                target: 'selected_tokenFilled',
                            },
                            CLICK_AUTHENTICATE: {
                                target: '.displayAuthDoc',
                            },
                        },
                    },
                    notselected_tokenFilled: {
                        initial: 'displayAuthDoc',
                        states: {
                            displayAuthDoc: {},
                        },
                        on: {
                            SELECT_API: {
                                target: 'selected_tokenFilled',
                            },
                            EMPTY_TOKEN: {
                                target: 'notselected_tokenEmpty',
                            },
                            CLICK_AUTHENTICATE: {
                                target: '.displayAuthDoc',
                            },
                        },
                    },
                    selected_tokenFilled: {
                        initial: 'displaySelectedDoc',
                        states: {
                            displaySelectedDoc: {},
                        },
                        on: {
                            EMPTY_TOKEN: {
                                target: 'selected_tokenEmpty',
                            },
                            CLICK_AUTHENTICATE: {
                                target: '.displaySelectedDoc',
                            },
                        },
                    },
                },
            },
        },
    });
