import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYATJ4AcGTwCsAOwAzMEADEEAbFE+UQEANCAAnh7h4QCcGBkh7lHeAV4BIaEAvqVJaJg4BCRkFLXUdIwsbJzcfALCohwANnaQ0vJKqho6+kamFlZIILb2jszObghevv7BYUGRMXGJKYgZ+RhR7j4ZPj6e7gAsAVE3UeWV6A1U9TXvNGIsQwoqtAAEsZdAAhbQAJTkyghznmDm6yw8MSCGHCAQCNyCAXCPnc7iCPiCSVSCACPgCGCCGRuGQyGJunlx7hCzxAVTedRonKaP0kmkUZk0AGlaDJtFIAMpmNTKOF2BFOWYrAklDBxLbhKKRFmYkmIPF+bGeDJeC6xcKsirs16fLnkO28voDCB-EZAkHgqEw+ULRHK5FRVHozHY5kEon6hBREIhDDuSKYmMmhNXNkc4hgKCCWC8YhdEQYfpQGAQBiEXgSRTyMwzGwKxZI1Z0rI+LXFcKeG4+ELxKJRlnY-xROmd+74wkBdOvTPZ3P5xZF+glyC0QSsXDIZjIGC0fj4JfICDrqDGdCwQ-H5hQCQwiEyWGzeGNgOrELpeMJgkm7y+WNRwIMlRe48RuPJtSDKdrQzLMczzAtWGLUs1w3LcdzAPdkAPfojxPM9UAvHCrxvSVtE0TRlElSVfUVJZXxZD98XCb8Ml-HsQgA0MMF7VjchuEprixadMFnOCF26JcVzLdcME3bdd33S88PPJTr1vXQAAUpAATRol9QBVd9wk-Zigh-bx2IAh5UWiMzVQCelPCCG5hIwUT5wQyTkJkuT0Mwg8IDAXowCEa98NUqA1CCkKwAkUjyMo6inwbf0DI8YI-CDWJTQEsIAk8ACuyyO46VyEI8QZIJXPc+DFyQ1cfLQhSsLYaLQtPV4iJPKLgt4WK7wfPTUtcdLCROaJzkHTw8oKg4EG8OkTnJDJ0UtMyGWq2CPLq5dvNQ+SMMUwLeuUzBcHoCBkF6CRZRUKQ5WSv0lTS1YsSyPLMRW9xgiCLwAJCabuJKcJuzyo4ck2udaok+rpP2vyjra07ZIuq6JE0YwDAoxQhuekbVl8PwEwecq2342N9lJCzPAwBybk7Gk4lNHxIbEzzYZQ2SmsOrCJAAMWUKRNEBWhjA0jTaEFSUpFxuiXqAylysZNsiRxS5iTmwJcipBjqWiXtrlZ7aYd2hr4ea-AbuUO7VDFjTZabBXuJ8ZXcTDdX-u1eMHPSS0yYh6CZy26HCw5xqDv8iQ5BkWhtA0tRTFUXQZFlB3X2crJ4gpM4WW8EILgAlkbm47sfe2X7nKgl4ROD8TQ9NuG3OD75FMECBgri7RQV0MwZce2im17SlonRAGnNiem9TmglmIwRkCVpVi7jiI2Q8QhvOZqluWtgQh8FwBx2s7hKqLTl6sXcE4wJdkd0RReIBziYyYm1b78txG4hMDmuobr9epM3s3Ogild770PieW8EJ7yPnrE9OW+NYjAXRJcbsFxeyRAHISYMlx0jkkyFrFy38m6-3ZhvGSW9gE70IBwDgcBYC0HOpda6AoZCSiTinYwON+76XxoEYusZGQ0j-PTGIs1SRnHfPGZylxLjajpCvIhNU-5eTNsQuC28Dw0GIPQOgjC0YsLYbQZOCcuGwIHq+B4NM7ihBNISXsYR3ADniMXRkWwLJeE-k8RRtdSEAPIUAyO1Zo4SjPrw9EqJAK2MZqBAcposiEiOPxa+Zkjir2UWHVghBUCXT6gwi6YAMBtw7qRbuvdQkrHzqiEIF9pr3BHDiDIhUvZYhvjiem+IrTVzUcbeufjMnZIEBhRhBSsk5IgfFCip9uHDRWIETK1JiiMiDKaTw-ZNZgTjKECkcQ+wTTSb4vaGBRmDLyYFI5Ayj4DRgXMFKeMVif2Li2eIDJpqRHpABDZVJyoMncHSOxVVvEkJ2n085OShn5IwLvGhdDTn6OrIY4xnDylpFRPiBMhRsTUnDP9Xs8ZGTYlvtsO++zgWHOObk4ZGAtE6Nhcw+F7CTHIujEyL500uwom+v+TW+c4yQXzpyokQYSUmz6VWeQ4o+5mJ4bMnY-giSrO7G9CCAEtTFUAitS4b9CFdKUQcs2EhdCY2MNCWgsh-iqBMKCJlORL7MTxFsNWDkByPEvkGMMzFYwlDMsK3pe0JAQmUHIMw0sYSmuGACS1TLMR+B1O-bwWIAaOOni68aBKlb5WqVXG0NdYC2GYPYAAbrFaOksxayAlqYm5cCmy63VDiceDwb75EfjTByI4LiCTsrETauaRCFuLTHRQZaZD22mXcjw75UQUk7NERtjxm1zU9fGGkfszi0jyASHteb+1RxjpKTQAbDA3GFEy2t06G2KtEQOAG3EgLyLbBcW4dwt19sEEW3dRiZCgjMACStz4ZkTsiHWmdMRL0LtJOVOMPKQbyOxOcLNMFe35rfQOz936AS6FPZO4DF6m1iMQOTWmrFIjXzbL4VJ3ikM7pLcndDqgkpSoA2+ID57Z1gfw-NG9CyLj5WuHEXwL7kPvpLZau6WGWP1rY3hgCVxsj0k7DGK4XYBNsmYPk+AswOSOg+JQe0fI2hcB4Mwfgiw+Snp1N7ckgRMhLMeFGcG6oCUX21Es1y2nuTueaOIAzHRjMIVoM6WAkBT0tK+StSDLJtTons2ZbiBKi4xhyNUtzummg8jIGZsd8CVQg1RRiK4DTbNrNJJcTOWJYj5GcukbtRDPPpe+IF4LWWa35Uvm2kcMR5G5CjA5OM6IN1OQBo8ICKXGhkHM4DN+BWbMKuK4gQoNMrjoPXSImkPr-7IXoBWJlTJJGgd+dnFsYQByYhppmwkWojKYnWyoxuvkLYRXwheMAuBUC8FJIx8dr1Ahz3nYJaauQC6a3iMZK49MsS7auF4nVPjSWqPuzzbC9BcJhRUlC2hsANOfeyx4RkxcvDIPfJVrsnEcRzzmfSNspxvA3YyVzCOikuqo4IlS4g2jiAha7PGJk5IidORJ8Dj8+RuzbDAp9aH2bulr1u5zBH-lHsqSZ1AU9vzh4gRyCrQoJRSeogVuSSaAkAUw6BSKw5cvGfI+Ik9lXv0qTq-KriLXGsqZYn4UBaRv1VVOVp2Q82iPWonWZxFHqMUQv3DrY8MC1Wn0cYKMBWkLtmIJ8tAhoOJvfXw+5vL46IVkbo7oSHvqp7tg00Qe+b6XhqTgcQAUVteQgh6zwRLmC6eNuZ4Zy1HP7VwrUuIIXsAxfOwnCJOXhbVfY-vhpr9DE9a8QsncD7kF5vO9IyD3o3oIX+IbHyAmI4YOgL-WiN7IycRvrbHpIvs3WfEaB46qgELvzt-XEyLEIqzua8EiiHPGRkWHd5G1ZLrqnDndtfi1EUgPs1vRCDETFcLZGENsjSIXI8Mup-NNEcHxpEJfu3gjFhNaoUM7K7KrLiJGJrMxMZPzhPDiNAQ3lgY3BQvLuAUygDHGJqr2Gfi7DPjcE4pIrlmZHwecMxJ4LQYAlDBopCnvAfLwO1FGlqNkN2COJ4mcNcBxgSNSLTL2PkDsiUBtICmzMASIeopQgePnpjrSkwZiCcHOmBKsriJaLEk5OqOVKELxAxJ0oAbDqbqovQYpL3mYZAS9KEMXG2App2JPA3lwdPJNHKtEK4mOM5MIf4qIUYTtpIgIiaMrNUlqNXqsBiMGDEVrJBkkgkf0mCqcgUowf4bwqEP4EyOaFQaaA8EgV-r8qgfnDvm2Ebu4a3jLjJOSuCmcuSieEwUOCnjlEcPlCOBPiaCcKTL1tsrkMUaCicpSiYfQuviFpsr4PiG2O+BDt4JxB+J-ElriFlN9IsX0WUazuzn4djk2KdjrEIviJ9KxLHlQb9sRtUvxF9OcRcv0RAbcfRI-mZHPjsblr+CqtUb+DSF4GEFnJ0S3noZ4XDEyj2J+OigSMEBqviNekftsKcI+qxHiAHMboiXjP+l9g5Gif1pilid9NekPiaE-FqEyPkFqIJv2q1LAAANa8CMCKBoC8moB-q3I46vRBhyGRZ4inCdgC7iIUhLRer5zhIVRCGUbbooack8l8kCmMCYaVEqiPC64bKxAboykREQa4rWYN7KGrQAzskamBTcmCmSgcCZgsA3BckhbinQm9hSkJjxrXqUh3BYiVzpBEj8Sp45rqlFooz4CCDBTCnVr0SGkSm+mmkBmLpxDvEN7fR8IJgAGIbRkFLnRxnBR6kAkvS3DenGl+lmlRj8Rf6NoLLrQux0j2kxklnxlgAMZVrmKVkpk+kmnSkZlUxhB1pOShC5BajqyRlNxUYamdnBRSBYS9RelGmSnpmyk15ZnUlvRMiXbYjtn-G9nSoeB-g4ZSZ-b1mohLLxCBCBD5SOTCTmFUkYqYnhiUyIAAC0P2mIw22hqsmIZx5QpQQAA */
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
