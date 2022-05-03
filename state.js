import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYATJ4DsGXwDMAGwAnAAMACzuAe4RABwhADQgAJ4eYWEArP4RYe4hnkEBmRmZPgC+5clomDgEJGQU9dR0jCxsnNx8AsKiHAA2dpDS8kqqGjr6RqYWVkggtvaOzM5uCF6+-j7B4VEx8UmpiCFlGAU+mZlxAQE+YTeV1ehNVI11rzRiLCMKKrQAEsZdAAhbQAJTkyjBzkWDl6qw8QSRGDCPnccTCcSiPiCUWSaQQV3cGHc90yQXJuMyERCFSqIBqLwaNCZLVoAyGEB+YwBQNBEKhMLscKc8zW7iRQRRaIxWPcOLxRwQQU8cQwUSC7glEUy7jKSMeDOexDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNmFywR6xC-owGIpATCnniwXJ+I8t2yhX9ofJWp8cUyhsZJrNFqty1t9HtkFoglYuGQzGQMFo-HwueQECLUGM6FgNbrzCgEihYJk0PmsJ9Yo8vk8gYiAW84SCcQxPijCE8erCgbyoUnmMxerTxtN5st1tYdodheLpfLYEryGrg1r9cbqGbV9b7YAytpNJplE+n0KlvCB+shyOY6eBOU6orO84ZBgQShsmFJYiq7ibpgGY7tmvS5vmjpFhgJZlhWVYtjeTaEW2Ha6AAClIACa34iisf5eD4w5YkBIHTuBnh5CiGQ+ExJShAEERIRgKFZnuGGHthuGnue1YQGA-RgEIba3iRUBqApSlgBIL5vh+X69t6v6gOKlzErk-oRBc6JxMmhwEuioZQSEglxBSqohJqwmibuOYHgWUknvhF5sJpykNs8D71hpim8NpnbdrR-YmR4ZnqmElnWVOdmzuimTMQUETQeiRWanE3nbmJfl5pJx54WeBHybFRGYLg9AQMg-QSGoygqFIyhJcZrgeDqw6Ym5WQSuOmS5bZUplGE0HFPcMYhBVma+eh-lYXVMmNWFLU4e1nUSJoxgGO+iiDaKKX-tBgYBCENI0iUKZMbNxSBr4VxFYJY4RJ462oeJ21HjhQUNReEgAGLKFImj-LQxjkeRtCKGYT5SNd9G3U9apJjcdzzpqngzUqnFYmcpWCSEWowUDVVbTVAW7cF+Ddb1cOqMj5HY76eMkvKhOhhKXhkw5tMBBgj2k5c+V2ScDObTaoPYT5nwEYIECKTp2jAroZhSLQYLKHIGNSGCMyWHzf4RhgOJZEBOJYlkES5Xc5nzj4NKFVcQRK2hKvMztImVXFdAEbAhD4LgDjhbremfsbpvm4Khk-jdw0IFZxK4iVoRZEiOLix4E1QUieSXBTERWQHIPB2D6sRyFUcx3H9YdmCXZgsnZuY2nXoZzjWeTn4JRXFiCTXNBM5KvKtkoqBWQYgUmSCXX1WYY3Ycay3hAcBwcCwLQbUdV1mhuk+qi6DIajGFd6d0b6pMRNLgnAQD1y5EingfYu8rxCnBNf0bkN5My3mrHezdqw0GIPQOgp8ToXxkFfWgN874P0Hk-P8uJhw6m2MBZMwRijuFyhSV+ANihMVVF4Gu-t6TpjDoHfcDdIEbV3uzN0cgZDaCxo-ZKWdOKnFJgUWkeM4ixFyrTEI9sEi4kEuiJinkwFBwgZILhPC+FYIEWsTiOJ-C2UKPEKynlFrgUWjIgGmR4xTj1NSFRLC1ESF0OdYwkJaCyF+KoEwwIba4xiCidE0QyivWsblIqudeIlDyDcW4TEHESRZhIE2fd+o908TyHxfis7UjVKiPUnFvBWTHKQueESoJRKKFifKglUwMK3LAWwzB7AADdtLcLRsjWQqNMELCMpncUIY-AphgkiYxP9ZrDmsaEEIcR5xWWJuVepyE4BNNae0mQnTKIyF5vwoagzUSBhKL4MZ8EVSzliSSJ69wJFYlppqOkTwVmNJEOsiQHSnyaBNoYCIABpbJBzhnHJxLiM5v855jmlmI2ZK8JE1zqU80OLzmmCDae8zZN9gRmD+L0vs+zoyHJGSc0FpVwUEgCNcKFIYfa2SuIrZZSK1moo2WgmQWK-i6ABQSoFoySUTKVKOKW1i9FRFAh5ehiKTTIreR0zF2LVAGW0fi9YQyjm8vGec8mkKfAnFmflecblVQVWlcy9FHjjDAj6lylVhLgWnNJeBOZZwTihiqUUo1hpmDtTgM4Rk7xmTkH9WyNorB2BcB4MwfgywvjDzxQM9IdwSRMT1CxVEvhZyeWyCVL2qoPKjmEkGt4lAA0xo6OG7o0aOSwEgNa2IvF7aXFuBKaJRQM1BD8JOUVxQ3K5HRAW4tLRWRkBjbWyIUp5Tzh+kM9NSopyvxOJqUI2wkwpn7c0It67PhVprXs+N6x8qLk1CGEM9wVQuTdkqCe0tipzJTDSCliEGWFpoKO7wSbJ2pqYrPAkr0SRAWCBlckEjIgJNBvQZ01rOIhnLlEPV+R-TFFytSYctTkyLRPfYhlPlmGJJDtJNmalbzNjALgVAvACRKr3dEWZSbPKVNmaOEuc5OKvyyA7TwJCOOFFA6w1mkNLz0GvCpYiUcD5H1rY9KUKZiEFAymGZM4FSRSwpE9EoJxigeslUw+uajwb1VkoR4isD4ESc8kcmTnFCoKfJnqKWKYsSyzPQmHjun8P8cM3eNStaJRqgOE9f0lx7je0U1qfwGVYjfy1A8LD2nN61T03tEKUVhN3m8zXdUCR-MnBKLcC9BJCkdpiN9YhgDAYxY2jh1WfGDNNSUodZL6kwpgFrQDGRVwcS0gKUiOIs1SSyJuCcQh84XPxbczVg6KWMCicPrAWAMUtK1vbdkAGZJi4uTJaXLIDaVo0ldj-EbLMEsEdq+FVSxniDzbioti46ooP6msWOWalwqa01dqqNeFwDt4YhuN5qk3EH9Ba3qM4CRChojrdsPLHhRHSzcuSW4RQtTWK+2DMb+0-sRVQKZ4ksyCjtq1FZSH7tgL228BlHVHHSQUhR4FfTmttbNd3cPcUeQ-C3DckE3wMSNvrDRIuRjFLeKFGArSGn1WqzWsKoLbYtwRYkyY3qb2GBdTFCKNYiJ9wxeh3YdAjAWtFLWrHHZiRwRFfVMuFD9YRRFyRCF1+hIeQytaYqzp+LTcDOt1jrwcK1r+JUzck9CJcyvDux1cr4IKo3JFAuJh53wM4uHfd5HfeM3j4A8N9SGDWIoiFDXAEKRmxri2RljEY9Wuk8hXOyfY6gOme+kh0uV1oZchlGC3PBIxJVQKg4wmb25eoGyUg9Bm4rXP6CUWpqhylw-CoiKBS9t1KDTlfj+A2qkHFpv1H6qcf-KHII-totccxVnpCWX4zTOcbmelxQ+-J62-v6T4JcOYCbkxyhlEZcY1TK2mhVgAAa14EYEUDQEANQFxX6Sv3WCKj8CemiEnFFlDDDCeygg+22HCDKAkXyi-1eWZV-wAKAJAMYE5TrwYmgKpjgIkU1EQMtxuClFJlRGTSEXuCdyNGeW-zADwNAKfA4BNBYAiD-xa3bXIOCEoNJCKVyk+h1EJx1AyFskY2wJRR-zanwEEEUnAKHl9FiCENgJEIQPEKVHn3VBpF4gKWpFJFPy0xNSUPoBUMUmIMo0gK0JgL2HgKoP0IJFHClFBR1TKFJjuTWhiysI4OUNULAEVT6Q0NIO0JcNEOoPAk+hTF8Blyp2ygRVYMZRwOsNsLACkAvFikEOcIoL0KQPJjchRF1G9gpwyGjzSMYSCNrW3zVWJQ1R5ysluyREuAeQTEzSQlrSuE3w-nvwnx5wAFpSZlc6FPI4IYx4lKhyggA */
createMachine({
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
              },
            },
            register_tab: {
              initial: "idle",
              states: {
                idle: {
                  on: {
                    SUBMIT_REGISTRATION: {
                      target: "submitting",
                    },
                  },
                },
                submitting: {
                  on: {
                    SUCCESS_REGISTER: {
                      target: "success_modal",
                    },
                    ERROR_REGISTER: {
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
