import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYALADYADBgBmAE4ADgBWbxDPILCQoK8AGhAATw8AJl9vDCCckO8AgHYCzLSfAF8ypLRMHAISMgo66jpGFjZObj4BYVEOABs7SGl5JVUNHX0jUwsrJBBbe0dmZzcELz9A0IiomLjElI93WOzcz2LMuKCCiqr0RqoG2oeaMRZhhRVaAAljXQAhbQAJTkykBzgWDh6Kw8WwwaQKATCaQCATSsSuASSqQQBW87hOoWiBXCyM87huIGq93qNGpzVo-UGEHeo2+vwBwNB4LskKcc1W7lh8MRyNR6IRWMQIV8QQJITRiJFYXJlUpd2IYCgglgvGI3REGAGUBgEAYhF4EkU8jMsxsPKW0IQAV8ngCGDCQWCgvyYW2krWBVdctKQU8vl84QpVI1Wp1eqWhvoxsgtEErBj2t4L34+AwADN6H0ICmC8RcCzPgAxGSA3TcxZQ-kebxhN2E1thHzuNLeAruf1pOIhQIo+HI0IBdy9qPqzWZ+M9RPJ01pjAZnXZ5C5wjMAtFkv0MsYWCEfC4BxCZhQWjr3X61gDZAQNPX28LkQSdjMMAYNMAN3oABrH9oznON7yXE1U3TMCszoHMMB3Pdi1NUtcGPU9z14S9X1g98H3oJ8XxvPD7wQf9OHvABtXwAF1615ZYmwQNIjjSd0jgKK5wm8Qc0n9Z1QhHSdUW8V0xJCa5VVA2M7wTI0oNXW9N23XdCxQ2g0Iws8L2It8IMfZ8rxI2T8IkGhiEPDBUD6AQtJk+cDKTRSYNklTELU-dUMPdCTx07C9NI+TCKM3DTLIiiOGouiGIdZjWKRDiwi44kIj4gTBXYkIUTYntsquMIZ0wfTguXaC11g9ykPUg8jz8rCcJMxylgkTQrQAZVUQFlDkMx2qkUF1DMYwrTkWLG1AAV4jdAJXSCZEpwCPxvCCATfERYT3FxQNPAyMSioq8LSpcw7MyqzyNLQitVGrWtxr5SbEHhT0MHcSS+2SuJfRCAcxM8YSXTFN6jkK6TZyOxcFJTJTKvgrcPOQ2ry3a7Q-l0MwpFobrev6wFpkse6mMeljewKV6wyKSTPRCQUCgHYl8RRVEojxMliik25iqCyHnOh1yzrh-BLXkGRtCkQnHWdeF3TOdbPGywcyQHT1ZWy51lRbNIMQOkqebKmG3MFiRdGMAxjBBWhZA+VQTD+CXmPcN7h3WrxkV8NFiVWg4nXcAJhzVt6e12ltvB17mDShldWFwZBmGQGBaAQwyX2MdBYAwMBcFQXhkgkbG+oGwFLZGT5bft4nHflDAXeCF0uOSunvcHUMRy17xeOdTKw4hiPeajjAY7jhOk5ClO08TIirwkUFARrcvXClN7AnlaIe24-JPAHaVZWRLXBUnXx3BdUHOdO8Djr5gfY-jsBE-h5Or1T1B04fqAJBRzRNGUdr2vn1Yaf8BJdaHoZRBEiN4Le0QMA03yGvGIIcOZqi5j3Ai+to7X2HvfUej9x6v2nroAAClIAAmn-RABRkqvWKJEUIVw+yOy3vEauhQWwlDOPCUOYNkHNT1idQeN8765mLH0MAOEn4T1CmoMAIisyfhED+CiwEMAOXPrwy+-DMFCOkaIsemBX5SJkWAcizAAJRSWDReicwIRxWJhQ-wvgGaEnmhkVsA5OzsRyFcX2aJ3GeBPkgs+ck1H9w0bfBCwidE4L0dgqABjRFgHMsQSy5AbJ2R8so8GPDe5oKvkPMJ8MIliLuPo7RWZjGmOipYu0DYHoLxxGEexjidhpBcZiJueJ8SeIoZ6MMDSQjdyyagvhGD8lC3zv1QaVtWRlysfaCadTK7sRrkEOuMQijK12ptPEDTAz5AGao7Jwy8mCIkJWZQUhNBfFoMYAhBDaCKALmQp0YkMA+D2FtJEyUYjK0FFso4DifABH2UEw56iRknLUMoFQA1rm3KeUtf6bz4gfI9t8punZhyxEnF4LaLY-aeGBfhSCYLjk5gkHIGQtBtAELUKYVQugZCQqeYs5hvsVlnDWY3bEGQHEEnrutHIEZCVORyYQVAEABC31wPQYsiFxWSvEa-bQ8rZFfgUSYoCIFMkHKGZfMVEqsy0GlbK-VCrikxOVQaoxkVKnMr7FkN6uJt6hlYt2AchQZo5Q9GA4IZJhUX37qaw1xqfxBrAIqi1KqEkWSsqk3g9ltUgt1YGqNRqZWhqjRGyeUBLWSvKZRcxMVZk1KJgs+1r1JKRFAbtR2-Em6eE2UzI4tatr9K4YEolkdyphrTcWd+qN0aY3GVIPG5gCbFsYo6ViyJAjdkiEtGIhQ0QDndv4aIVwYgCpWUUf1wToLCwpWLeF7syadmKLNBWUR+xN1CGTNWpQVpSwbbu0FUdjam3NjbEuNtjB2wnTYhZW03GsWrtlR2bM8VttPhqWAthmD2D-Akil9ybmyDuYoZlSJ2LOjOHkfILoaZe25Q2gknp27BBWWiTh0G4BwYQ0hylihUMyAIZhlpgQ654Zw4RjKbZPGzXI2JXsBL20wbo4IRD5LKXtU0N1QwngADSbHsOcfIwRwUAkq6eNDFsBKDT-GgVgyIejUnaAMr+GYT4GH-3zIFFhjjuG1Pyw097PxnTPG4YoZcFUNGjPwYkwxszMgLOfDrDZ2pdn2M4eJE5nj3skT+G07XFECJcRhz8yZ5D5nLOqF-uF0tkWVOOfw85ojiB0Skc7vEZKeJ0vick8h220LlMOZiyVuL2IPmVeVArXwEQKiqmYOm+AcwqRPBpOQcb9JWisHYFwHgzB+BLFeKW6xtn0gge8aGXsHDZr+kdhsJtCIloukPgdKbjxKATZW+0ebXRluMlgJAO1R9sha0ce3HYbTOtTiyjleI7dQzymowEi7tIwctHEMy2mr1UTbYKLtze3sj7hDlEfLz22oOg6u80OkZAGQDCexAO1LyQjyjw7xBtPF-S4k9ZOX0nYj5vRE6fCH0OESw61j4BHtOkfYkiMOTxNNFQI5pi+5NZpeDwq8P9cIMQ9pr2iMrJam0ewhkyC2cXxL+7KUFvmGq3kyzMtdGEd04YpyePIyiSBw512ei8JkN6-XRPhwlwbAWgiEYG80uk+quljK617tmpqOrmXzVNyHMkDaexvSWhlEj7cWzKi2vNPwQKXcoO1+VXXnvqpeR93VTC-uwqDI7feWgJ4OAcDgCN6pk74q7X8Oeycno-a4jK06GU2GvULRDBQrXXb3cbj13ny6vui8BQD67svy2Y3ECeaUDIGBm-7zbytDKeIAZk87IJHzATA9u-5sP3PF0kbaQaoFTPj2UwH9oM+ZARoF9sSSilHi6VvZS1lE2sBZJ1ZIgH33NnrDCfojIbr5BPo1AfsymTl-nNAtPkMtB3lzv9E2n4FOMqO7AATkjnghKPkjNAS2IEHAZOAgZkEgStFkEzFrObr7FEFgSdDgVuMbo7GbofCtDkFbt9k9MlIzCiARmJJRkEPQSSgIiPNmk-OnJnNnNiHXgBv-FrHCPLGGKugjmysrBEK8sHIOK2F9EtMISEuCmIaFBIRhFXjXk8p6PYg4lxJkB6I3lyk9JJHxjkMED6GJAZomp2oAauKEp7q-CYXPhYRoVEG3oGF3giNetylxH9pOIvu4b-voeVL4UYboi-DEk8hJMvISGSEfIrHWtyjTOxLAitHEJ-ljiokmlnj4YYVguIWnBkaUFkVEDke7FEPkU9H2KrDlG3HiBQh4dwjqlUegqSgUqUrohIi+HElmE8hEP9PNN6M4i0i0g4SxEiMOFOAgacLiJ2IkdUSMVojIuMZXtXrALAFMWABYbygiA2r9sqKGC5tyq2FkJbkUDkMUIrLscMaIaMYcVEhnEkoeOcZcWTNcWSLxHcWSOQX1nyqUBGK6ltJ8bkt8QcZElAE-DMWGG9gsUsUsSsaUL6K9ORhQn7LTEIRnqXoPl8ZovCpiUio7BQqimEO6r8hsYUMUGcKlOnjRpnpSXKlar2hmlalmqFLmtMflo6P8v4A0mwZbvkNbk3IiLbrkBsZ6HxIiT2iGnyWapgMcTXqKRceKQ7HECCbNN9CrFLBAgqb2KrrLL6H4uqampqWGuInPvqdAVcMvqaeiMEBaQOOJJtOzCsrxHkA6fyU6ZmugMbriKwRbhwXKVwSxNoa8rkC0jKC6DECzvvtPryRqemsbolNKbGWAvGftp6KbuutKIDH2KxJmRUV4WghYQmU7murkH1tlK6IiHvnWfeBkR3lOMUHKM6CllrGTnVsZgFoaGgLwIwNZrIetmsJEOxLtBusDC0oSO6oLvxvEHNJJD2GOf5ohpOdnIwMyoua8u9vEIUSOXzogM6GTElvakUJOPaS7hlhObABwBqCwJ4IBKeVXMuVxKudeQJNGUlncV4BQnsq+fVj+NKvgIICIrOfMHMhFs2P+ReUBeua5n4qRsoTTN2DsdBeOYeXBQhWAGFnOahQuehSuVeVhdiMqHMfxt2H7D6uUbOG+SRfQPBSInlpRQVmhUuRhXRVEP6FiqRi0q4dKKUPufRgPNxWRVIFuDIn+UJbRd2MBcjitJVrtDvoUP-kRQeQafxRKdEMONFlxuph3lEHKKEOGPkM0YgtUE8n4vtu5qEL0bEK6DiqDBUEAA */
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
      initial: "logged_in", // set back to logged_out after implementing the form;
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
                  initial: "loadingDelete",
                  states: {
                    loadingDelete: {
                      invoke: {
                        src: async (_, event) => {
                          await removeApp(event.data);
                        },
                        onDone: [
                          {
                            target: "successDelete",
                          },
                        ],
                        onError: [
                          {
                            target: "errorDelete",
                          },
                        ],
                      },
                    },
                    successDelete: {},
                    errorDelete: {},
                  },
                },
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
