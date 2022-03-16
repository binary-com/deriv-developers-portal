import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0AnMUCWsALlsoXgPYB2GANuVDBAPrkCuhAxADIDyA4gEkAcolCpysPGSqiQAD0QAmRQFYA7BjUAWLQEZFagAwA2AJy7DulQBoQAT0QBaRaYAcGY7tdqLpgMxaJp4AvsG2aJg4+EQk0tR0DJBMeNRRBIRgWEyEyABGGABm5DQQSUVYALYcACr8fFwAokwAYjwASgCysuKScbIKCLqmnhh+fq6Whq46aq7GWrYOCMYGGMP62uOBKorGoeHo2LjpsRTx9IzJqcdEmdl5GKyURSVl5JUYsKy5FVJklFAmGkYqQzrRyMgIClAcDiKCqBwIFQwBgUgA3cgAaxRESO0ThcXBiWYKTx6TuOXyTxepWY5Qqn2+v0I-xhNwJYLokOhQPZpyoCHR5AAxvDKABtQwAXW6EikZ36iH0xmMmkMKnmfl0Wlc-jmiyVflMWgwrjmigCKlc6jm+xAuNh-POxKuZNuWUpj2exVpTHpjJ+fx5jrF4O5AN5+KdHEyWHeGFQNFI-odfNDCUupNhFIe1J9bw+X0DLODacJXKhEZDcUFlAxorikplSBAPXlMhbA2VqqMGq0Wp1euMBsGWjMGAM+h0fhU2t0ujtqaj6YuSSz7JzVO9rzp7wZReZrMjJzFHAAwrwAMpNNoNQSX6oNNpMAAiAgAgrw+LLegrO0rLF0DAVDGbxZzMHUVRHXQxkMYDLFUKw1B2UxZkXQ5q05VcSWufFNy9GkCyqWo+HqJpWk6H920oRVBnWUZxkmaYtFmeYRw1Pw1k8PwDF1ftdi0dDIjLLCXXXPCPVzbdfXpDhLwAVQAIQ6ARqiYW972qNp32qAQeBEFs2z6f9BhVUw1i1dYVCmLU-GHewALUcy1AHQw1BWMcAkEsJ7QwkSqCJTNcPJSTcm4fgeHk6oqOM0ABmUPQPFQo1TGUC0VBsBzBkMMZNC1RRdRcnV9CEt0OQCjM12C917jCjp3yEd8+CaEiyKYap30UmK-zixBPHcEwdnVftB3c6CtQ0RDdiMft5ysUrMIq7DXQqZBKGQGBarDSsoHfdBYG26FEWRVE6yxHE-OXctltJVb1s2z0K2hPbUAOp6AVresxSbbqO16hBlBUTRvGQlxUqsAI-BHYY4ICbjTGsljdCchb-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-e-yMzfaw7HAwWAqfFUiOo1S5VUsGRQE4YuCQshTUnuVqZ9gX-b+y8DmIIyF5uCecxhPqGH2UuWUVQmm0AVOyBbSweYK-W6G-eeO-eBXPAbJ-MAYdaPJKDUMwMYDKAqQhJYcvICJJKnHKNJHfUAjPHJCAgeeBA7LAWA+A0+RAsyFAnYbwEcFyWVG3FtFyVQR7DlPbLTI3bvOBCOdADfLfHYMcKPNwGlVlQ-RAK0cyW+NyJbfsEuAgrvBhDfZQcySJLVWxWJGPH2WbdyKHNyWWZCdtDgwHdPbFUFcFbZDZXFHaWFZ-AfEyY0EhAXKnIXDXJYWWe2SvVCKna0GcCwPYRfLg9ZY5TFCFaww4aA-POwuAhwm5WWVUfwCLayCNOYCQhAWWdwBbHiDpEwVJDURQ3lMIqwnFQ4MgmIrzBIiyZIqlOHdI1Je2BbAAqXO9FNEwtLeXIoyw8wqFVAXnZQFXMCVwyCeHZQMtcwAqbwdKcuAqQojFSws9J3fOIY9XeHTfCuG0YWSrbYJNAgjfeWTiMNV1SNMQtYv5OCTYr5WcKwQzQI9ozrDfWcDQI4iNUQ+QhpVJc1LwHwB5ZHBfdo99GjWgNAQgcgVAf9IPEnbKC0T2IqHwObdpDjdVfhTwF9H2dUWRAE6jbNYE-WMEl-GEitAIeE4AhGfDHKe2FExdMWWHVJATTdHE2AYUHAMASgLQTEAk5xVJYkm41w21JUKxVUFEx9VQGlC0O4mXTtbElEEZXIPADuCEwvK5WiCwQk7kpGBEskmdOuIUjUbUStGcTwaXVMQEnE2U+UsAdDSE4vACNUuE3kxEmdHAjwPUuySwGRXUekntTGcgOUjuRjOIzBVUrk+0zU-kuiGlF0-qAA4YWYeuSjU0lESkAeTk2EnksM6CYYdwKk8jSGEwL0mjM9GEi9Cda9WnevTiBdRNDKYYXYeDVNR4xKF4p+N46NVVHQE0fqYhfmavOk5TIAA */
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
