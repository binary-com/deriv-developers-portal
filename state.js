import { createMachine } from "xstate";

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAGYA7ADYMAJgAWAM8ATgAGTzCARhCQgA4QgBoQAE9EKL9vAFYMOPcoyLC4gKyMgIBfcuS0TBwCEjIKeuo6RhY2Tm4+AWFRDgAbO0hpeSVVDR19I1MLKyQQW3tHZmc3BC9fQODwyJj4pNT0vwLcgLjvbwLvOLCQr0rq9CaqRrqXmjEWEYUVWgAJYy6ABC2gASnJlKDnIsHL1Vh4wn4MO5vCVPFEggEwrc4p5kmkEDcQrkQgUouT8p4AtcHiAas8GjQGS1PpJNIozJoANK0GTaKQAZTMamU0LssKc8zWBXcyMiQXcWXcJT2cXxiBC6IwkRCAVicT8njyFSqdKeb0Z5AtLIGQwg3zG-0BIPBkLFSzhUoRSJRaIxQWx8Txh0JWU8uSpniyiKKnjjtPpxDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNnFy3hhL86oQflxSICUXc7mi3kVgT8WQTTyTKbTGeW2foucgtEErFwyGYyBgtH4+BHyAgk6gxnQsGXq+YUAkkNBMih8xhVa9CCicTiOU8bcVRSyqKp3jrfjbYW1iO8d1K7j82LiXtMH7VN00zVgczzCcpxnOcwAXZAl0GFc1w3VAt2Qnc9wFbRNE0ZQBQFd0JRWc9L2vbU72ja8n2pV8om8JFPH-EJSmKC57lNRNk1AodehHMd80nDBp1nedF23VDN0k3d910AAFKQAE1iLPUBpSvG8qIfWiXxDPw3yibVyQNTJQlJEIgIwEDB3AgSoOE0S4IQpcIDAfowCEXc0JkqA1HczywAkHC8IIoiT0rT11MQY5lQwLISncYpHyyPxWKyOtyNlW9SVRbFQgCfIrJssDh0g8dHNg8TELYAKvPXJ5MLXfyPN4IKDyPVSotcGKWwCeLEuS7I0qyDKQ0vDFtTONLKWpS53GKnjbLK0cHJgsT4IktzWqkzBcHoCBkH6CQRRUKRRQij1JWii88mJDtsjickCivUlMtMjBSWVNFlTCRjvEWgdSv48qhPW5ytrq3aRIOo6JE0YwDHwxQuuunr6zOWUG000oLlSgJXwA-xlUYhjzgxZjAd4uzQegkSqs2xCJAAMWUKRND+WhjHk+TaA5AUpFR0ibqiJV+siUzvHbZ6Cf0-9w2ODtzkK3Eo0Ari+yW4Gs1pyqNpck7lDO1RufkoXq1FuKJYMqWGJlzLQiY1Kr2xGIsjyPwqeWkHVoq8HqvwCQ5BkWhtHktRTFUXQZBFc2yMNTKEqM0JhrjKXiiNL3tYg32wesrWPgkwQIA84LtCBXQzEFy6SOra8mye79o3ibxmL0glu1vDBCq-bt3eOAys74nXc7pkrC5q2BCHwXAHHqsvQsIuObvr7vG9YnFW8yV9UpyIJmLfM4TMCIeadH4Tx7oCSp5nue133UFD2PCsruF9GKTiXIGNbLFjiVR8d4XAwDiEoT1byXlRKfFagkx4FyvpPQgHAOBwFgLQfah1jrshkAKKOMdjAoxrmpdGj5wxnANEES2YY7ivmuDkd2sRGK4j+lkTUUCfYwIvnAlyGAaDEHoHQdBcMsE4NoNHCOBCX61zIi2T+jcf6Ikoe3GK34kQhGOEaFiW8qRsJHhw1gl8DYlmDvyZe6MzKfy3rqTUuwwhKh3hRS84Q8bBCepeHROc9EYEIKgQ6bU0EHTABgYupccIVyrqYtYDYPxYj1CUUoSowgomDASAoSpu7bFYh2EI35tEa2AlrYeHi1peJ8QIeC6DAneN8ffEK+El6EO6msJOuQEhtmOOcS46IHYlH8Aaa8jsWxeHVo8fJQNCn2T9iU3x5SAlTJ6LJDqz8FiRTRk05sLS7gKI6WSd6k1DReAbFGakns8n5zGWfTxVSyn+LchgKeSCUE3KESWERYj8ERMQAkVR0Yj5GnCNvcaVIcgNgbFQ2KSV3ETLzlcvxFSeHED4QI2GmCXm4PER8wkajPo-LAQkL89FQjGSVqiJKcZ3aQt1pIIxfJq6SKIZE1uFjmJWLjNEWx7gaGtgwAUY4tjGJnGbADU5JVxmUokLoRGxgIS0FkD8VQJggQYvJMkmKf5fDZMxhiKWSVbEUvPpIUEyg5BmAFpCGVoxfgKqVQUexORHF-WyC4iki1YC2GYPYAAbkFYOfNuayF5hI5Zr9qzMVfEET6PhRruDuEckmLq3Weu9SHRQfqZBmwaasxAoaQwqk+nqIof0EgU08PGkQiag4hwFJoQ1hgAhcgxdmlJUZPo0TyFEMIARMiixNCM-Orqy2CC9RW0RMggRmF+IG08jSs21hDKlD8dxYjZI7aNBKwyzT5P7e6wdSaR1jt+LoBts6CT0M+m2DpuIrxJNLduodPro77tUOFOl06ECNo8C2T6rdWy3lvFQnswq4AJp3cOhVZ0j11iSt8xuSo-xUj+gtU5qB+jIBSFAPhhBmAQAwMwegvBYABQ4G1fMvB6AAGsWDKFwKgXgKQWbjsUOarkhgMV3E-qUbstw4zRsbplLFOwsTfujIEKIVlkOofQ-QTD2HcP4cI8Rhc5HKPUdo8FI2yhNBSC5vJMw1q7j+E7RiFEo1bEYlfLEFt2qwGXjfIh3t4m0MYawzhvDBGPJEfHKRijzAqM0bo+yTkPJjD8j+IYcwCNzpKvvNym4Nwu2XH2ZlRiZ7slGf-OSE+SGUOOak852TbmwAeZI0p5gzNBD9A8vaHBKhNPad0xmt+aw2OnBbAUakt5ghKIQCUD8+QfkbAxGxsT2XJPSZc3J9zCmvMsDKxV4YAXuRcxC2FzkkclUzW5aLJdadvphuTnqa8HasS4gS8NiTTmZOufk55krs3KtyUUkpJjLGGsW1seGbJUsqSi0yC3V8BlPr-iO215sqUzs5bG6uV12XjCFiwGoTgD3lLPfLEGqRIssTEmCNibICV2uvmYtqQ0l42yY7TgB+zI2Lt3Ou8V7zvnVPMwYyj61JxmLO3iH9REKruuRHiu7ZsotGKkhiOD0bzmCtFcU-TlT-mOSLeC1IULRhVuRde2RaLl4dJ-mKKDyDxx4qkgzleQqn2hWU-O7l7Dkupu3fK-dhbQXlsq4ixdF9maLytmia0y9qJHwcrneSeK3ZMhXnbYqTrYvqc25u95u7wxlAKWR7IZjqOp0e4yHFedB9fyduuHWbH-PigFE1IEd2uIo9W7YKmBzApacI44Ejp7KeXvu8a+kQX2oDThBN92g4BJBXaiNIVQquPMhBEqKaXDbl4DzHpNaV4lBLSsg6FwHgzB+DLFZFFnnGQYjcsjWGDEAuaSnIX0yc-rRxCr66Bv8CtBbQEYgBi-6U0pbfhJfNWWKSDJGVbo60FfeP8KyS-ZkMgbfdXEWFsTKf0XIMMS4EfNRTpEApfFoMAj4R-SACDEMPIcMTPIoP8NKFuEtM-VAsgDFM4OsW8dVACVsf0VLUTQDc5aBKCKTXgDFQ0VibFJ6W4TIR6APDuflDAC4J6V6AyWKc3DdM5amFgyZJyAOXyNCLcMAWXDgwMbUJUOMZWUIFhHncQm8CINRJxVsR8PVTxeQxmJCegFCbyaSe5ZBWAWfNvasIHYkKMLwI0J8ViTUeiR8YyXYLwP6KxMw4pCw7hJqWw9CeFRFNQ24DQjw7Q7wvQtKfqb8XEKNP9DICnKQkVC5UIhmcI6wrCJQ3yJVP9blfIJKFhRUJJPQsmL9TrM4CIeaEIuQgoiSCIhqdCMooPVrKon8WowmPIInL7VERxYIOzHIgpPIto-WSGHaSI3yFqQKJVKxbuLZdEVrdtLrCaGgjeKMXULwTtVovOMI+YzyaGewlBZYtqDg7sdja4J6N8EhG4XfVWSiVKe464bsYIE4umM4mqbaC4xY3hfhG4sAO492eKR4zPF4iId6IoKaU3dKIkA0P4vWCGQEqGRYwRfoMoiIeKH9FEYXW8a8d6bsYBZ8W2TQ9w9E-2Sw2qBYropVa4WUWDagkkqoh2RUeI+Ah6ZiKMOk+mOYmqYJCEyA9+BKNwooG2aWckb-GKH5YQhIVuCIIgmISY7iZg9hfIkU-AJVUoD8a2TIOUszcaFhNwnQoHTpXJXtXI2QvOAxIuEucU5w88ZlSk1uPUd2Vsb8KIGhQld2KWQIW8LjRgu06Yh02BIGCeJcG+WeXgeqVjHweKUzAyPFUWNUfSR8D8W4EoP3R8RiTUzWbU3RYpJ0hBB5Rwp5PEiUtYQI7uH5NRZUTIUabIGhb8DQvPM4b8CIXVJgmQnUyZCspcUEpFDBKLbEdYzGXUX8EPAM8MIoYMiYsMoUkcjFEmRsjtZsvPNssaDuEoJsR8BsS4O4LXHtKY0sopSZGFGZW5MUlk49dISMdJLEMMaMbEW4IU28m5SpUpJMusjwcIeKRsREY4aab8bpUhChGMQyZUYs0ZQcssm8-8u8wJK46s3El-bIT6DIZlTUHgt8bk4kQ0ItAihiWJb81C386I-hGsl-KkIfWIDIW2Mkf08aWLfwNIxUGRPlSQrUpC686FaiipKLLMlJC4TYXEeIQIO4J8fikswSqFaCVjAQjvPwm4UacIYIBsakdxDFd2TKJKWUJ6TrKMUoYIBKG9RNWqWAMjUjVARQNAByydFZdvesP8blDtFsb7VsQIZUV8JKCNPgxJFiOLbI7iLdGymfeyxgJymjRgQ9QCjypEdtZsI4wZfyhU7rHpWcjEH42ctRayndWy2K1AAUDgJMFgAIMjDgzytKny9Kv8EfJLYkeIEHDVMMNsEgiMqKkq-afAcrMAVy4Nc8N8VK7yjKvylqwPfqOS97cIIMyBQDPqr1GGQajyJKt0m6cary9K3y5qgKudYYpAzUNVAyag4qtagaoa59NHelVVCa-apqrKyDAk7JZUDpfIFsb8K6wJG6jyKQRCVqOqp6xqzKmagkDYbFTtYnTZT4iKzWVa10+619SgnAuanvC4axI0S6rLS3MbfLWnaXZTPzVnO1Q0W4WxNlfcz5IyGzaMDLb434-GiHPLK7SbWPGbe3LA5K6SgaEyeheaKkV8G4T8DEFii4RJHqqQhzcXbDKHBzWHXgeHTgA0lMrYL0xJDIUkbKoXbuRUSS0kfKJUddekOW6PYm6bHzVQ5Kpm5EQ0-Ia4X+MMSDFM7nUIS2IIcmC882qnKvGPOnbmubZ-O2nEfwbGZWLVJ6OsKNZEM4axbqmUhSzAC2qvRW7LOvTmiABvA05LcC3G1sPyooAvQqL+DLUnJ4u4BCjANO6TDFa8OhQXa8FUxqusT+GIO2OaYoYk68ICDg7KgAWlRG1FiEyDoONH+Un3KCAA */
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
