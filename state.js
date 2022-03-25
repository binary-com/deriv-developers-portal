import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0AnMUCWsALlsoXgPYB2GANuVDBAPrkCuhAxADIDyA4gEkAcolCpysPGSqiQAD0QBmAAwAWRRgCMmgJwA2VZoBMAdm0q9AGhABPRDpMmMq1Sf0mArEZ3e9egL7+1miYOPhEJNLUdAyQTHjUYQSEYFhMhMgARhgAZuQ0EHF5WAC2HAAq-HxcAKJMAGI8AEoAsrLiklGyCgiaeh4aJoqaJgAcam56OqpG1nYIRsY6GEajOqOqOgOK6pqBwejYuMmRFNH0jPGJx0Sp6VkYrJR5BUXkpRiwrJklUmSUUCYSQipDOtHIyAgCUBwOIoKoHAgVDAGASADdyABrFEhI7hOFRcGxZgJPHJO4ZbJPF6FZjFEqfb6-Qj-GE3AlguiQ6FA9mnKgIdHkADG8MoAG1lABddoSKRnbqIRZeLRTIwePTjIxGPSKOZKxSrDCjE0eHTKPRqVTKDb7EC42H887Eq5k25pSmPZ75WlMemMn5-HmOsXg7kA3n4p0cVJYd4YVA0Uj+h180MxS6k2EUh7Un1vD5fQMs4NpwlcqERkNRQWUDGiqKSmVIEAdeUyFs9ZVGVU+DVanV62xKmYaZTKByKRSaoyKHR21NR9MXOJZ9k5qne15094MovM1mRk5ijgAYV4AGU6k0aoIL+Uak0mAARAQAQV4fFlnQVncQuk0MdDBMCddRnfUFh1PQVlUPQ3DcYwZmMBdDmrTkVxJa58Q3L0aQLMpKj4ao6kaVpv3bShFQWNwexMOD1lMVQzR0Id5k0UY6IwHZ9A8EYBkWAwUNCMt0JdNdsI9XMt19ekOAvABVAAhFoBHKJgbzvcomjfcoBB4EQWzbLo-wWODoLMKcdhA0ZFDGCCjGUYwMF1RQPDWRzHNWIwhLdDkqCJTMsPJSTMm4fgeHk8pyOM0AehUUwMGUMZQItCcRlmYcFhGZQMBY6dso8VxvFUHy0P8jNVyC917lClo3yEN8+DqQjiKYco30U6Lf1i-92KcDZdWs1YNR1ezp2WVYWLUE04JKoJ7VQkTyow10SmQShkBgGqw0rKA33QWAduhRFkVROssRxRal3LFbSTWjats9CtoX21BDuegFa3rMUmy6jseoQRx+tg2yOMWZQ5x0eyJwmnRNA8M1dTNC0TFKpbnUCjB7s2sBto+vaDqOgEYywOMsATJNCBTK7jxusTqGxx6Hnx173ohXavpFH7pT+yiTOS41Cr49RLVGDVoZULiHM0dQZg1cdUfmxdadEzHGdxp72ZewmwBKVBCBsDgNIEe9Hzaqpajajreao7RRk0Y11Ht4Y53tzV7OMaDjE0FKbUQuaDmE67VcqrH1pxvGtYBVmOD4HhzaYGoWgABXKABNJh7x0mobZMjVVGNRQxZMQxAN4kwPb0Hs8q8UYdRFowA4WoOVeW+mw4ejWHkKGgwFZV6iagZ8wF7lITsoFEhWxDBlZBOm1fDpnsh7vvtcwfHh9HsBOYbM5fsMuUYvkRAS+WLYPEcRZp3tnQocykY-C0fQDGy0xLXnJWabnkPMI7iPPRXv3Q4G8R59zACTMmFNky7hnl-PyGNQ7q22oAteg9N5gJ3tzZsYhD7dWPoDTYuUEaX0ApqXQd82I2Q8Kqe2TFlBmj6HXNGwc24L07jVI2t4TYPifC1S27VOoHx-P9fBdsHYbCLoBQC6xGEeyGM4KcegCquBUIoZhrcEG-yQZSDg9QajlFPAACSYG+ZOycmBcG4bnAG04C6y3NKsVQM0xYeA9h4HK6hXJeQMNORu6jv6sMQYvLuoVnw1FqA+ExZjrH4NsQozYyhHHOIRhBEY4xnC3wtAjLwuom6z3gQFIJ7CdFxyYPJZOz5s5MBaDwMJMSehiMdpIl2Mj3b30bg7NQUwzAzgkaMfxBSKq-1YKgCApBcYlHIIUR4ozxkD3xvJWZY8kQTzOhiae+SnSFOGUsiZUyUQjLGSkeZUcoCLKOdvIUu8qD7xwcIvmAMRjw1ykxWyEMxh9BSffM0Tg+iJLgkMYwRc1GfxbgEzRrpDnjKYJM6ZULjnANOec8ZED4yJmgR8TZy527wr2XC3ZJzwxnN2ZgxsPMhEUVtmYah0wBggVBp81x98-Be2GJqOchhCpMQGVsoZkLdkwv2XJJSKk1LG3vNpXS+l6lKmMNXOi-R1jWgRoBVJ6oNCFW6YwxxRceXYsCmFOOkUZUIHik4JK4x9CpThiYDK8xtTsRgojehDlLRqD1fPSqHA6oNSaubIi-DrYUqPg0kYqTPDV3WA4My2o-CK0DkcWA4hKCSDROA0pXBTGVHMVwE18NtSJQMDan5pgzD2XttQpKrkdgmg4hWtGSaqCpvTfHTNqceDJzzV4HsFpNh8QcKWzQEF4oO3WBGtQtlAINuTc22O8cLynhvDUIQqgADSXaC29uLQOxwQ7MqMS9okhyblG4XzgtOpteA01zuqTwRSAhLa5uDXghp3bC19s8DustmUVDmiIRxKurkvBTjyYtRtKar0ttvfey2bRn0iNfZuot-bbW7uHfDM+Kg0kagRqB4S4HZ2lJqTBuoF4N09uQ5+1D377UmgLlaUYuotjeEY3hxNM7IM3oERE8j77t3Ub3farYY4+jX2E34HyAALZAJRMisCwDAcm0nZPycUywVAYBqBImFKwEommMhRHU5pioFs6jPh4KeeSLRl3tSlQZO5lKTIywvhgEux6BgeRtFYTKQwNBiww+MPoMtNRSZk3JhTqQMDKfC2p8gGmtMil0-psURnKBnksaeVdFjhDrvgw8-BrrRhaF0IVJVt9bKqDkSsBG2oxaJNvvG5uUWwuqci9F1raQ4uaYwNppLlADNnCYMKOgsBIAmYDWZizVmbM6T0vZ1suCEP-iYk4Nz9CPM+y8xBD5qpS7mirhGtj7WItKZayd1L43WqGLfC0RS8kmhNSaHmsdzg5b9kMFXRJqSpgvNMElJiTGZbeVBc1lTJ3QcxbuMNiQY2+F1Gu7d+7j3nscVe+qd7fQHJ2qVAYDAGpL79BY0DQI81KD7PgC2LFnrmBsEICa4YLguIiwtEo2+5XK6-LUH0MYqwlG6pB2VCF4lgrbTwjuUoeb1DUNWFIlpbtRjQzcHj9YjGgUcotB6n+rpswhVwvmcXe4mRBirOjQeR5wXPfVEz3JTEHIWDGiXXKYtDAOU2BqfomvAm-x19tPM24-QwP3MbtkLCqrwKYF8YUwo4AU4cyGkcDkpYQ1nIkqcEMxoFoRuaBGAGVue6F2HnCfuZKB6NyWE3offJOiYLGd4JrG6J8NMn+KafWIGjhnjiwIMxg8Ua1TrXwvqqemL-hAMB5SyV+h6N5ggumBQmQDEev+bezqk1Ee3U9l1Rnz4jqHU9L9D5+2dr9cuuR8G7H8H838C80mmWFzkC+hr7Y6yo76YSjNv46nH3uBvLbqF9P9JPhDfv0IlMBKBE-qkj4E4H4IsKhrfHXNqIfnyoPikCFJLtoCsM7LLq0grvfOMBoKDLOLht4D7CCgmoLkfndMEpHESqzIPCavnIXMXKXK5GGvuo5NQkXO-qsNZNaMDuQabsgQzNQZrLQTrHrAbCam4EVnOIaHOOqDLOsEyvavDNBJaNaOMDOLxPwU1hQUIX-EvIPHQZHtHrALHgtvclRFsGoRxNko3L5g4NDD4LlFXNoMesqoJALoIX-gYSEkYTrKTHXnllYRqM5LYTVionOBXOwbOLlPtlsBIp4PQkgT4doszKcqzAwdaEwRfCweXJAZLIYE4g-l4EMOel4ZXvoWkcvKAkAuvKcugikAwbjjZMweYPkffGML8k7LODMDbmxnoakSId3LUagiYTHo0WACauaE4JqsJj4K4GYM-v2saHBLoC7mlElCke3NUT1qMdHIcLXlgJMdMUlHjrBPMfYUsaknXEVq0UohDMMAJAEBURopQcIcUiMaPGvFkTlK0bke0WwWxJqNBGsBfI4HDKlK4NsWwv-FkPTtkfYokhsMksof+Cqs5I3OaLBHREUR-AIZUT4bioKvihcoSrtMik0cEU5u4jlDLi7NIvLt9o6j7GUSnmDHsK8eCu8TMhciSQcgSocOMWYZSVMdSY8msE4C4H9iXBqHOH0KksjIXDaNLJsEXP0lyYMkSQKrCgKWSYcYEVgKKTfg4GjiBLKYDt5sCWaMaEetOK5PoNMDof3l7vynybqbyXMugJLpxPSdgUyd8iMILNMBDCxOaEwpqb-jijqfspLiqH6XLrIvfIwnjp4AYH0d4PQpyQSW8UIdMW3r0DaBoOoWyhsL4B7pGWKCalMBBNic4HRCqsMGsPthehBmmrQGgIQHFk+nHi+v+DOFoBqKyaWiBOLPuuMEViXMBC4B5oaAMXABxu2UmPrHFnmgOaocOUDPQlaUoBwc5CesUTak4h4K2c2p8MKDgJpqoJiGuXXIOQ8dRqOTudRHOK5qhgeaYDqCeV4QRpBljOQJkHgL3D2RYY5o8uuUOUlCOducOjaAXFXCxFIiQelKeX+ZMoBb3HBr2Utr0BBQ+dBWOfMMMAMM5OONkhMNqMkT+YuSiOhUBWAGRuKaInhZuY4DBeOY4K5vDB9pOqQqhe2XRb3OUFkKPLeT2BuVBVuYRUqG-mEeyuqLQjMPxWKdhflg0psEVluihoOvZP0AXIFrxLqI3IBqFmDophDh1qlj1olnpv1ill1vlkZH2b0NZCsLOJ+k4nBLkdtrZFxO4kMMqixiFiDsduZaFXcA5dZTprZQNlQENiNpAHmg5EVjOboKLIjKsD5fpf5TsC6usMFQmuFadmZRFfFnmuxHYkxGlTaBlbgfMH4H8QOExPjm5GQU1kVRZedlPolUxQ0p4JztaAYKsONI4fuuoBkoVG4A4DZAYIkqZZDlgOVZaK9rxFamLPoJlZlPoLlBZO4uoM-K5N-qgCakxGNHEWzjsNqCxBfCCoEEAA */
createMachine({
  id: "app",
  type: "parallel",
  states: {
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
              initial: "folded_form",
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
                    loading: {
                      invoke: {
                        src: "getAppList",
                        onDone: [
                          {
                            target: "success",
                          },
                        ],
                        onError: [
                          {
                            target: "error",
                          },
                        ],
                      },
                    },
                    empty: {
                      on: {
                        REGISTER_TOGGLE_TAB: {
                          target: "#app.registration.logged_in.register_tab",
                        },
                      },
                    },
                    success: {},
                    error: {},
                  },
                  on: {
                    GO_TO_EMPTY_STATE: {
                      target: ".empty",
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
        laptopL: {},
        laptop: {},
        screen4k: {},
        mobileL: {},
        mobileM: {},
        mobileS: {},
        mobileTablet: {},
      },
      on: {
        GO_LAPTOP_L: {
          target: ".laptopL",
        },
        GO_LAPTOP: {
          target: ".laptop",
        },
        GO_SCREEN4K: {
          target: ".screen4k",
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
                CLICK_LINK: {
                  target: "#app.hamburger.hamburger_closed",
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
  },
});
