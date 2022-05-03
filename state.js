import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYATJ4DsGXwDMAGwAnAAMACzuAe4RABwhADQgAJ4eYWEArP4RYe4hnkEBmRmZPgC+5clomDgEJGQU9dR0jCxsnNx8AsKiHAA2dpDS8kqqGjr6RqYWVkggtvaOzM5uCF6+-j7B4VEx8UmpiCFlGAU+mZlxAQE+YTeV1ehNVI11rzRiLCMKKrQAEsZdAAhbQAJTkyjBzkWDl6qw8QSRGDCPnccTCcSiPiCUWSaQQV3cGHc90yQXJuMyERCFSqIBqLwaNCZLVoAyGEB+YwBQNBEKhMLscKc8zW7iRQRRaIxWPcOLxRwQQU8cQwUSC7glEUy7jKSMeDOexDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNmFywR6xC-owGIpATCnniwXJ+I8t2yhX9ofJWp8cUyhsZJrNFqty1t9HtkFoglYuGQzGQMFo-HwueQECLUGM6FgNbrzCgEihYJk0PmsJ9Yo8vk8gYiAW84SCcQxPijCE8erCgbyoUnmMxerTxtN5st1tYdodheLpfLYEryGrg1r9cbqGbV9b7YAytpNJplE+n0KlvCB+shyOY6eBOU6orO84ZBgQShsmFJYiq7ibpgGY7tmvS5vmjpFhgJZlhWVYtjeTaEW2Ha6AAClIACa34iisf5eD4w5YkBIHTuBnh5CiGQ+ExJShAEERIRgKFZnuGGHthuGnue1YQGA-RgEIba3iRUBqApSlgBIL5vh+X69t6v6gOKlzErk-oRBc6JxMmhwEuioZQSEglxBSqohJqwmibuOYHgWUknvhF5sJpykNs8D71hpim8NpnbdrR-YmR4ZnqmElnWVOdmzuimTMQUETQeiRWanE3nbmJfl5pJx54WeBHybFRGYLg9AQMg-QSGoygqFIyhJcZrgeDqw6Ym5WQSuOmS5bZUplGE0HFPcMYhBVma+eh-lYXVMmNWFLU4e1nUSJoxgGO+iiDaKKX-tBgYBCENI0iUKZMbNxSBr4VxFYJY4RJ462oeJ21HjhQUNReEgAGLKFImj-LQxjkeRtCKGYT5SNd9G3U9apJjcdzzpqngzUqnFYmcpWCSEWowUDVVbTVAW7cF+Ddb1cOqMj5HY76eMkvKhOhhKXhkw5tMBBgj2k5c+V2ScDObTaoOBfVskSHIMi0No5FqKYqi6DIPV83+ybZGOOw6rkCT+uB0QRNL8SXNcuR6qOStoSrzM7SJlVxXQBGCBAik6dowK6GYUi0GCyhyBjUhgjMlim7dEYYDiWRATiWJZBEuV3OZ84+DShVXEEnsgz7YM+Z8BGwIQ+C4A44Vh3pn4x3HCeCoZP43cNCBWcSuIlaEWRIji4seBNUFInklwUxEVmV9VmE1-7dchQ3Tct-WHZgl2YKd-HmM916fc4wPk5+CUVxYgk1zQTOSryrZKKgVkGIFJkgkr0za-YVroHLehAOAcDgLAWgbUOpdU0G6J8htjbGCur3OivpSaOxuADJ6qpBKLRVB9Rc8p4hTgmv6Nyf9vYANYEA2SGAaDEHoHQaBJ04EyAQbQI2+sUHnzQX+XEw4dTbGAsmYIxR3C5QpI7AGxQmKqi8EvCu9J0z+y9vuaugCN7APZm6LW2gsaoOSgPTipxSYFFpHjOIsRcq0xCBnBIuJBLoiYp5Sh6jqEYEIKgDqcUoHtTABgYOoddb636qnAej0-CCTRJ4YoSITgZQ4vdKy8EShu2iG4iSLNPHeIEGeaBASvE+L3rpd8HcQkG3CWsUmaogg+BOIJQo9SvBBHAnsDOAQUxuQpHUycmTVasCKXkvx8kcnFNIglI+FSwmGKGmsJejt-SeTljI1EJw2nRA6Smak+RaTXDpE8ZCqiq4eKGb4gpGAG5gIgSM1h8DEHcKqekPwWpSS6guPU9cEjyY3ClLEb6Y87jj36RowZuTzn+PocQRhzDjqwPuZwpBPCFhGX7msFUi5hH-QnnqG44FHpSzqT-WmP85oHKNEcjaaisk7VdPIGQ+inlzlRFKVUTFcRYnqdBVp5NFp2IBpkeMU49TUhBdQiQuhzrGEhLQWQvxVAmGBEylyxI8hWNka9QVuUirD14iUPINxbhMTFbVCQscT79SPnKnkiqmXUjVKiPUnFvBWTHN8hyOqoJ6qKFifKglUzKK3LAWwzB7AADdtJazRsjWQqNkV9jmdGVEgYSi+CRPEUqnhZrDkFaEEIcR5xWWJuVQNRzg0iHDZG7WigY0yF5rMtFSa-Aphgum+CBClSGpJE9e4VisS001OSlR5bQ2CAjZrbWT5NCx0MBEAA0ky6IyaW1po5Zm3KY5pYWPzV-KxS8A2HL9iOytE7EXAjMH8eNqLL7ihDM21NOI11IizZ264W6Qyl1slcRWpaj0hpPVGo256-i6EXXelNran0doJKOKWgrOIlxsqGBxFVj1jqrWei9qgDK8KMbe5dD623rp+cOepgqUzeHRCqEth6TRofHVGxVfUwMEcgxm594EC1nASYUTpLrVSVHpMwfx8B5iMneMycgEm2RtFYOwLgPBmD8GWF8S+CbG3rFREQpieoWKol8LOZZJIsTF1VB5D2v7pNvEoJJ1THQFPdBUxyWAkBF1WT8BcH+aIKQZCKIZupUE5TXHLm7GjFLWTWeaGQVTi7Ih-J0z9O9BmlRTkWYmUI2wkwpmElZlkuW6DOdcw2m9qVOJQSXSGe4KoXL5yVHfaWxUC0phpJ0xClmbMtFi94EkCW9NMWfgSV6JIgI0jRJ5DIYWVFUpOYeegzomWcRDLPKI+bdRLOKLlakw5-XJkWpV0Vv6fLUoGeDdWBEooqWImAXAqBeAElw4m9Yj18Zcu9fm0cU85ycUdlkTOsTdSxMKCa7J0k2ZqVvM2K54DYCiYexp6InkU1iIKBlMMyZ7b3CgoKnUGUf75Um1uabq9aqnb2iFC7EU7xQphWBxHKZkecUKuj8muKU0mcuNVhMwPfag8hpeeg15LtU4p4uiUaoDhPX9Jce4Jd7Zan8BlWIuRNTRACNzsGvO6EU4h6Lpe6pbal2l7cWrBJnV+CKIxH+RQSFCUO8c4nIOIZ0KakpQ6FOYpaTc8BDAVwcS0idUiOIs1ST2JuCcER851dqzJ3JA6QvLmgOh7AD3cVF1EvVIt-UgqxyzSyBnEoWDwjUmfVH1mfPQrNXjwwphKewBp4uBnskk8XIvoctsqmtM86qi8we8LR2ZuO7OyFF34VVIsP6G5vUZwEhNK1O5wSNjvedJ6bcC3eo1p26J--Enmv9qV8p7T4k+aCh1Ln7xBfL8XEZ28BlepsTSR1NL6TsHQS6-Fd9KSMrJKC3LV1NEVviIAYAM9SzSuObkG+tG9u2+g+MeyqYYgs2wtwIsJMn2eoRQPui07stIdkFwT+tCQcIcb+cOJWCAlsgY6qmoZQvqlwJuiIS2kQvEQ4dkeQgMm+wMDuvs+BICO8vA4Udqi0VM4Bii6I84AB6wvEdiVu1GSIMYB2kBW+VCJOXB1YUONy4+TKxQjsRGUQhQa4AQi+zanS2wBQMQIYaubBjMih2Syh1OTCtyE+7+ZsgkS4oY0EYYv2suL8CQxIbKAiIYpMJceBWiskC2S2WCwEAMrs+CYhIqfgLKOodSVkaq5h8h7B0BvsZy+SkKr+TKuQ5uGQtM3g2wmIsS9smwWIOqOoVigRFhys7iJOmRIyhS4K9YGhDeZIksyycYYhgOdiPqKYLkXSMQT+jRFyqhMO9hbmUsTEVijkH6ciPR+q6oLWIYbkOIG4tRx2oKYywyFy1esKMCdqAMGc+QAMWo1I-o3g4ESxS8KOgko44QbWqRlh9R2Sox-iTKb6ryk0Hy4Qsx4EecgYwiZiFwU4chfeUBVhO0dqdi3x7yZQfx5xG6OIGci044xUz0rBzxdRGh2QcJ8oCJXyqB-h-g+aRQzq5iZQqG-66GoUsAAA1rwIwIoGgEyagFehfB-kVH4E9NEJOKLKGGGLNNkMGOfkXsmE6tSRWrSfJAyWySybdowKBo4bdLEAFrycEFYpqIKbQaQcEP4CUIwV4FkPcFiRCfRgErKYyYwE+BwCaCwBEPSW5uqXsPydqS6hutkNbLxDjpiCXMUFKaOhGkdPgIIIpByXwqqdyVTHyVqZ-kKa+lKLcbxE6jspEIGZWiGWGWAMqcQVyS6bGQKR6UqKOFKBymRnxP2hAeaTScGW1KGYpDhiipyQxNGRqW6fGbqf9imr4IgQ-tlL3sOrWQEvWdmVIBeLFM6Tya6XGTqZxlKD8VZCjntrgXbhaYurghBquuxtBogFZBnjISXO8lLgTqgKLoLG8gSZ8rMZ9gALSkw+5LxMSPRom4r3CCblBAA */
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
            update_mode: {
              initial: "idle",
              states: {
                idle: {
                  on: {
                    UPDATE: {
                      target: "updating",
                    },
                  },
                },
                updating: {
                  on: {
                    SUCCESS_UPDATE: {
                      target: "success_modal",
                    },
                    ERROR_UPDATE: {
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
