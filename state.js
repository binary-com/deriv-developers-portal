import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0AnMUCWsALlsoXgPYB2GANuVDBAPrkCuhAxADIDyA4gEkAcolCpysPGSqiQAD0QBmAAwAWRRgCMmgJwA2TQFZliw4YDsh1QBoQATyUAODYcU615zatV7ljgEwAvoG2aJg4+EQk0tR0DJBMeNQRBIRgWEyEyABGGABm5DQQCQVYALYcACr8fFwAokwAYjwASgCysuKSMbIKCJp6rhjmigOujt7ujnq2Dv2uhhiKjsp6-sqGmsomikEhIGHYuKnRFLH0jInJx0TpmTkYrJQFRSXk5RiwrNllUmSUUCYKSipDOtHIyAgSUBwOIoKoHAgVDAGCSADdyABrFGHWGnKjg+LMJJHSJpDJZXJPF7FZilMqfb6-Qj-GE3OExcGQ6FA9n4ygIdHkADG8MoAG1lABdToSKRnXqIfxGfxaPQ6TSeZTmVRefyGWaITWKVQYHTmHRmRwW8zmVaqYKhdCkk5iwmXEmwu6Ux7PQq0pj0xk-P48vFuujcgG8sn8jjpLDvDCoGikIO4vkRi4JT3s70Pan+t4fL4hllhzOcyNQ6PhmKCygY0UxSUypAgLrymTtvrKwyqgYarU6vUG+xGgI6LTbdUqdybDaOg7OutguIe65k-NUv2vOnvBml5msmOumIcADCvAAyg0WnVBNfKnUWkwACICACCvD4su6Cp7I0NQ0NQjB0fx9QCdVDX6PRzFVRRFEsHRVAXZxVD2J1wkrNds2JTdUm3X0aWLCpqj4WoGmado-y7ShFQQfwLVVcw9BWRwzDWRwdF2GDNH8AIMG8DZ+11bi-HMJcM1jLMiSuF1bgpAtdwDekOGvABVAAhNoBEqJh70fSoWk-SoBB4ER207HpAMYuC9GGTREIMAxtF8Mc5i8TRHGGfx1BWHjtG8qSVxwgl1xzAjFPubJuH4HgNMqWibNAPoVCYjBtUcUc4LtRQ+IscxMr81wVBWVQOMMELsJkqs8Pkr0lNitpPyET8+AacjKKYSpPy05KANSo1vKKiY1kMAx1EMbi+NtRZlmUXQrTUHRqoUjlcLkkkymQShkBgGKuRrKBP3QWAjuhRFkVRRssRxULas2jcMB2vaDp9atoVO1Bzs+gEGybMVWwG7shoQW1Rp8JiLVccwAoKjYlig9ZcqQvy1tXcL6u23b9rAQ6-pOs6LoBeMsETLBk1TQh0wes8nsil7cfeh5Ce+36IWOgGRSB6UQfo2y4eUDAONUDZTDh-UeL49QHN1fjlX8cCIL0DGwvOLbqFevGCc5r7ibAMpUEIOwOEMgQnxfHqanqHq+v5hjtGykXZfcQZJ1UcwCt2DBlW8zj+wsPRVf2aT6axzWmbe-GPr1gF2Y4PgeGtpg6jaAAFSoAE0mCfUy6gd2yJtNZwJgsCwkNWTQCvVYrvBNa1dAwtXHoj57tZZ3JihoMBWW+kmoDfMAe7SK7KBRIVsQwMOQTqyOO5jh5u97-XMEJoeR7AbnmzOYGrLlFL5EQHUp0tYvUNWAw1D47zhe4-w1j85QdCglvw419vmcXrvh5X+PnXXr-UeCYkwpjTAeaedNZ4M3wlHHWPpl59wAXHQeQCt5Ch3lQPeYgD6DSPuDVQp9OLeGMMHLYNhxz9D8lOaYbhlQjBNEhEOWF1r8ndIzBeMUzYPgts+V8XVba9X6vvf8oN8FO00C7RQ6pVjTSVp7AqFoMCiXUBVTwKFMLLhqu-dhsDOGUg4I0OolQLwAAkmCfnTunJgXBeGFzBtI00qjrRWAwn5fKlCjATWUX5CqhDlBMWfpJUOUCNptw4V-Lhb46j1GfBYqx9j8GOKEg3Sw3gILqBvtMZR7g0aLTMHDB0ITtHQPCXoyJBik5MA0unN8+cmBtB4NExJfQJFSJke7eRXtKF6E9loBahgz66CQm-UpH9GasFQBAUg+MyjkGKI8KZMz+6Ew0ks0eSJx43QxFPGeYTxmwMmdMtITA5kLKOcs5BUYoBrOOeg26mCJR8xEXRR2nhFgoX7NlZwTlBh8UWpIyqjhuIYV2HDKqxTWGyWehck5ZyUSwrACslBtyZlkwplTcBHw9lsIioc9Zsz5kIoJci65qK0jb15m2HBoiBZg01EYM0qEBLeVGNIjyRo-B3yYgJYFfgMIQpYZjA58lEWnKJepbSul9LmyfCZMyFkWlKgVmaVihCxbSIgtLHpgyMB6AGUMniwShXq10VcOKSdEpKoQOlIqWUcq2hMHxNYppnIammgEVi0jRn7LNUkDgLU2odWthRQR9sXmH1aZqG+urn4mHgvkiwEw1awHEJQSQaIwCJ2TlwSx1RrFcGtUYE0ItRg6HNH7HUGEYIQWVGqdQSs4KEI4ooFNaaM1ZqqbmzOPB05FtcCXMtFbtBVv8DWjCPksoWF1GYdYq1IU4FTVQDt2bc4XnvHUIQqgADS-aS0-PLfBEd6Sa0qi0OBF+JgUarDbcuvAmbV2NK0gIW2haI14NaQO0tuhh2ahPZQ6hdrCHgVMM-D1t7033s7cnJ9L6GgdHfWIz9+6h1Hr-dWgDE0HIBOPYMKw-hdgQZXVU2Dttrx7sHT+tDo6a1K2Fk5aaaSfCoU0ERqDq6hGxIo9+w9lb-1zAI7qrYngH6DIgtMQVWiMAAAtkBlGyKwLAMBKbkFQGASgVQbYNFMZ+NoWkNItA6i0ft7ghLcX7HBUuvLnWnwwnaPyXgdTPzWrJ+TinlMYGFHQWAkBNOhu07p-ThmXwmeFhVS0D84bLGswBzUvtZ3bC2H5Dii4lyUCJfAdsOLoUJDYIQa1oxvBLHULaCCjHGOKI0EtLwKx+LmnnSa1uIrcxbiavkIs+5yhFqmr7bK6wLAbDURy-oFVFhsUtHDJyXLPA+txdjKK5JDqFj3IGCBR5Qy1lNYTU8Yyi3gXmj4FQ2wvll1ms7bUvSAkGDMGYWbOXYGNSWypUiwZjwVia1CmITAvjCmFHATLNLXm2T8usJY6weXjX1N0zy8EfK9MPSMJy2gIJ3bns9R7PpluqTW0yDbbIPvCqYCArA1qQfC12AE+CkOLCzXNHqvsBH+VJuNVJ4VfqFtESxy99b5ZNsfa8xIBIhOoTIDiKTs9g4GXal1AK51wdMp+DnfXMFRTGs6LxQ1PMbWuedcPLj3n+P35FuBVOUCYnIIPx0AVc70jpjbBNxVVtC6tvzfWpz57uvjeDEyjO5WcjoKeMQhoSwKhRhBxGA11nLvI4Y5yN17QvX+IbDtFYFxfE51CXVFsI7SsULMKjx9jXONo662uezAe1ri6lrLpYEYdoDAyzrZ7TwLb1DgScqjmB8l9GsxQeXw2xs5iA8jcfF+SxAqmBA1YJyNdVTqmMOW5w-ZKed7Kd3ipvey-Ex+392AAOOy4KQ4gS0Dk2JVu4mxASloZblsyq4BjqfEJqFX81rWG-chswNuTd41qT96utN4BfgEOZjLCoJlNlHDAYDxJaMFM7oXq7j3h-n3mdJXmLNXqhLXpXA3oHtIsosnpPgJNsCztlmjhEiXggkAqvAPBvL3GAJXr0ugeXHXlXDfN7paLQvDuJtxC-uznAp3BgIglQTvv9jQWkL-tqMoj4NlGLA-OFo4DfDqMovqgRiMKCt5JHiQV3sXvAkvJQf-JgMTqIXQYhnSvgu4EVFYGxF4FdnIenuoMoiaNNMHPoOqAEDwUXm-uQboSPKvKgXfMsBgRXPXtXJ4s-KqC-LDp4EhO4C-O4Qge-gVmgc4kxhkh4nMBNo5L0u5BNPqAEnEZHGKvCosncqSsdOSsYcPh+kaMYMLCyv1inkNjBOWg5O3sCisL0l4L0vkTCgSuKuciSs6MIXvuUcbnTukuXJqGsPoGkZyojBZmLBhBotIvnpoWviSIUUSsUZcgYd-lgCMSYY7NxEVOMZYJMY2jMf0NLkJOaC2lqEYDenAerq7hsf0SUegN1qxInvUYNmnpQiBmaMYOMHaOaHBE7mrmMrwS8RUQfrSo7Myl8cnj8ZYDBNOnqsHHceaAUhoaEnNprL-hceFnqpaGLO4HOlYNiSUvstagHnMKMMLBNKxOaBaAEkrJohmEupBpmrQGgIQKpm+pUUfrBChGaARgMCaE3HDNDkqMqIOp7BVLoCYOYWxlyamMbKpkWuqKaCBmKbqChJKeOnWjqNxOBHBFXJJuye2lBp8MKDgOpqoJiBqcKdqfqrqZ7NaKeqhCLPqoMoHHOBSUcByR2i9OQNkHgD3PyTCUDvSpqSKaMC6RKe6QBv4r5OLBMBhH4B3s7oGVaXMqGT3AhgKaYa0jGc6eKXqYmQJmYFOFnsCraPoD4M-lmZaVybmWGWAORgcbZIOFqaKfGeWVKYxAJBoO0UrG4AYBxMQaFNmVyZSCPI6T2XGWWW6QOYJixLaM4OaEHgRsqdCdZFUfMFsDxr+jRgBqsHfOBCtPKcoeac6K5gpkpukBgKpupsbqsEJItDOEns3mOp4iMEJGJA-GBHbqxpCnee5o+QLj5hAN1sYHfi-I2iOsAbNMLChN5Koq4sxmCVJmBQ+STp2fShhNhoMpOK5JLPIX8S0VEahL0huVxNVNaqhDWhoOWovpsKxKsCbsEMEEAA */
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
