import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0AnMUCWsALlsoXgPYB2GANuVDBAPrkCuhAxADIDyA4gEkAcolCpysPGSqiQAD0QBmAAwAWRRgCMmgJwA2Azt2LFqgDQgAnkoAcGgKyKdagOybVqvcrsBfHxbRMHHwiEmlqOgZIJjxqYIJCMCwmQmQAIwwAM3IaCGjsrABbDgAVfj4uAFEmADEeACUAWVlxSXDZBQRNPUcMF0VuxxsPZxs9C2sux3sMRRtlex0bACYXVU1FPVU-APRsXASwigj6Rhi4g6IklPSMVkps3PzyIoxYVjTCqTJKKCZ40KkY60cjICCxP4A4hAqgcCBUMAYWIAN3IAGtEYF9iFoeEQVFmLFsQlrqkMvdHnlmAVCm8Pl9CD9IZdccC6GCIf8WUcqAgUeQAMYwygAbWUAF0WhIpMcOohlpp7MstHojG5lGt3Mt7BNEJp+qoMDoXDonMp9fZVDodiAsVCeScCediVdkmS7g8clSmDS6Z9vpz7cKQRzflycQ6OEksC8MKgaKRfXbucHImciVDSbcKV7nq93v7GYGU3j2eCw0HwnzKKiheExZKkCBWjKZE3OgqlSq1ZoNetVNrdV0VjotMo1Ms9NrjfZlIobcmI6nTtEMyys+TPU9qS9aQWGUzw4dhRwAMK8ADK1XqlUEF5KlXqTAAIgIAIK8PhStqy9t6owaGoio6Ms2orHoNg2EO3QuMqJguEqqjKMa3QbAueyVmyK6EhcOIbh6lJ5sUZR8BU1R1E036tpQcoIKsIF9BBQHIdo0HLCsGAeAs8wKooLgmta-i2hhJZYU6a54W62Zbt6NIcBeACqABCjQCCUTA3neJT1G+JQCDwIhNi27R-nReguHofQbAOyHKBBNiWtB6w2H0yxcTYsGLDYgm7EEolUPi6a4SSUlpNw-A8ApJRUSZoCdCoqwYBq8xLMhizIdB9j8UlbmbB49jgTo9joX5S6lthzqZqFHCNG+Qhvnw1QkWRTAlG+Skxb+cV6poHkYMMU72Ho7iKAVOjQfxMxzOOFl2dqqhKiVLqsgFaartQhTIJQyAwDcGRlhCb7oLAIbllAcIIkiNbopiIllWJQUYJt227e6B2-EdqAne9UDVrWwoNp1bbdQg-EuP1nirCajguClmULLMKyzsoyyKMsppuUtmGrRVRLPTtYB7adh3HcTvxRlgMZYHGCaEEmd3HuV4kbVtBNEz9n3faCZ1-YKAMSkDNGmbDyj9ZaCyjbD06KE5mycdoireLD9iONsQmLozD3rU9rOvbcHOk2AhSoIQlgcJpAj3o+rXlFUrXtYLtHaDYmgQ5szg9COqguJlaMYAquh2LO3krC4WP+Y6j343r+3cyTX0cHwPA20wlSNAACiUACaTD3rplSO6ZQ2GnYwxZVlfF2ZomWqjlHjuKo3lzmH6sM4CTNR7rhPunkNBgEyn1k1Az5gH3iQXZQiL8hiGAa+3Ws4TrL3d7cvf9-HQ8j2PYC83WxyA0Z0qxfIiBrKORXFwtdnDWo0H6sq7HK72ZeQfOrelZrOPM0vbM96P68fT2D9Le-cwAUypjTRMu5Z5txWpHbW0cV4ZDXgPIBcdfggMSLvfmjYxBHy6ifUGVojQqy2FfAwvZzBWD1G5V205tRqFVP0Yq79loOkCggrue1za3ktg+J8zU7ZtQ6ofH8wNCHO1dsMd2dkCro29plE0GBEKQwMBBDYyxw73S-p3Ze3CaiVBKKeAAEkwN86d05MC4HwwuIM8qcVMB5S0A5cqZSGsoty-ZG7OD4loz+8DF6IO4c+SoVQHxmIsbYwh9j1CNwQh4UC6g75jGUc4fUPQ3JLH6H4+eOjOF6LJInZOCl07PnzkwRoPAQlRM6JIt2qpZFex9tQhAWxwYbBNA5dQoEXYsN8mw5c39WCoAgKQQmhRyB5DuCMsZg8foKRmePeEk8rqohnnPOBHDF7DNGYkJgEypk7NmWg0MUAFm7J3vyPeVAD54LEULEG+pFRGgWuxXqAxNgq2guaKRQ1zSWknKqN+-TsYBOdEcvZBzEQQrAHM9BZzFlgOjLGeMUDXgbPYWtbZiL9mTOhYiuFpzzljOwfWAWojqJOzcDMHQryXZ2A2D0HULTn6i1DoCrK2p2J9OEh-XJYKiQwtxXkeSylVLqQtveHSekDI1PlJoUCRoLJDV6QVaRQ4eijj0HxJYlo0ZvJ5RiwZQVwpJyinKhACVwbJWQildK40WVTkNCYVU6hzIWVMC3EFEctnnBqnVBqTVbZNQdhS4+tT9R30WElNJk4rQDl0F63l+xYDiEoJIZEYCk5WPMWUSxXALWKlMP1NG44WL8VWDLFpoEFQqnWDfJUFkxjh1TVQDNWbk5cFzTwdOhbVYluWGWtUsF+hDjcuxJKUsWLATmi2tN7aim51PDeSoQhVAAGk+3FrsIO8cw7K1jsVMqXQ6NkIe1NMC5NOBW3prwJmxdlSlICDtgWsNBDan9p3UO-UI6q2TEydaq08TIL9BHXOttd6O0VJ4E+u2zQ33iI-du0te6f0HurUNSyKMFUoyvujRw4Hb33uzY+591QLxbpLih8tv6x2nq0KNewlCNTuAsoRhd2bhFhMowO79FbR3VtGqOXsEFFgWSPeZJaAALZAhQ0isCwDAamMm5MKaUywVAYBKClGDUwYxb5GhKQUvURq9Q+3OE4nYccA5LQbEcNBWutLVi4dY0hHyyaVPycU0kDAnm1PXAFHQWAkAdOkTtvpwzxnTPmdFo3FQE5bOjT-fK8G2olTjl7G5ByCw-BCUoHi+ATYjUd2iGwQgFqBgeFmOoFY-ZtT6ioZMRU-QtC0uNKaZwFlVg5M2Viyq65QpZFzDuIohb1AzDeYOrKCw4lQRZY3GYEF9ALBAkNfiNgeuYtxsFV0RMczbh9NA-cAYKw+p+keflhbVvVe1WWpUkElQTRdpOm+Cx+JFWGJt412sqp7ZkkRP0B5izaJ23Apg7wBQCjgIVu5lLTLjtFqWkwJ7bWKgmhOnod3eydMvcVhe-XJJ-cIiNvc9ITvMhBwM8ITBkVYAtQj2Yg7kcgVR8yprJpwZTjsx4KcmxNGsNBb6iSIUifDcO-mMnRZTuU8CxIaIoKmDgmQJEenR7uxPL7FqNneo1FJW8KjWCcxA649gVt7+v33T7dkkdyXh5QWFsgqOICixQJyPsplZ7c5DDuAMP0XqX2SuLwt9JYn4vCgO56EldYLuwKTkgtBEwGgEIDEWOoSrhrTffaDwNvaY3tD+xdlNlwM2PJzaa4O0cngQIqAcrS8cG2Bdne2z-GOQ9OZDwtcXEtZcEKgark5Wt3s3DuFNLhjyAf8d4y4W9eF7ejYm0mLD8Np8lizFNHZ6viWa7Klde1s0XWk147yYE6f+tZ+kwh1D2AMPmz4MQ4gIqlkIJrG8RBdiRUnI6Cd44WR1lPYT+P2dCCRn1OTn0pheAtUfwwGfw8G8jf28m1y6HUFFm8CeSyh4hNAAIFRZgKTP1AOOk7yQm7wWl70rmGgTzllnEwxVhGlMD0CwKFxwN-lXn-lQUwGAVYLAE7y2GIPLj73IJZWMH9lMFNG8ic17BNz5V62b2AJYLHg3kv2h0wS4IQweUIU62UU8BdiQjjRDjvkjw+2jyWG1Q2HcyP2wJbyQQwBQQ3lp2UMgI1E0PUR0K2D0JZVRkNBAmNB6FMDslNAYL6yn1wOQVYPjkILZTmBIIrmLwEKa2QmVCyWvhMNNEbgCJkNPzSAqyINiScQSVcRaSKnBjcCdXHFnFWEtDSKGRxShWmQuUJTOmJUSD7XHALxw2m0tFLyHC-0shAl0E9m8lhlSMb0p0COoCFRqJhUHkUOv0aJUKX3fT1AGM4gHC8EbloQKmaTiIRiVB8M7DsgHDVm9RGOb3GLxVqOOUwFp1mId2NGWMnDUFq0VA8m+TWE4mNEgkVjKP1EqMelOMOQJXQDGwslaKLxL1hi6NRhIRY01VdW8B+O1j+LmNv3uSdleRBLezBLL0QCykNDUQ2OcHNDjXhJwkgOSwQG8WgKKlRi6RxOyWGP8QtVVCHAGFFjW3Ml6jiyA0kJTXnUg1oDQEIHIFQFfXmPvy6FdSNFRl6l0CtCcEHGrQVCoyHy8h2P529RvXbX5JNiFMLQlOr2lLazlMQPHVdjWDGFWBMIGG6HYz5NgAFBwC01UDRF1NpUlIGBdkNNW0PQWn6m1V51cGNBtMzSenIDSDwD7hFORLh0eT1KlI9NlK9OrStFFlgnNANBRnWyDMRAmTDL7ng1FLUNqVjPdJlI63lP-RVi1R7DVAOM8CzJDNzLAAo1UKdmLINITPLPlHYg0HmGGm1BMH0HWHrLJDHhdM8LjNLKNLHVGmVDBm9irx0KzL7V7F41Q34zJMHS8H6hAkrSBUWE0Gk1ky8yU18yPP82SCFK0wdzsjX1gKE2Sj4gmg0Hrh3RdStBdkPNU282UzPO-KYFl2CwgELUri0A8HWDcFLnVRZWLxeXeVRjyiWAPNYT82-OAs8FAvrggrmCgsmH0CVWsmLjsH0HYhKgtQWmnKNC-11XSTskd1yx8CAA */
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
        tablet: {},
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
          target: ".tablet",
        },
      },
    },
    hamburger: {
      initial: "hamburger_closed",
      states: {
        hamburger_open: {
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
