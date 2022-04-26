import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYATJ4DsGXwDMAGwAnAAMACzuAe4RABwhADQgAJ4eYWEArP4RYe4hnkEBmRmZPgC+5clomDgEJGQU9dR0jCxsnNx8AsKiHAA2dpDS8kqqGjr6RqYWVkggtvaOzM5uCF6+-j7B4VEx8UmpiCFlGAU+mZlxAQE+YTeV1ehNVI11rzRiLCMKKrQAEsZdAAhbQAJTkyjBzkWDl6qw8QSRGDCPnccTCcSiPiCUWSaQQV3cGHc90yQXJuMyERCFSqIBqLwaNCZLVoAyGEB+YwBQNBEKhMLscKc8zW7iRQRRaIxWPcOLxRwQQU8cQwUSC7glEUy7jKSMeDOexDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNmFywRCEKnhC-huQR8ngiFNRcSC+I86M8GAuEoCOs8kU1dKemBNZotVuWtvo9sgtEErGz5t4n34+AwADN6P0IMX68RcNy-gAxGRg3RCpbwsWIbwRCIYK4+HFoq6XTwx9YhIJqieL24nVdhTyGxnl3PW1h2h0lsumitV5A1wjMeuN5v0VsYWCEfC4BxCZhQWg7y17gvICClj8vzzXoJHYZgwAwUsADd6AAawg7cT13fMD2LUsMC-M8LyvBsm0dFtcAfJ8X14N9AKQ78UPoP8AM-CjgJEBBoM4PcAG0wgAXT7EUVkHdYglRDA4ixBdaTDfIwznMNVSEkIEgxYpbgCMMt2Neif1Qx10MwuhqwwS9rzw2gCKI59X1ooCNOo-93zonNKJAmhiDvDBUH6AQTMQ+yGP3QtD20iisP0nCb3wu9CMfMzSIs9SqJo2zLOWJjmBgjg2M47ifT4iVSVkzxdQiYJVWTWclTDEJRwExdUx8a4aT1VSs1i3oCyLLTj3soKDNw2970ikiyLsisfIkTQ3QAZVUMFlDkMxxqkKF1DMYw3TkTKB1AcUlITMoYgDW4EguKTbmyXFlNyVVMlpAJGow5qbU0o87s63Tz2CwzerbWRflULse3W0VNqHMNR3HKrlMKMopNVPwYZ8cNkyjMpbsSlrHoCl7aD07rQuM8KJHG7RgV0MwpFoabZvmsEZksAHeKB+dQn8bwF01MJwnCAIpNiPxonlAS9UiS4Ufu3y2qenSsfPV15BkbQpDp31CmiEkQnyDEV0KLFocyeM4nRClaSKGkcRF7yrPFjHT1e-AJF0YwDGMSFaG+nkTGBRXsryKUIeCSJ+cK6MysDscJSjFU1YDBr6S84aLf81hcGQZhkBgKWa0GeKoGMdBYAwMBcFQXgUgkCm5oWsEXdGP53c9hnSVymI5PuBc4lTYpocxFEwk1DncjVjMjSa82qMtxPk9TsB09-Gzs9zmeAIkKEwW7OvXEQRdAwlVEygXYpIjibmKowXuojiK4Cl1wfY+QtG-LQ8eU7TvTM9nnPUDz1-F8JzRNGUcbxprzWJvEkAkLg+D3iUeI3MRzqlTCUa4FIIGbhjmpEed8x4YCTk-KeL9rIAXfp-fB74l66AAApSAAJpAI3gkUBO8IFFCgYfMqIMhLohpBEVU+ssg3VQcPOOo8E5YIns-N6TZ+hgDIu-Be741BgEkZWAm2hf7-0AfMWEWUGYLj8KGeGCpoj6h8HODhUpdReExDEPIyl3Bm0ERg4R2DJ7TwkVIghzwv5yIUVIsAS8wQr2hBo70G114IB0QmXwEQDHFEnCYhIUo0R5H1guK4yk4h2Nvg9e+7URE4Jcd46RzxcD0AgMgfoEg1DKBUAtGhCAoxqlyJqZMWRQgFBYQSCSYQMABGEspXWWJqTXzQfYrJmCnFiJrK4wpmBimlPKZoB2f9FC1JDLzMoG4ek6kuDSOJECT46gCD3KI1I1wZIcqMxxojcHSzLvNRarsa7GA9kE-sgNQkNy6U3BSrd26ZB1tkGIIkuHCVJJkPhmZnojLFpcvJ1YJAdmUFITQ-xaDGDIWQ2gihy61OCKOQq8RDZJlJFzMqXglxnUpAUdWZyfKtRhc4uFlTqmqDRWQnFuJ1SI0JUUYlJiTiw1JL4bY7NURZBpfHB+uSGXSzkDIWg2gyFqFMKoXQMhKm1I+d09WLdqpkhMbkNUGJdrUjJT3cVQjJWEFQKUystBZkQStTasAMjPFQG0NagQviwIQWYvBDAN9znQstR6219r9IhudR44hbqI3JVSulLiLyeK+kFtkfWsR9ghFpPokxU5Vaki4SEYoAkIjmoccGp1dqSkOojS66N7qnUSCci5NyHlwr+uGZkoNOTHWeqrU2cNTq61ZwbZ6uNLFljsUTV6V59N3klDTVqQqsQs0Tiibmik3TwjokOe3NE4Kh6Qq7XSitfb7XKOJqTcmM1y7U3MLTJNWj3kYi3ldOSSJPABDkuffVnhiSHKJNsCc+UVL8KPYGk97UZayvlrU5WAR83N01ouCIx0MgkkOXvLUPdz5louQ-O2DsnaqAeSRp5Gr5R8oDAmBuWprjBFqqWsDJpYC2GYPYKCvjZWYrRbIDFyzH0hK2oJc+G4cS4ixB+uJ8YrqtLbjzP9i4RasZEBxrjcrFC8ZkGywTbzhN+FE74JE8RwwqjnDcBD+Rcg9I4WrdMym2NqYkNx8amhpqGAiAAaQ1YcgzJQjMSdM6VDpykt0QO-ezfWI5MgOdU4ITjzm5WquBGYP4AmZ3Juyr5oS-nxMmak0qHpCGv2HJpHJC4CQYvMbgI5+L6naDJdSyqnzIncvGck2ZpUhUENXRqmfDEqoFyxfY3VxLDWZApb+OojLT79M5bE+1oLx14wQKuufbwBtVTDac9x921SWt+YW4FgrBJVTxizf5oobdpLpMNMwat8B5iMneMycgL22RtFYOwLgPBmD8GWF8OdmihPpDuCSUMeosS+d8HOFJJIsR-tDG3BIhVbrvbeJQV7gOOg-e6ADjksBIAaqiboy4twJQlB7iSgk4SUM7quLiJJaPMctFZGQQHGq0zg7-VcQqqIYdKmEqOE4bNwj3D-VEZnzQMfS8+ATonum53il1l0pp9wMhFSLahpUVw1R+zjOfGkNmpcfGIJz7w3PId870XOBBGHvAINTAJMFVWIWo3w46egzo4PCvVEY8kRbfDtOBlcbpFwuHpkuJcIZAjj3ow6tbaeH0wqtjgwa2S4e7iVY4dDTdpn7iajBQkYIeHu0S0Cjbd6PUU8RWIuZBKotZHkXQW84HemPAIzgeA7wRR8rruDmiM4uoJyhjJxVUvkHy+Y2xiFIyJl+r1+b1C8DPlaCPg4BwOAj2Zsg-WBA4kFUgNonVn0qSy6h-bOCDcHKE-4-ga6rPz6pkBoxRbwnrttBm1m8Vym-fZwom3DH5ySn7BxtwkiDKphcIrq2LVZv6T5WwWgP7J54x9R17RQN5wHy6Oju6iD-hlKFgaqah6wiShChhRAFDa6nYHQnxZoKTkjUgbhMZu6N536Swz7IHz5oGDQ4E+Y0g7TbBeBFq1S0h-KsLhAnwQ4o6NJohMGHo4HwHv6ViV44xz7hQ+b5T8F7RCGHSiGnY9zxjbx3BFpZB6jJi37ZJT6J7VgtbEjgJaEHQiFxInBCRZD5RqxajtwoLMFwF37jLXIZzRqEL5yFzFy1JRbqhiRHJUhRCUHAxRJCQXDnTRBhiRDmFjJXLTyupBHr6b6wDb4LDBLt51IqzyhaiLjEoVRQykrxEk7yiBDhhZppH0oTJN5BFf5hElHH7lEtw6jGKkq0gSGagAEjioiyEBq0q+EZF4JZxBGuq1K84uH6JC7XRgrcyXAohawUgI6lZNGSp+GZGBG5zzECSLFRLLHbCrFlSojEgjhqxFq6wcIXC7E5L7F6RTLuKYCuryKKJgBhE6hnCuGFCRDbBbFxLUgnx5Bah3C1TG6wHL6TGwriIFIfFEQb5b7fE+Kc5qwJgHRIwMHyh9EdIiRjiLgtKLhIi3BeFyEsEWHoSvFImKIolf4YmVhYm2G4kUj4kThOGBjiZtyhjsxZ6u7Uk+G0mPzSqTLInvgyKzJlJhGhaHIhgLgZCH5eB8rbD+CRCXTUjAox4r4SovFTEMluLSnoBhFdyKmMIqlRJqlKgEk9ZfrF6mboi1TPFPT0k1iCAQCSK1LdY0FDF3CI7YZBwdLh7+BgqkgnCjFZ5ul0lGn4A4q5CcoEpXREr3AmKah64xAunFAlBoh6nyF369qhrVqDqerDqzyjqsk-5Zabp6hWYUm4ha65pcI4kmy5BhxtyxmsDFlTxhq9kyI5Fb5Vm-E1n1yLh+CHLCQTi6wAHU4eAyg5C1R6LhYbi3beHwlillklkDoDnPBf4jmEFxCTmYjHkXBhjbDzl76LjqjhhYjbAJBCrrkimbmYK9n9o1pDpmljnvLJjEj1kVSNlG6xH8Stl-piQvoU5yTdnbl9nVo+byjgENlFBNnJgmLBjdLJi6jlQzgwEblx5im1JFomL5T-o8pGy6hGKl4rKHAdKRkJgYjoi6jhxcIFk1ZxacZsBwCwS8CMCKBoC8WoDpYFGzoprhh+AVTRDlFszDhgknxgoThfpZC1R6hUmIQqYjacVNiwA8V8UCWMC9g-nijiX-5SX6wyWSSFbBDhmogQ7wLi7bZ1ZcU6WCXjQcAmgsARCwTE4himXBDmWCqWUhbZA6gk46gZDHmFTCnqW1acXFL4CCCSLCVt5K4d6+WSX+U5QbhBWIA9JSi3ETiqUmqpHVYaVqZYL0AJWSKGU75FGxDpV7DSWBUgUhwSaraj4iQhCOVxWVWJVgDTYiWZb1wmUZVNXZUgWfpppXyXmkiLjHnRVqRlVOXxV9VSDniKI+USWNUBXjVSRRgojD5RIFAZBFBPGlWxWjm1WpXrDFTzYBb5adYEg1GFC9x-qxBRh4VDy+m6GIAAC0GhOpwqlO7cUSlQlQQAA */
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
            register_tab: {
              initial: "unfolded_form",
              states: {
                folded_form: {
                  invoke: {
                    src: "resetFields",
                  },
                  on: {
                    TOGGLE_FORM: {
                      target: "unfolded_form",
                    },
                  },
                },
                unfolded_form: {
                  states: {
                    submitting_registration: {
                      initial: "loading_registration",
                      states: {
                        loading_registration: {
                          invoke: {
                            src: "registerApp",
                            onDone: [
                              {
                                target: "registration_success",
                              },
                            ],
                            onError: [
                              {
                                target: "registration_error",
                              },
                            ],
                          },
                        },
                        registration_success: {},
                        registration_error: {
                          invoke: {
                            src: "handleError",
                          },
                        },
                        closed_registration_dialog: {},
                      },
                      on: {
                        CLOSE_REGISTER_DIALOG: {
                          target: ".closed_registration_dialog",
                        },
                      },
                    },
                  },
                  on: {
                    TOGGLE_FORM: {
                      target: "folded_form",
                    },
                    SUBMIT_REGISTRATION: {
                      target: ".submitting_registration",
                    },
                  },
                },
              },
              on: {
                LOGOUT: {
                  target: "#app.registration.logged_out",
                },
                MANAGE_TOGGLE_TAB: {
                  target: "manage_tab",
                },
              },
            },
            manage_tab: {
              invoke: {
                src: "setEnvironment",
              },
              initial: "loadingApps",
              states: {
                loadingApps: {
                  initial: "loading",
                  states: {
                    empty: {
                      on: {
                        REGISTER_TOGGLE_TAB: {
                          target: "#app.registration.logged_in.register_tab",
                        },
                      },
                    },
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
                REGISTER_TOGGLE_TAB: {
                  target: "register_tab",
                },
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
            update_mode: {
              states: {
                updateApp: {
                  initial: "loadingUpdate",
                  states: {
                    loadingUpdate: {
                      invoke: {
                        src: "appUpdate",
                        onDone: [
                          {
                            target: "successUpdate",
                          },
                        ],
                        onError: [
                          {
                            target: "errorUpdate",
                          },
                        ],
                      },
                    },
                    successUpdate: {},
                    errorUpdate: {},
                  },
                },
              },
              on: {
                SUBMIT_REGISTRATION: {
                  target: ".updateApp",
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
