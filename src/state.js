import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0AnMUCWsALlsoXgPYB2GANuVDBAPrkCuhAxADIDyA4gEkAcolCpysPGSqiQAD0QAmAAwAWAIwYAHAGZVAdlXLlANmU7FW1QBoQAT0QBaRSZ0YT6neoCsB74pcTKwBfYNs0TBx8IhJpajoGSCY8aiiCQjAsJkJkACMMADNyGggkoqwAWw4AFX4+LgBRJgAxHgAlAFlZcUk42QUEdUNvDFVLE0UdXTNPRVsHBBMJjABOJd1lbxNvLW91LVDw9GxcdNiKePpGZNTTokzsvIxWSiKSsvJKjFhWXIqpMiUKBMNIxUgXWjkZAQFLA0HEcFUDgQKhgDApABu5AA1miIidogi4pDEswUgT0g8cvkXm9SsxyhVvr9-oRAXC7kSIXRobCQZzzlQEJjyABjRGUADaygAut0JFILv1EOpNsoMPo1ootuojOptt55iqxittCshitlPoTPodv5DiB8fDBZdSTcKfcstTnq9ivSmIzmX8AXznRLIbygfzCS6OJksJ8MKgaKRA06BeGEtdyfCqU9aX6Pl8fsG2aGM8SeTCo2G4sLKFjxXFpXKkCAeoqZG2BqrvOrNRMdXqDUbBn3VBhFNatMZvDoLL2HemY5mrkkc5y8zTfe8GZ8mSXWezo2cJRwAMK8ADKTTaDUEV+qDTaTAAIgIAIK8Pjy3pK7uIJqIwTKoqhaFo+pWp4Nj2CqOjbBgfZBFatr6MoKz6IoS7HLW3JrmStyEluPp0kWVS1Hw9RNK0nS-p2lDKoMwyjOMkzTMosyjt4KxaKs6xWFaHjavo2GRBWeFuhuRFevmO7+oyHBXgAqgAQh0AjVEwd4PtUbQftUAg8CIbYdn0AGDKovgYMoATeIYqgrCsvibKO6huRO+jwWsUymKo84HGEjo4eJVAktmhGUjJuTcPwPBKdUdFmaAAwqNqGrgRxASeDscywYMpi8Z5QSWeaSzuaJHpcqFWbrhFnqPNFHQfkIH58E0FFUUw1QfipiX-sliBGIoGA+Ds+xjEJlmuTo-iTlsWiTAEDluRVuHVfh7oVMglDIDADURtWUAfugsAHbCyKouiDY4niwUrpWG3kltO17d6VawsdqCne9QL1o2Eotn1XYDQgppaPo0zcboPkuDoo6OSMM36k5QTbEM6irSFrrhRgz27WA+0-UdJ1nUCcZYAmWBJimhBpndp4PZJ1B469TxE5931Qodf1igDspAwx5nqMN4MLbs+gWiYKzzjBCzS5oSOGOaayauhmP3RJOMswTb1cx9JNgBUqCEHYHDaQIj7Pl1dSNF1PUC4xOhrCN3hjUMOieUYpiucY+iTvBWiORN4G+OrDOa7VuPbfjhN60CHMcHwPDW0wDQdAACtUACaTCPvpDQO+ZzibKMehqkYQT6voPtmBq8HWpMBXKLoYdgozWvR6z+SlDQYDsp9pNQK+YC9xkF2UGiIq4hgy7h+tTNRy9OtPD3ff65gRPD6PYA802FyAyZCpJfITgmBO4PGIollTuaagmKOUt+2NSwrKoSxgVOrdVdjkfa-tq-92OJvEefcwDk0ptTVM+4Z70zbhHAii8Y7egAevQeW9QG7z5q2MQR9+onwQI4M+2g0I2WvpqVUb9RzWk0GNCGXhbQQW8F-F0YVf6d2XtFc2lsXwdVtt1Xqh8-zA3wU7EwLs3aeU9sYe+eVVQS39sVbi+oPC6mYauBef9qQcGaA0ao54AASTAPzp3TkwLgFsEqCPooxRwYxNDgQlphUwV8r6ux9mBBRDcdBN12Go9ubCl4NQ4K+BojQnxGJMYXEGtjFD2PBkMFQIFXGGjyhLYa6gVb6ldq7Nifj4GbXYUEpOTAlLp1fPnJgHQeAhKiSI52o0ILuykd7PKjh9jWU8vqKuew7Q6DyfPHGrBUAQFIATCo5BSjPGGaMgeRMlLTLHiiCeV0sTT1nnAgZkchkjIyEwcZkztkzKAXHKA8ydk7xFHvKgB8cFCMFiDQObgDBn31PE7Y6FRzzhGBkoI4MnJbESf0n+CDDm7P2WiUFYBZknLOaM8BiZkxQK+Os7+rCQULLGRMiFGLoWRlORizBzZ+ZWOPgMR5oxrQaCCBLd5KxPmORGmsXQoFLJ6CWCJQKKKWE1XRecvZWLFKqXUppLhul9KGWMrc6xQsXCmgyf4OyQwbJTFygsRwIw7JeA8DaHpuwvBArRTcGKSd4q1JSjZEYEMZzC1iTNBarlZh1xtCsK+ph5yGANTyo1TUWptWtpRPh9sSV4IGIQ3YGAZrcW1BXCCNoH5WHcGsVwihX52RUCsTGsBxCUEkBiMBxSuDGNqKYrgZrECuE0KlRypD0LahSQsfYNprJv1tKqLQrhMIBSOGJLNVBc35uToWzOPB05lsWF4ScNlq2updW4vKKhuLNptD4DCFq5yZuzf2xOycrznjvA0IQqgADSY6K2TpTZaGddbXIzjcHfBu5Dhgbr7XgPN27Kk8BUgIW2pbg3CIGGeqtl6jCzvrUoYWd6W1qBcGBFunLgq9pza+gdH6v22y6H++5+DANTuA7WudCxYngyXVLOtTlVQmGfUht9xSqloaaFeU9E6gM1tA65eWS7PLSwgsYNQVGt3FP4WEpjlbcOsevbIhGnGpw6omNaUIgVKBYvgG2Ll6jrhsEIGO2Ji7VRqB4uxTisirRgz2DOaWTkrBrE9Y9OqGQoqFELHuSoY6fCahGlZiWDkAjJofsYCNxgMmmF8BYLC8GxIa02Qg3MDmCy7gDNAw8IYaxY0HieDZWHTIhsQKLUugcthfIMBBVyH8RqqjkW5XUpgOXdsqty2zlViJxfkollkyWOSRbsy6JgPxRSijgCpqVpKVTajcBYcb9cXWWBK1MRC1XfBXyCItGzC8Yv7Wa2RIMR5yydbqxKJg8ZPiudGxGxa85nUBC0CV1+k5rT6EkRDK0FgVs4zW96DbzmDxtbLCl3boo6CwCSGtSgTAYTIASK5tUGotRDg4iOWRHsJzCyGGk+CXywu1eB4aqSkV1tyU20ln7HW56Zdwf+wC8iQKwcghLPQrlLDqiQuBHiUxdgZvC3t-x0XNyxfx59sdhg-ZU-AjT6CPsU11zQpZcCEEUYvcjm9vIAvJjuCvtTswtPZaIAVXxKWZU7IOMoxzrHXqnqFN1nijmg8x1tL2NZPQfgIJ6FfoYeG85EL7CmLfXQKgatBQiyT7HzNzdsxOVbw2xsFhDeywgOc7h-C6AoRDGYaga6miRuZp2OwHKqHlwgzRofLck16-12Ag32xk6w+ajyQRV3mjQlOLYPtzC68MFOW0rs4OY9S6b4PgSLeHXDxTI7mHGIqBr4HNC9ebK2hkXLJ2rfJGVd2Ln43PeGsF-yOzE6NuAimj8kYccBUq6jisGIjPXgpy7H8Oz7vu3e+IK7hgFB8djl4vQRkXfJcD-l2P3GvKUspohgugLqPEEMPgRud+geD+m+z+ICgCmAJeA2H+YAkOhU7algi0Oq2SVCpgjKy6BoOSUweeBS-eK88BqCh2WAKBaB6UEwC0Fg2BBGFO6oPyhgSwrsmwfSa+9+G+Ie3cFBr+qAu+EuP+R+lc-+CwIEiEsaKg0iTk1mPB0BfBZBuQNuoEIwDiCSziYwlkYGCAsGMhEBXGagehfuamXO7okK-KByOKb+h0sKn+o+5knk6owusaUEdOeU7qEarg-gyeEsfY3BUBGWQeUyfK4K4RRyiBrAfWA2jhqBzhIMqo5o1kkwngM4KaHgFgnyfk2gbkIuTkV8AcJB5I1hkRkKA8VBCRkOqRyqGRU62Rqqg0Vo+RnuGEKaYEEwpR1A5RWKURGQn0AueB7houXhhGywPyugVmZgGETCShoRD+fRpQp6C0quoEIuGuYurSloiEnSrKZ85gysPRNuU+Earss6MaJ+rSQwGqnSr8DBAKHsQKpx7ukalxf+1crS527gngGRoE7kto-GyGtAaAhA5AqAv60e5OCAM4fsFgA4HEGgoiWugw4MwEHgtoVoLguwpgwJeaoJxsEJY6cJp2iJuongawqJiSQumJEBci84+JaIsAooOAYAlAqg2IJJrRCJawSJlJZ8N6bk7gmJIEoWkwTJuM5AuQeAvcUJFedyjEpJvJMwyJVJo4tqmgZUaETsXBHgkp4yMpvcGG0JVeOWPJN8qpAp1J8qIpyMsSjkBm8x3eiG-aUpRpYAjGSR+Cyplp-JKJ7GC+2pupsSRWwR-uJwrpIJ1Io83J8JfpFJAZ86xgbg2pU4WqvYzpEZOAUZeap6rRLGV6zBTE7Sd8VgYEnkSEt+-upxdk5xUazkEhXxaqIGvxl+tql8saCmwQQAA */
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
              target: "#app.registration.logged_in",
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
                      target:
                        "#app.registration.logged_in.register_tab.unfolded_form",
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
                                target:
                                  "#app.registration.logged_in.register_tab.unfolded_form.submitting_registration.registration_success",
                              },
                            ],
                            onError: [
                              {
                                target:
                                  "#app.registration.logged_in.register_tab.unfolded_form.submitting_registration.registration_error",
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
                          target:
                            "#app.registration.logged_in.register_tab.unfolded_form.submitting_registration.closed_registration_dialog",
                        },
                      },
                    },
                  },
                  on: {
                    TOGGLE_FORM: {
                      target:
                        "#app.registration.logged_in.register_tab.folded_form",
                    },
                    SUBMIT_REGISTRATION: {
                      target:
                        "#app.registration.logged_in.register_tab.unfolded_form.submitting_registration",
                    },
                  },
                },
              },
              on: {
                LOGOUT: {
                  target: "#app.registration.logged_out",
                },
                MANAGE_TOGGLE_TAB: {
                  target: "#app.registration.logged_in.manage_tab",
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
                            target:
                              "#app.registration.logged_in.manage_tab.loadingApps.success",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#app.registration.logged_in.manage_tab.loadingApps.error",
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
                      target:
                        "#app.registration.logged_in.manage_tab.loadingApps.empty",
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
                            target:
                              "#app.registration.logged_in.manage_tab.deletingApp.successDelete",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#app.registration.logged_in.manage_tab.deletingApp.errorDelete",
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
                  target: "#app.registration.logged_in.register_tab",
                },
                FETCH_APP_LIST: {
                  target: "#app.registration.logged_in.manage_tab.loadingApps",
                },
                DELETE_APP: {
                  target: "#app.registration.logged_in.manage_tab.deletingApp",
                },
                GO_UPDATE_MODE: {
                  target: "#app.registration.logged_in.update_mode",
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
                            target:
                              "#app.registration.logged_in.update_mode.updateApp.successUpdate",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#app.registration.logged_in.update_mode.updateApp.errorUpdate",
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
                  target: "#app.registration.logged_in.update_mode.updateApp",
                },
              },
            },
          },
          on: {
            LOGOUT: {
              target: "#app.registration.logged_out",
            },
            MANAGE_TOGGLE_TAB: {
              target: "#app.registration.logged_in.manage_tab",
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
        tablet: {},
      },
      on: {
        GO_LAPTOP_L: {
          target: "#app.responsive.laptopL",
        },
        GO_LAPTOP: {
          target: "#app.responsive.laptop",
        },
        GO_SCREEN4K: {
          target: "#app.responsive.screen4k",
        },
        GO_MOBILE_L: {
          target: "#app.responsive.mobileL",
        },
        GO_MOBILE_M: {
          target: "#app.responsive.mobileM",
        },
        GO_MOBILE_S: {
          target: "#app.responsive.mobileS",
        },
        GO_TABLET: {
          target: "#app.responsive.tablet",
        },
      },
    },
  },
});
