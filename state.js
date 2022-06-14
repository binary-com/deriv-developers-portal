import { createMachine } from "xstate";

export const stateMachine = 
/** @xstate-layout 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-qUbstw4zRsbplLFOwsTfujIEKIVlkOofQ-QTD2HcP4cI8Rhc5HKPUdo8FI2yhNBSC5vJMw1q7j+E7RiFEo1bEYlfLEFt2qwGXjfIh3t4m0MYawzhvDBGPJEfHKRijzAqM0bo+yTkPJjD8j+IYcwCNzpKvvNym4Nwu2XH2ZlRiZ7slGf-OSE+SGUOOak852TbmwAeZI0p5gzNBD9A8vaHBKhNPad0xmt+aw2OnBbAUakt5ghKIQCUD8+QfkbAxGxsT2XJPSZc3J9zCmvMsDKxV4YAXuRcxC2FzkkclUieMiqK8RJmIcvGvxiIgm-2IixCWrLEmnMydc-JzzJXZuVbkopJSTGWMNYtrY8M2SpZUlFpkFur4DKfX-B25sVJmypWGxd3L2HVyuuy8YQsWA1CcEe8pF75Yg1SJFliYkwRsTZASu118zFtSGkvG2HHacAP2ZG5dtgqYHMI94EjlH1WNNae5vVl9maLxhllNeaIDZnodhiK+XE-h2WlHx+22IkOctjYK0VxT3nfOqeZgx9H1qTjMWdvEP6iIVXdciPFd2zZRaMVJDEOXo3nOK6myV1X-mOSLeC1IULRhVuRbe2RaLl4dJ-mKODyDxx4qkgzleQqX2hU06hwrm7xXvP3fm87oLy2PcRYutzxr6RWzRNaZe1Ej49snvJPFbsmQrztsVJ163dO7e3cT+Vh7ygFJo9kMxjHU6ecZDivOg+v5O3XDrHjk3xQCiakCO7XEtfof07h6hgU8fkccFR899vr2s8WzN9qA04QI-doOASQV2ojSFUKgTzIQRKimlw25eA8x6TWleJQS0rIOhcB4MwfgyxWRRcNxkGIblSNMMDEU3GkU5J-JkSA1ocQd-LoL-cCWgW0AjCADFf6KaKWb8EleaWWFJAyIyVuR1UFfeP8KyaA5kMgX-b3EWFsTKf0XIMMdERUA0fIOzDdCgqAl-G0QYFAiDEMPIcMHvIoP8NKFuM7XtaAjFM4OsW8dVQMC4Yg5sddbic5aBKCKTXgDFQ0VibFJ6W4TIR6YvZRQIDAC4J6V6AyWKaPdgkVC5YpJyAOXyNCLcMAFTAkTfc8YHYkKMLwI0J8ViTUAHbsT8R2JxVsR8PVTxBwxmJCegFCbyaSe5ZBWAe-Dwm6Lw7UJUOMZWUIFhQ3P+XwdEXYLwP6KxSI+whmbhJqBI9CeFRFLQwMTI3wnIgI-ItKfqb8XEKNP9DIanGwgpOwyZaIqouIrCZw3yJVP9blVg68H8JJfIsmL9TrM4CIeacooYyoiSaohqdCSY0vVrJKFhRUeYwmPIUnTA0aY4MmdYvOYYyGHaGo3yFqQKJVKxbuLZdEVrdtLrCaOQjeKMXULwTtG4umO4mqbaTyaGJIlBZ4tqLQ7sdja4J6N8EhG4f-VWSiVKBE64bsYIEEvWCGcEqGR43hfhWEsAeE92eKJEnvVEiId6IoKaSPdKIkA0fE-2GI2qB4nYmGDBSYiIeKH9FEC3W8a8d6YIw7C4aILInw9k+mfWe4yEmopVa4WUWDWQkUw4h2RUJolUA5SkawlQ6mNQjYhUmqYJCk6g9+BKbwooG2aWckXAmKH5UwhIVuCIUQmINgo072XRCos0-AJVKXT8SWB0szcaFhbw0IJKPpGIQZOUgxIuEuS0tI9GZlYBHwKkViPIFEN6fSVuYkd2KWQIW8LjUTQDVQ9hYpRMhBW+XgeqVjHweKUzAyPFUWNUfSR8D8W4EoQvR8Rib0zWSsv0yZGspcaElIp5foDFEo7uH5NRZUTIUabIGhb8TIwfM4b8CIXVCs40qs0crhCSUkpFPkq06Ud8d4zGXUX8cvGhOMYBc4E7UszUcs3tWwk0vOMcmc6kOcjtBcwfZcsaDuEoJsR8Q0VKViX+OUmFGZW5C0lU49dISMdJLEMMaMbEW4aC0pWFWZGFNcGc8IeKRsREY4aab8bpUhChGMQyZUQc0ZPckc6FbC2CwJCc1BQRacs8xAPGT6DIZlTUPQt8bU4kQ0ItAShiWJLC6ZG5QJY8qctAqkE-WIDIW2MkKIBkz+P7PIX8G4fsqS65CpKLDslJC4TYXEF8lhIs84dk1jIwi8Xs3IWxf9KMP6SmXc30t+LvbPBAd2TKJKfnLVGYtRZWG9RNWqWAMjUjVARQNAKKydFZbyt8JEdtZsIEwZQIZUV8JKCNAwxJFiOLPo7iLdMKu-SKxgGKmjRgQ9Li+sP8blDtFsH7VsDKp07rHpa8jEXE68tRUKndcKsq1AAUDgJMFgAIMjLQuqlKxq1Kv8M-JLYkeINrPUQvUs8Q-o4qvq-afAcrMAeK4NTwyahqtK5quaudSaO4KWKhWxDpHtda4DL1GGbajyaq1MyJQ61Kpq2azKudM4tRHJNVAyWQ3qh6rana59THelVVZKo6z6lqyDAU7JZUDpfIFsb8YGwJUGjyKQRCVqCa6Gj6mauGkMDYbFTtMnTZLEwqzWDar1KQ4yz5fqWICIbJbIx2W6+kBzG3K7CbQre3FXNwrXO1Q0W4WxNlICz5IyGzaMDLHEvE87eXPLa7SbBvGbJvSADFcygaEyeheaKkMXD8XYZsAw7VNajm2nWfWHRnRHZfIMpsrYVuLEfINKcMlJR8buRUUy0kfKJUZQp4TmuvePZXZTPza1TIZEKXfIa4X+MMSDJsg3UIS2IIcmdmv282uPZWhPVWubVAmqmXTS7GZWLVJ6OsKNZEM4axNsa2Q01O2PZzS27LRfDOm23OsC-wCmXEVsZqooYfQqL+DLCnZEu4OijAf26HDW0aLWy8HW6ausT+OMy43UFK1C18jdLQ1qgAWlRG1FiGjXxmCGFOv3KCAA */
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
                            target: 'selected_tokenEmpty',
                        },
                        SELECT_API: {
                            target: 'selected_tokenEmpty',
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
