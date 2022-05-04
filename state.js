import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYATJ4DsGXwDMAGwAnAAMACzuAe4RABwhADQgAJ4eYWEArP4RYe4hnkEBmRmZPgC+5clomDgEJGQU9dR0jCxsnNx8AsKiHAA2dpDS8kqqGjr6RqYWVkggtvaOzM5uCF6+-j7B4VEx8UmpiCFlGAU+mZlxAQE+YTeV1ehNVI11rzRiLCMKKrQAEsZdAAhbQAJTkyjBzkWDl6qw8QSRGDCPnccTCcSiPiCUWSaQQV3cGHc90yQXJuMyERCFSqIBqLwaNCZLVoAyGEB+YwBQNBEKhMLscKc8zW7iRQRRaIxWPcOLxRwQQU8cQwUSC7glEUy7jKSMeDOexDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNmFywR6xC-owGIpATCnniwXJ+I8t2yhX9ofJWp8cUyhsZJrNFqty1t9HtkFoglYuGQzGQMFo-HwueQECLUGM6FgNbrzCgEihYJk0PmsJ9YujGRJpPlngK3muASjCE8mVpGHJcViEqCYSCFzTxtN5st1tYdodheLpfLYEryGrg1r9cbqGbV9b7YAytpNJplE+n0KlvCB+sQ2Ew55D4Y7eKqNzTrOER+Dsnj7LcnixHSTyYBmO7Zr0ub5o6RYYCWZYVlWLY3k2xFth2ugAApSAAmt+IorH+0RDlqwGgROEFKoU0EYDiIHysUJy+BEm6oduWZ7lhh64fhp7ntWEBgP0YBCG2t5kVAahKSpYASC+b4fl+vber+oDimUarrkECTRCBxSZJ4kFhiE6pziEMQBEulzQaJGBoRJOYHgWMknoRF5sNpqkNs8D71lpym8LpnbdvR-ZmR4FkYFZNkIfZjlcWOLkUgkWT3CB3m+f5u6BXm0nHgRZ5EYpCUkZguD0BAyD9BIajKCoUjKKlpmuB40EufZ1LhHqPhovlBJwXBGA3Hc4aXCEoQBJV4nVZhQU4fVclNZFrV4R1XUSJoxgGO+ihDaK6XrKqaqkrinkYhENzFE5cSeAuIS5GO8ShOiW2ZjtNp7UeeGhY1F4SAAYsoUiaP8tDGJRlG0IoZhPlId2MQ9tLZJ5ESqpiFyYnEPiQZkMS8cxPi0kUKruKD6GSZDIUNfJPV9Ujqjo5R+O+kTS1YmTVMlHEVOQcEgF6uEGSeZE7lswFu21cFB1hfgEhyDItDaJRaimKougyL1wt-smxNwaEOq5Ak-qQdEERLfElzXLkeofWr4P7pr+1+dtnxEYIEDKXp2jAroZh48ZP73SNCARrxq6094OJYlkETTvKeTqohPg0gUOpxEEfsYRDgdQ1VofhbAhD4LgDhRVHBmflbD3QcSuLohEoRZEiOKZHn5eAZKeSXJ4mIRD59LpttVcB9htch3QRGN83rf1h2YJdj2XqJwTyfWX4JRXFiCTXKu1NKvKVMotLpQYgUtMiQvW5g8vUla8HYP12rI3DgHA4CwFoO1Tq3VNBuifGbC2xhboJwYr6KCS0Aik3+uBXISI5oeGuPLYu0tparn9OXSuHMa64TrhvcKNBiD0DoJA86MCZBwNoObE2SCj4oL-LiX6OpthjmTMEYo7g84UjdqTYoIFVReDnhXT+Ylv6UNXtQ9ePM3T620PHHhaVk4z1OLOAotJ-rS1iHnEI+ReIJFelEKmY5FEoX-uzGqajWCEFQJ1RKECOpgAwOHSOL4Y5xy7snAI84MGzWKEiE4YRDjzUKIBaCWIKSRDyNEChbi6oYE8d4s8kD-F5J6ORfS75O7IP0WsWcllGbv0KIzLwQRIJ7F4p5K4SJyRZyyRrdxuSvECAKX4-p3jd7JUPgsEySc1hzzdv6dalxqRwVRCcFp0Q2kpmpPkWk1xkJGmUa43pOTik+MKRgYBoDYDgOYdA2B8CuFhPFKiYcpJdQXEZpiLUstggklJhcQedwh49Orn0k5QzFIYHoYw3xUCLp3I4Qg7hkzj6+hVIBIRAQwzDz1JxeaESAhZQuBEnFVN1zApXnVV08gZA6MeYgGeOJ-AONxFiRmq5mlcTXC5UmblKZ6mpOS3++0JC6CusYSEtBZC-FUCYYEdKEDuWJHkJcMipZzjzgPXuM0Sh5E+jNTwgrOaSDBMoOQOMBpgklaMP4sr5XUjVKiPUM9vDQUxeI++mrCX-JJg5DBqYlHB1gLYZg9gABuul9ZY3RrITGSK+zDXFCGPwKZQw4hZQPFUY9fpzlCCEH6SFELWS2kGkQYaI0G0UNGmQQtKkJsHMmkovgkTxAzXglONwST-XuEuLEVjNR7MXiWkNghw16wNk+TQJrDARAANLyoZoGRtaaW24Lzpipapi82vyXHPf1ziTRDrLWOhFwIzB-DjVMk+ibnkpqbem1dSpPIEvxSrPNFwEh7v2YG4NR7I3m1PX8XQ86k2LtTc21JmalQfQJXOBl9iMSqnWsWn9I7y0nrPaoIyei63-hvUu8DrbZa-TqXmhyiFy6qmQ6W1Dx7ZX9WA3hsD97IPzR+mcOJhRPIuso4aZgfj4DzEZO8Zk5BhNsjaKwdgXAeDMH4MsL4J943TPSHcEk-ErgfVRL4acCySTi1HD9BIvsA1ibeJQETCmOjSe6PJjksBIDzugn4C4tM0RpLXFOJU60-DWXscUcu3s4i+VMyyELrRxDzsiFKUceosRJu00qaWczEwfTRHZSIwXzMtFZGQdkgx7MQHnQ5CezEALBDHBg6cl8lqrnRKqSanlWYmay2QSL3g1OIQ0-Fu+BIpYkkxTUhDiFcgf33UvVRh56DOnlTPEMWU+6ke2e5Ue98lnuwsh50oo2v1VR-ka6G3MiKxTUqRMAuBUC8AJNh5T6weXqlbbEOCMQ82QTSYGMMkQQLdsKIaqh2tYaXnoNeE7d5zmEBAWAxzYYSSGIISqECucuKXGSTUk4QYNi-b6bJHWGlbzNihcQKHbsvBZDh74MMr2hwqniCtH2SGA27Ym3-bHAPcekWO1Aed+Rsj-ISMrFMtkaanCJpfKxCEB1f0OSCnJLP5Js7vFztEvFFzuVlLqW4LTi4bpmjSEu3hNoM-G9k5nMM5fNRUidDn8UdKOfJIugeUQMiajnm27wpxJrZ1iHmskmOZem6Oi1EHYOIdXOt4leddxfpnxDHqLwbLXezmzRKGaRMgy+5N4d8K5uorqQJ2HsAEfQxZSpjH3Uvh1qu5DMR-ljalzRCa2NlRxug6y4DxboPNzHMfX8OSRC8TrLOR6-S240XaYZHLtNeJn7F5N6ORnw6Wfjog8c9Y2cLN+8-RpEPmc8opTxBL3U8fFJ08t-9+FQJBfa03dJPEPTTbthXCuP9F2A9O0u4iSzDEEuDnq2l-PnW8qJwxIJMEsFM0s2+M8pIWwhQmoEoWoFITiO2Ruc+QcNCcuF+8qmKBK5iwQ00WIiyiOBIEoc2n2IEZBJUXgJ+a8ACtCQCTcLcvAUUdqa4ZwQM-0mq+aba8ojMC4wQKo5cRQLm22M+UuFKf8aBm84Oly1yZ0-QmB1I82LaUQSSGInmRB5wgYnk2wBQHk9wVB6iNBcuBOMKXU8q2wbsGIoYq4H2ZQxcY8ViTKCoyys4xc+hrAEhF4M2c2NwmCpMXsa4LGGUpwqIuIlM5eES0+kuv+YhQcYKMK-iGBV+V6iAuQPmGQVimcIYP0ah9KcegYCisQRIrhhus+f+sRAypywyJy9YmBFwKIgk0QCycYleY4WUb0c47S1wDeSBpRMRUMcRZyFyYCJhchSRvosQBKIEdeqhn2YENMQ4c87kWRVkeobhIygy8RkKxADCTCshdqpM9MWCWok0448xySNIs2c8ESeQaxAxfiXOLkUxWoMx0EcxnKChJe6IWmS4oQBqJRohQqR48q1wLyWQ8oZQ4Qdea6jKdwmoPxm+-K5KdqLkWory4JHydeK2RBVe-gpGcopIhaQWhuh6qGEUsAAA1rwIwIoGgFSagBeiikxAPH4P9NENZHAaGBTvfCmFlK5toVkMmE6lRsOuGmSZSdSbSYwEBmMUyeuKwWyT8QSVyQSDcFKLOKiPxIYvcH8WNiSaKYpBSXSU+BwCaCwBEOSY5nKaycEIqZyYQdGNkA7DrjqlTB9JEWJHqf4u1PgIIMpAybwg9LEFaXsOyZqHadOJ5HvlvmiA5FshlsSShqKd6b6WANKddskbdsGQqRyS6tOB9FKCynUuVL2iEMKWWqdD6cpFhsigGcnEGSySGbabmVxMUIur4NsDEGuOAe6d+tRkmfQJWWAFIBeAlJaQ2dmWGc2axlKGCcXIzDPB5huAmX2ZfumeMeBKBneiuoEQgDxKTM2rEqnrTKJPIaCW8hCZ8nqNOAALSzgLgKKGbAwjh0iVBAA */
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
