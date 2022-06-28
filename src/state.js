import { createMachine } from "xstate";

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAGYA7ADYMAJgAWAM8ATgAGTzCARhCQgA4QgBoQAE9EKL9vAFYMOPcoyLC4gKyMgIBfcuS0TBwCEjIKeuo6RhY2Tm4+AWFRDgAbO0hpeSVVDR19I1MLKyQQW3tHZmc3BC9fQODwyJj4pNT0vwLcgLjvbwLvOLCQr0rq9CaqRrqXmjEWEYUVWgAJYy6ABC2gASnJlKDnIsHL1Vh4wn4MO5vCVPFEggEwrc4p5kmkEDcQrkQgUouT8p4AtcHiAas8GjQGS1PpJNIozJoANK0GTaKQAZTMamU0LssKc8zWBXcyMiQXcWXcJT2cXxiBC6IwkRCAVicT8njyFSqdKeb0Z5AtLIGQwg3zG-0BIPBkLFSzhUoRSJRaIxQWx8Txh0JWU8uSpniyiKKnjjtPpxDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNnFy3hhL86oQflxSICUXc7mi3kVgT8WQTTyTKbTGeW2foucgtEErFwyGYyBgtH4+BHyAgk6gxnQsGXq+YUAkkNBMih8xhVa9CCicTiOU8bcVRSyqKp3jrfjbYW1iO8d1K7j82LiXtMH7VN00zVgczzCcpxnOcwAXZAl0GFc1w3VAt2Qnc9wFbRNE0ZQBQFd0JRWc9L2vbU72ja8n2pV8om8JFPH-EJSmKC57lNRNk1AodehHMd80nDBp1nedF23VDN0k3d910AAFKQAE1iLPUBpSvG8qIfWiXxDPw3yibVyQNTJQlJEIgIwEDB3AgSoOE0S4IQpcIDAfowCEXc0JkqA1HczywAkHC8IIoiT0rT11MQY5lQwLISncYpHyyPxWKyOtyNlW9SVRbFQgCfIrJssDh0g8dHNg8TELYAKvPXJ5MLXfyPN4IKDyPVSotcGKWwCeLEuS7I0qyDKQ0vDFtTONLKWpS53GKnjbLK0cHJgsT4IktzWqkzBcHoCBkH6CQRRUKRRQij1JWii88mJDtsjickCivUlMtMjBSWVNFlTCRjvEWgdSv48qhPW5ytrq3aRIOo6JE0YwDHwxQuuunr6zOWUG000oLlSgJXwA-xlUYhjzgxZjAd4uzQegkSqs2xCJAAMWUKRND+WhjHk+TaA5AUpFR0ibqiJV+siUzvHbZ6Cf0-9w2ODtzkK3Eo0Ari+yW4Gs1pyqNpck7lDO1RufkoXq1FuKJYMqWGJlzLQiY1Kr2xGIsjyPwqeWkHVoq8HqvwCQ5BkWhtHktRTFUXQZBFc2yMNTKEqM0JhrjKXiiNL3tYg32wesrWPgkwQIA84LtCBXQzEFy6SOra8mye79o3ibxmL0glu1vDBCq-bt3eOAys74nXc7pkrC5q2BCHwXAHHqsvQsIuObvr7vG9YnFW8yV9UpyIJmLfM4TMCIeadH4Tx7oCSp5nue133UFD2PCsruF9GKTiXIGNbLFjiVR8d4XAwDiEoT1byXlRKfFagkx4FyvpPQgHAOBwFgLQfah1jrshkAKKOMdjAoxrmpdGj5wxnANEES2YY7ivmuDkd2sRGK4j+lkTUUCfYwIvnAlyGAaDEHoHQdBcMsE4NoNHCOBCX61zIi2T+jcf6Ikoe3GK34kQhGOEaFiW8qRsJHhw1gl8DYlmDvyZe6MzKfy3rqTUuwwhKh3hRS84Q8bBCepeHROc9EYEIKgQ6bU0EHTABgYupccIVyrqYtYDYPxYj1CUUoSowgomDASAoSpu7bFYh2EI35tEa2AlrYeHi1peJ8QIeC6DAneN8ffEK+El6EO6msJOuQEhtmOOcS46IHYlH8Aaa8jsWxeHVo8fJQNCn2T9iU3x5SAlTJ6LJDqz8FiRTRk05sLS7gKI6WSd6k1DReAbFGakns8n5zGWfTxVSyn+LchgKeSCUE3KESWERYj8ERMQAkVR0Yj5GnCNvcaVIcgNgbFQ2KSV3ETLzlcvxFSeHED4QI2GmCXm4PER8wkajPo-LAQkL89FQjGSVqiJKcZ3aQt1pIIxfJq6SKIZE1uFjmJWLjNEWx7gaGtgwAUY4tjGJnGbADU5JVxmUokLoRGxgIS0FkD8VQJggQYvJMkmKf5fDZMxhiKWSVbEUvPpIUEyg5BmAFpCGVoxfgKqVQUexORHF-WyC4iki1YC2GYPYAAbkFYOfNuayF5hI5Zr9qzMVfEET6PhRruDuEckmLq3Weu9SHRQfqZBmwaasxAoaQwqk+nqIof0EgU08PGkQiag4hwFJoQ1hgAhcgxdmlJUZPo0TyFEMIARMiixNCM-Orqy2CC9RW0RMggRmF+IG08jSs21hDKlD8dxYjZI7aNBKwyzT5P7e6wdSaR1jt+LoBts6CT0M+m2DpuIrxJNLduodPro77tUOFOl06ECNo8C2T6rdWy3lvFQnswq4AJp3cOhVZ0j11iSt8xuSo-xUj+gtU5qB+jIBSFAPhhBmAQAwMwegvBYABQ4G1fMvB6AAGsWDKFwKgXgKQWbjsUOarkhglXHCMqSTIwRvyJNFsexApR+oZANAfW4RohW9uQ6h9D9BMPYdw-hwjxGFzkco9R2jwUjbKE0FILm8kzBKt-NqGNEQqSWyenWQqSJzi+ixIqRUMQrKSbQxhrDOG8MEY8kR8cpGKPMCozRuj7JOQ8mMPyP4hhzAI3Ota6k3LAhJ2-Nk0mkGemZFRJeDRlkkMoeczJ1zHmwBeZIypvzam6PMwY0xljGa37SnRP1FEdt0S3ivKLOsoRomohotSGU8ZstSZc9hgrRXlO+f8+poL3IuZhYi5ySOSqNjcv1GlUWLDzNzvOJ+aNgRijKvOI5nL0nZNuYU55pTPmWDM0EP0Dy9ocEqG07p-TNWLaXllLqe8ttWLKjrAkTY1IwyBGuPER8B2Bt5bk+5xT3mStXZu8MZQCllJVfLEGqRIsihGWmvO0kTq1RzsmkJhsrEsTMWvGD3Lx35PDfO7D67t34Ycim6FqQ4WjBzeiy9siX4jNzTyKNJ6Zx2vhG7l1xJiJ4jtqiBTo7+XofFd83DhniPFJKRRwZp6LaCqBhtt+YXnWziPh67+9d9InOy6G-L0bl36fDEmyFmb7OosXRfZmi8-4jLqNbF4QqjLZYpIiMSVJ2ShN-TSiW2kuG3LwHmPSa0rxKCWlZB0LgPBmD8GWKyBbKr3cxG5ZGsMGJ3bUlN+aRPLRmRkGT+wVP3RM+2gIxADF-0ppS2-CS+a-ujjHAwK3R1oL95-isvHpkI-WjiGtRy8a-oIx-uvCXhi4mN2V9H+XqvDfIAQZDHkcMGRz1-jSi3CPvax8YqFyGW86r-yk9JB2pueqYEyd4Biw0rFsVPVuGl92U+O78t79cciNRAyFsJfbic5aBYpJyAOXyNCLcMAMrF-QMbUJUOMZWUIFhHPAybsT8R2JxVsUHQDcA9hSAhmbhJqbyaSe5ZBWAGPV3WrGKJAqMLwMTbYDA+iR8YyXYLwP6KxB-Eg-WCScghqdCeFRFRA24ZA5gtA1iTUV8NKfqb8XEKNP9DIADXtEVC5fgiGGqIQ2A3yJVP9blfIJKFhOzVuTAsmL9LjM4CIeaPgyZKAxmJCegFCCg9CAw8kIwmRUwpUcwwmPIKaUaPGWxWDewvORw7hbaTyaGIQlqQKJVKxbuLZdEFsckP6XZdVW4aMKMD7KkE5dQgpTQhw0gyGHaNwu5RBag2AOItqF-bsT+R8VrN8EhG4HPDLcMP9Ayd2a4bsYIMIumCI0o6I8o3hfhGosAOo92eKa4J6ZoxlCId6IoKaQqWIAXHEfI5fDQiA4ogQmqKI+qHyQRfoAwiIeKH9FERiTUEw96bAiIOaaIFApg-ovWbQ1yKGNwpVa4WUWDS-S4lrMaJtRUbUW8W4DsFEA0IoZ4-2JwoJEuCYrnEWBKYka2TIaWckLvesH5XvP7SIZlCyRDAoog3RLQgOAzdtT8SWNEjEROWIXIUoMmTIDjDIKEs5UCCeJcYJeEugkNNKYBHwKkViPIFEN6fSVuYkboxEYINsTUaXQg6mbYvOAxa+aeWeXgeqDFTUXwaMUoAyPFUWfHDuR8D8W4EoVEIIxiAkzYwohU2BIGdkioh5Ggp5Y4hE9Gbg7uH5NRZUTIIIgE5Rb8ZAztLrbjSINQq0okopSZJUmqUYpFDBBbbEJIzGXUX8bsPjescw4Bc4SUkEmUlk6M-ADFEmD0jtL0oM30sNVKbuKMNOV-HwVuFkmFGZW5Tkz49MgoYIdJLEMMaMbEW4Rs0pWFWZGFNcIskXd2ZiREY4aaPXQFTszEdtf8QyZUS0sA+U4gyZJsm5QJKgx5I45vbIT6DIPEo0Rcn-dIHKfwP5GIU81EXUAc6Zbc0Q-hZ05vKkYE2IDIW2MkKIRYz+Rk-nGRPlUAzWCMqFOmLcipBbA09IC4XwNsSMeoxEH9KEjU88i8U03INM+LaNMMDtdxDFd2TKJKWUa8Zg28JKbtY-K0rdRNWqWAMjUjVARQNAJiydFZeg+sP8blDtFsUzVsQIH7fSJKCNNLRJFiG4bsG9Oi6PRixgFimjRgQ9V0yJbi9tZsH3QZQSjEoIHIFMjEXolMtRaSndeiuS1AAUDgJMFgAIMjF-NS3izSgSwqDEhiYkSXKkPUM0kE6i7iWi0y-afAa7MAdi4Nc8N8JEdSvijSv8FyusATM9KWKhWxDpHtGi4DL1GGIKjyZS7k8KhyjS-i2KoSk9AItRHJNVAyS-EyzKwK4K59NHelVVSKxyoq7SyDU47JZUDpfIEArLAo-y2q+gbKsAKQRCVqeylqwqmK9qkMRbEnKqmINsVKKSwDQarkxq19c-AkCiNlaNcIA0ATCIGXQbE7GnGHMbMrNgVMJzYwQsLANQTgJVEoJ2AeEAnwBIDq2RJhB8cIO4U0k6iHM6q3C7UrALa1AyOLEoQVBhZLOWd7UWC4G4ZsKU1aiTQ7U686hXVTALa611HLO63gB6p6lS2C0aZEfuWY6aLteKm4JbJdHs33BzfrSnOXM7C6nG2jBbKs1UFbUaSXCzN-XUzpXEVuBiAg9G8HKnKHdm7G5gJXSAPG26+6x6jgVjZta8VxEI6KnPI0d7KWTUQyeIY5QG6W07QrWnRXW3JvUmi8bEJiXUJGxUd2DEGChARQltJLP61tfq5fc3TGkGuneHbDVcfG1DAUeXVWgzaIKaUkbU7rXUTKCIT3REJgzHRJbJU2tmi2jm+W6261OMfwGUH9X3I0DEluYmf0EHTUk+Fmi3DUo0XnJ2gXV2xOBdBUYAlhFG2ukZF-VypEDOjtMTI0MMRUIVSoIAA */
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
                            internal: false,
                        },
                    },
                },
                selected_tokenEmpty: {
                    initial: 'displayAuthDoc',
                    states: {
                        displayAuthDoc: {},
                    },
                    on: {
                        FILL_TOKEN: {
                            target: 'selected_tokenFilled',
                        },
                        CLICK_AUTHENTICATE: {
                            target: '.displayAuthDoc',
                            internal: false,
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
                            internal: false,
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
                            internal: false,
                        },
                    },
                },
            },
        },
    },
});
