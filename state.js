import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0AnMUCWsALlsoXgPYB2GANuVDBAPrkCuhAxADIDyA4gEkAcolCpysPGSqiQAD0QBmAAwAWRRgCsATkXaAjNoBsizZqMAOADQgAnon0B2dRm1uLAJlXbVy5Rc0AX0CbNEwcfCISaWo6BkgmPGoIgkIwLCZCZAAjDAAzchoIBIKsAFsOABV+Pi4AUSYAMR4AJQBZWXFJGNkFBH0jTQ1tC1UhzVUjfQ8jR30bewQPCxGMRXWPRw89C0UBx2DQ9GxcVOiKWPpGROTTonTMnIxWSgKikvJyjFhWbLKpMiUKBMFJRUgXWjkZAQJLA0HEcFUDgQKhgDBJABu5AA1miwidIgiYpD4swkgTUg8srkXm9isxSmVvr9-oRAXC7kSIXRobCQZzzlQEJjyABjRGUADaygAup0JFILr1EB59JoPFo1Y5tI4AkZlh4FkplKt1ntFDN1EZVBYDiEQPj4YLLqSbhT7hlqc9XoV6UxGcy-gC+U6JZDeUD+YTnRx0lhPhhUDRSAHHQKw3FruT4VSnrTfR8vj8g2yQ+niTyYZHQzFhZQseKYtK5UgQF1FTJW31VerNZptbrzAajQg9toNbs9uqZrsdUF7Wnoxmrgls5zczSfe8GZ8mcXWeyo2cJRwAMK8ADKDRadUEF8qdRaTAAIgIAIK8Pjy7pKrsOAwaIo6jjnsJhGMoRjaCOKimGs6xOLMqiqB4EGqIcDrHDW3IrmStyEhu3p0oWFTVHwtQNM07Tfh2lDKks2oaPotpzP2KxmNYdgqtaqhwSo6geJoTFqvORzhOW2Gumu+GenmW5+oyHAXgAqgAQm0AiVEwN53pULRvpUAg8CIrbtj0f5LLMjgYPoviOLqDEWIYjgjpsjm8cskw2U4yh2qJ7pclQJJZnhlIydk3D8DwSmVNRZmgH0KibFoqiOMoQG7B58ycUsujaBgk7KIJgweDqijoYux4Vjhbo5mFHBtG+QhvnwDSkeRTCVG+Kmxb+8UOExFgYGlNnbMoAm6lB2XmoNk5MZaMzmOVmHiYFmartQZTIJQyAwI8uSVrCb7oLA4ZVlAyKoui9Y4niy1LlVkkbVtO1gHtp2Hcd71AnWDYSs2PWdn1CB2VZ2hDB4Mz6PoyhOG4LkWLM+UbIV4EWGN-hLWJ90ScFGCbdtu1egdQJHagJ3E+dcYJkmKa7hgFVgg9uP4y9b0U6T5NQmdP1in9soA7R5m6sorjg8higZQEk2LJsqyTqqSGaDDuyY-5zpBetePPYTTzs59YBlKghC2Bw2kCPej4dTU9QdV1At0VDnhDea2hqNq-bOdlyw+HBJVGPqKiGB4qtYat1XkizOv7VzH1kxwfA8FbTB1G0AAKlQAJpMPe+l1Pb5nmDx46GJBENl5sLm6PoSMqEV6qlSHK0usz2uvV6xQ0GA7Kk19UDPmAndpBdlBoiKuL03dlU45rkdt08Hdd7Hvf94PYA842Fz-SZCpxfIiCOErQ26oYozjihQwuRMGpuDq+gWmYyFjI32Nh49WsE3PuQL93xwUyvXdgFjFgeMWBEzJkIKmSejNp64XfqzduA9F4k1-jHIE-80jrz5i2MQO9ep72BofHyjkRjeAhoVRQLkpjVxvgfXQvglYWGflPV+LcP57VNrec2D4nxtRtp1bq28fyA3wY7DUw09BuzBnZSuyFeIDDVD5SYZUFxQICs3Gerd2GNDqJUU8AAJJgb5U6pyYFwLh+cgaKGtBgSYKwoYH3GmDSuhg5FTCVs4EwTDoEsI0Ww6kHBnx1HqA+QxxiLH4KsTxWxBgnDqn7E4r2ExBqaF2FDVQCEhijC8WojWsDZ7sITkwJSqdny5yYG0HggTwl9FEc7O+rsUpSM9jLPwoM3DuzSm4DGKisbMPUbA1gqAICkFemUcgxRnhDJGT3CmSkplDxRCPK6WJx4MxyWtAZ8zRnjLRIM4ZaQZmoKgHM-Za8RQbyoFvHBQjBZAycAMaytpLAmh8KqaYLlFCOEAvBHQxg9DpOyerDZbo9kjKYGMiZoKDkoIjMcrZQCQFgNpl8NZQLw7UChdsyFWzDmwpOSMzBTZ+aCJog7OYRhHmOGeW4ZCUNDReyQhqM0ao6VOEYT0tWy436YvBTsxSql1KaTNvePSBkjLVJVNMQC0xLBWLBp8gSLl0Y2PaWDTprs7KAq5cFCKCdooStHGNKyExUrpQtKMLKMsRhWXlpMXQY0kJaqZuteqjVmqtWtq1O2JLd41KcJfVUQ1UleSpZkxusBxCUEkBiQBhSuBGOqCYrgBq1QQzWG7BGJg1DEJckhVwN8rEmC6QJIw4bI3RtjYneN6ceCpxTdOdNKVM18RzVNO++a3BAX9pExCZaqAVvjonC8p4bx1CEKoAA0vWtNfFdTduzYYaCTsb4+BGOqYShU+1RrwDGwd5SeAqQEDbZNPq8E1IbbO5tC7paIDGNQm+TaD4rAMFugdhSKmHpth0U9wjz0zozfOm0i7srqhFiuiR6wvlUtfTuyt+7P0NAvNOplAGs1AZvQgFJeVwMwwMP2KYMHd2FP4cE5Dja51odbYsWJHbdCCQyijVWAALZAZRsisCwDAUBLG2Mca4ywVAYBqAolFKwMoQmsgxAE0JqonqXw8FPEpNoY7OpiuMtc0l5kbLgTWGuyw3gsM2RHNMCCHaEafNSvqSYzHWPsc4+kDAPG7P8fIIJ4TYoxMSYlEwUUdBYCQFk2RG2z4FNKZU-pQy6m2y4N-Q4SYIsdjmFPoZ1Qxm1SDRvqMVKEFn2+QwpgJzfGHOFfsxkVzMneEND0W+NoKklItBai0FNa6MCbFMNse+KwvkjipfekhOoAjbABRykrXHHO2aKxkXzEgAuVaYNV2r9XGvNYCK1r56oNhYe69lNG2H3ACVMO1wSmM90AEUlICFPBOnOLQYo-tufg5CxmFVmfFqlTwL6el7qMSY4VukIvivu3RJ72URpgfcOk4wOptAncKUYgQycAAaqdeA3ia0D8yIPqO2Ne0rGGpqRL5e+6nBHfALtVIx0DLHDghhtJIdaFJvgfKw8To0N8p2DXU-6OBClmWUmqj0OxFnTAABSF4jLZ30SnN8SHKciMgloccFhHJUvSek7Yxmedmf5-UoXX3Cl1b4EwFSUUhCZ2nTYiRMN6F+DcPS6jSWMBTCrnOWxnj9eJz0TwZTnP7cOAtEXdw-s0YHfZfaSgOz4CtlRdqhIbBCAGr2HmqWoH9SQW8JXKxciZheFdv7QnMfnWwNqm9IiO5ygpvUJoLQfgBg327eseGNoVWdpshBJii0OWh36TVdcYVCIFnL3uFkwZqxN17kebxD3TJnv-AJJ3hcbLISmLsIw0El9O-z4JWGMw0pOpgb36Sb18zbn9HTfco+OQvxClPpgPxRSijgFHjTvqVTIRFqasc6wnkYZUOOORG20w3gB8++Pixefex+ckxEgYB4ZY1+nKUmVMWABqXgKEGAn+hg3+VKv+8ivE-gAQ6gJo+goBPeUkoUkBZeZ+RYI+pYY+8B02-mzA3eTAMIyAcQKBqafYA4eow4U0Y0eUzKxg6Stc6oJBuSh+5BXoJ+8k5+NBh43eKayuAhwE2wAwViEEGGJUeaZoagbs6UxBXe4+wKZBHoFBg+VBZQihgwawKhoE6hkElCxgvEZquwHswchh8BxhN+aQYUleUMNeMMkEbgDeFCiScwciPkY00wEMBeqiaKb8+SRMRyHMvcBqhcrgqoUO5cEMzSKouoww7gAwAkORWSHhfS4hEcmiSRsKKRBsRsiwL+s+wMqweO0Mg4KwVolc8+s0jkCEew7hfk3eFRT0fiusyRn09+j+sAz+0WNydEYMFKowEsdkvg44XylqKoCM1cs0pq3gVmeWheB+lRox0cNR+swCnwBqCx+U6gzEqxbWGx9E-+s0qBDOwhYhXhcCUcvcHMaRvgGRJcZ85cuRFkqwmWaMURlgsRvSU+wxXxn8GA38S8f8iCaQaR1ixcWR2RIJxRg0AwYEEOoaaEZRsJnxiR88qJS8kxT+6CYAVxPk6BQE6S+ogkPgwGMsQwvOwRdk7SY0pRgxRh6K8Jb0SJyCmASBtJ9JVkXySERRrJkOlChUHaWwvgngUMTgHxQp5JX8lJYpfxYGmRpc2JuaZg1k-s6gnyEwTgAx+WCBRxIx8COQie-x0S9icS7sHyLi+J6wPk7Wlgmp3KWyvK2KpyuKZ0+KaJcu56fgARdewRJgjeXspgg03gIw+JugBoAZuMPKEKuyOKxw1J0xEZdJUZDgXWjJYwWGegiUa+SZiMzKXgqUD80JdpYBIKQZuZkyoZxwSBxZihOoFZ7EuUNZuaWezKqU2oEEywpaJJ6yQpOZOyXZ0y6AleVKsZQRxgCZoRMsyw1eqZdkEE-gJ8M5Apnh85HZOylevYrRG5IRxmdGLezgbENoXgWZ60Vx25ZZh8+5fJkEzgm6s5zoBqDhoOsw4OIwyuqUq6hghGaIyYRsrmJ6jRsW3OTsyE0OQkEMJCHyGWBaBgwEtoMwsFtAaAhArmKalgGo6F2omFJUow0EDJ4G5KdkSeLZOAEa-asG3wooOAQmqg2IFFaFJUNFjkWF9FU0a54GrJNkB87uApHF26MaeM5A2QeAncSFsxmmdylFNiwlBgoldFqW2UistGTOvRAkxJ8l5aXFYyqlnc36yFD2NSOl1F+l0R2FIGNktG-REsfy7KVlnFSltlalYAsujlDsLleltFHliwKSBRdu2wxgIelltp7F1lQVKlIVlQOQg8glVFUVBlMVDgCu4GyEEwkGohhhClFalepoqGLa7JiAowplf+1obgUMNmvGpW42XVLmbmiJHm4mlAkmFw0m0+MWTlDgEM1cd8WhswmwJgRl1GAwCW8EXy6hvgBhfko2xWE2pWY1A1omQ1I1VAPmfmkAKacwBpA2Jc+mugaW+oNchg6ZL5J5tpO13Ge1fVQmKaTk1kFoPg81VKQExm-g1efOjOeed8nVzmu1vVDwDBF1pZ-Qqu+UngmaVmNo5gPWJgABD80MTEKV+IH1v1Xy-1c1WwwNS1iAlguFa6CMbWUiqsqAL0jm5A4mieEiawOgPNjkow1uxmAk4N7gQw6glZBGHKLNMAGAAAjqwHgKKNiEQMgFgAnsjesK7NzWDGDHzZtdTf0AHtrjZHFX4Mon5FLbdKgJPmopzZraYNrSkoTQLaDtWa9pDFMMsczazWgHgEwGAHIEmJ8OkLbQljzTrU7UZqDpMNfO4JBl8jqHMF7dLT7UwFAPLcUCHVrbzRHfrWqHsNroleVZ4EnWiHkMgDLZnfbdnfzZHdRuBOBUsWYBaFSm9fiBbRgAAFawCnWwCihMYGzIAzEz4oUa2h0O263O110lUQ6jDoUzBm22nt3sbAjZBsDDUNGaWv6jhc1V3h01251fJ00BBmjjSt3HAW2c3+xZ17161pbLpB45GzBOAHErnI1MQjgAC0IsfgfgNo7eGtKggwUFdowQQAA */
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
  },
});
