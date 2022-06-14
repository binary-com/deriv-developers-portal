import { createMachine } from "xstate";

export const stateMachine = 
/** @xstate-layout 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-qUbstw4zRsbplLFOwsTfujIEKIVlkOofQ-QTD2HcP4cI8Rhc5HKPUdo8FI2yhNBSC5vJMw1q7j+E7RiFEo1bEYlfLEFt2qwGXjfIh3t4m0MYawzhvDBGPJEfHKRijzAqM0bo+yTkPJjD8j+IYcwCNzpKvvNym4Nwu2XH2ZlRiZ7slGf-OSE+SGUOOak852TbmwAeZI0p5gzNBD9A8vaHBKhNPad0xmt+aw2OnBbAUakt5ghKIQCUD8+QfkbAxGxsT2XJPSZc3J9zCmvMsDKxV4YAXuRcxC2FzkkclUzW5aLJdadvphuTnqa8HasS4gS8NiTTmZOufk55krs3KtyUUkpJjLGGsW1seGbJUsqSi0yC3V8BlPr-iO215sqUzs5bG6uV12XjCFiwGoTgD3lLPfLEGqRItMYkm-W+RJ0RSh1lxBga4StWKkgKOicHo3nMFaK4p7zvnVPMwYyj61JxmLO3iH9REKruuRHiu7ZsotGJk8sll87uXsM06myVhn-mOSLeC1IULRhVuRde2RaLl4dJ-mKKDyDxx4qkgzleQqn2hX2ZGxdu513ivebu-N+XQXlsq4ixdF9maLytmia0y9qJHwcrneSeK3ZMhXnbYqTrlOrdS5u3b8r93lAKWR7IZjqOp0e4yHFedB9fyduuHWYIH5RrFAKJqQI7tcRR4l2wVMDmBQ24RxwJHT2U8vfd419IgvtQGnCCb7tBwCSCu1EaQqhVsipVRCaU0uG3LwHmPSa0rxKCWlZB0LgPBmD8GWKyKLPOMgxG5ZGsMGIBc0lOYvpkF-WjiDX10Tf4FaC2gIxADF-0ppS2-CS+assUkGSMq3R1UFfeP8KyK-ZkMgHfdXEWFsTKf0XIMMdERUA0fIOzDdcAy-ZfG0QYZ-CDEMPIcMTPIoP8NKFuEtc-TAsgDFM4OsW8dVQMC4IA5sddbic5aBKCKTXgDFQ0VibFJ6W4TIR6APDuflIna4ciNRP-FEPVTxJyAOXyNCLcMAFTAkdvasIHYkKMLwI0J8UnHnAybsT8R2JxVsR8aQ4pWQxmJCegFCbyaSe5ZBWAOfVQ88dQ7UJUOMZWUIFhPQoXYyXYLwP6KxMwyZCw7hJqWw9CeFRFLgwMNwrQzw3Q-7XUInIMKNP9DIADXtEVC5cwhmMI6wrCBQ3yJVP9blFA68H8JJHw64L9TrM4CIeaYIvOUIiScIhqdCEooPVrJKFhRUKowmPIbUTIZhVKckM-LIgpHIkIvIyGHaCI3yFqQKJVKxbuLZdEVrdtLrCaOgjeKMXULwTtJoumFomqbaTyaGewlBRYtqLg7sdja4J6N8EhG4PfVWSiVKO464bsYII4vWCGU4qGeY3hfha4sAW492eKB4zPZ4iId6IoKaU3dKIkA0X4-2Sw2qOY9omGDBEoiIeKH9FEYXW8a8d6AwiIOaPHLQpUVE+mfWWY84iIpVa4WUWDWgoknoh2RUOIlUA5Skc3NA7Itg6YukmqYJMEqA9+BKDQooG2aWckH-GKH5InBIVuCIEgmIVAlg6mIU5omYxCJVUoD8a2YYu2eUxOCzOMNjPpGIQZGkgxIuEucU5wm6ZlYBHwKkViPIFEN6fSVuYkd2KWQIW8LjUTQDVg9hYpe0hBW+XgeqVjHweKUzAyPFUWNUfSR8D8W4EoP3R8RiTUzWcM3RSMrha+RBBw1BQRfoDFAI7uH5NRZUTIUabIGhb8NwvPM4b8CIXVMM7UiMyZKMpcYEpFHEiU6Ud8VYzGXUX8EPGhOMYBc4REYINsTUUMiYwsopfsks-U0cjwakWsjtesvPJssaDuEoJsR8Q0VKViX+GkmFGZW5MUpk49dISMdJLEMMaMbEW4W80pWFWZGFNcas8IeKRsREY4aab8bpUhChGMQyZUfM0ZXsosyZO8m5QJS4xwp5KsnchAPGT6DIZlTUPgt8Tk4kQ0ItIihiWJH86ZNCqI-hLC1-KkYfWIDIW2MkKIOEz+X7PIX8G4XMmi65CpKLNMlJC4TYXEFclhAM84VE1jIQzvR8XIWxf9KMP6SmHs72NGdPDvBAd2TKJKWUJ6akcotRZWG9RNWqWAMjUjVARQNAWyydFZXSt8JEdtZsA4wZQIZUV8JKCNAQxJFiOLTIgUoDAdL1KymyxgeymjRgQ9HC1y7lDtFsb7VsbyhU7rHpKcjEb4qctRCyndSK2ygUDgJMFgAIMjLgv8JKjy1Kv8UfJLYkeIEHDVMMNsMgiYrdSy-afAcrMAJy4NFw6q9ylKjy+qnywPfqO4KWKhWxDpHtUKrqwqnqvq+K50sxYa5KzytKhqudQYtRHJNVAyWggqiKlajyZ9NHelVVNyrauq9KyDPE7JZUDpfIFsb8U6wJc6sAKQRCVqKq262qsah6kMDYbFTtQ0DU2xAyEK7iJar1Kg0Sz5KanYbJDwx2Ba+kBzKnS7CbQraXenZQ1nO1Q0W4WxNlE8z5IyGzaMDLL4n4sXCHPLK7SbWPGbePSADFSSgaEyeheaKkV8G4T8DENii4RJDqtA7Gq3KHBzWHXgeHTgA0rlFhbEO8Mm6IBS+sLk8vfYzIQVfuKvMbGPW3ZTPza1TIZEQ0-Ia4X+MMSDBM7nUIS2IIcmTGp4KW6vY2undmubF-HC9teIfwbGZWLVJ6OsKNZEM4axdqmU-krGy3avGW7LevVmiARvA05LcCo0W8VsP8IoAvQqL+DLNsI+GaBCjAD26TLm0aHmy8Pm0agnblUkUaNKZsI7UzICLgjKgAWlRG1FiGjXxiXIuEqEqCAA */
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
                        CLICK_AUTHENTICATE: {
                            target: 'displayAuthDoc',
                        },
                    },
                },
                notselected_tokenFilled: {
                    on: {
                        SELECT_API: {
                            target: 'selected_tokenFilled',
                        },
                        CLICK_AUTHENTICATE: {
                            target: 'displayAuthDoc',
                        },
                        EMPTY_TOKEN: {
                            target: 'notselected_tokenEmpty',
                        },
                    },
                },
                displayAuthDoc: {
                    on: {
                        EMPTY_TOKEN: {
                            target: 'notselected_tokenEmpty',
                        },
                    },
                },
                selected_tokenEmpty: {
                    on: {
                        FILL_TOKEN: {
                            target: 'selected_tokenFilled',
                        },
                        CLICK_AUTHENTICATE: {
                            target: 'displayAuthDoc',
                        },
                    },
                },
                selected_tokenFilled: {
                    on: {
                        CLICK_AUTHENTICATE: {
                            target: 'displaySelectedDoc',
                        },
                        EMPTY_TOKEN: {
                            target: 'selected_tokenEmpty',
                        },
                    },
                },
                displaySelectedDoc: {
                    on: {
                        EMPTY_TOKEN: {
                            target: 'selected_tokenEmpty',
                        },
                    },
                },
            },
        },
    },
});
