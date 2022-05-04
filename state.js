import { createMachine } from 'xstate';

export const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QEMAOqB0ALZBbARgK4BOMx2eRpYxA+gPapgB2GE9AxobiwC7K8AlvWYMmzAMQAVAPIBxOQBkAorQAiMgMIBVALLKAclICCUgJIyDiUKnqxBQkdZAAPRAEYATJ4DsGXwDMAGwAnAAMACzuAe4RABwhADQgAJ4eYWEArP4RYe4hnkEBmRmZPgC+5clomDgEJGQU9dR0jCxsnNx8AsKiHAA2dpDS8kqqGjr6RqYWVkggtvaOzM5uCF6+-j7B4VEx8UmpiCFlGAU+mZlxAQE+YTeV1ehNVI11rzRiLCMKKrQAEsZdAAhbQAJTkyjBzkWDl6qw8QSRGDCPnccTCcSiPiCUWSaQQV3cGHc90yQXJuMyERCFSqIBqLwaNCZLVoAyGEB+YwBQNBEKhMLscKc8zW7iRQRRaIxWPcOLxRwQQU8cQwUSC7glEUy7jKSMeDOexDAUEEsF4xB6IgwgygMAgDEIvAkinkZjmNmFywR6xC-owGIpATCnniwXJ+I8t2yhX9ofJWp8cUyhsZJrNFqty1t9HtkFoglYuGQzGQMFo-HwueQECLUGM6FgNbrzCgEihYJk0PmsJ9YujGRJpPlngK3muASjCE8mVpGHJcViEqCYSCFzTxtN5st1tYdodheLpfLYEryGrg1r9cbqGbV9b7YAytpNJplE+n0KlvCB+sQ2Ew55D4Y7eKqNzTrOER+Dsnj7LcnixHSTyYBmO7Zr0ub5o6RYYCWZYVlWLY3k2xFth2ugAApSAAmt+IorH+0RDlqwGgROEFKoU0EYDiIHysUJy+BEm6oduWZ7lhh64fhp7ntWEBgP0YBCG2t5kVAahKSpYASC+b4fl+vber+oDimUarrkECTRCBxSZJ4kFhiE6pziEMQBEulzQaJGBoRJOYHgWMknoRF5sNpqkNs8D71lpym8LpnbdvR-ZmR4FkYFZNkIfZjlcWOLkUgkWT3CB3m+f5u6BXm0nHgRZ5EYpCUkZguD0BAyD9BIajKCoUjKKlpmuB40EufZ1LhHqPhovlBJwXBGA3Hc4aXCEoQBJV4nVZhQU4fVclNZFrV4R1XUSJoxgGO+ihDaK6XrKqaqkrinkYhENzFE5cSeAuIS5GO8ShOiW2ZjtNp7UeeGhY1F4SAAYsoUiaP8tDGJRlG0IoZhPlId2MQ9tLZJ5ESqpiFyYnEPiQZkMS8cxPi0kUKruKD6GSZDIUNfJPV9Ujqjo5R+O+kTS1YmTVMlHEVOQcEgF6uEGSeZE7lswFu21cFB1hfgEhyDItDaJRaimKougyL1wt-j4NJZVcupLgE3gBCEcSQdEERLfEc6oqi8o6mr4P7pr+1+dtnxEYIEDKXp2jAroZh48ZP73SNCARrxq6094OJYlkETTvKeTqohNv+mGVxBIHGEQyHUNVRH4WwIQ+C4A4UWxwZn5Ww90HEri6IRKEWRIjimSF3Eq5ZUieSXJ4mIRD59LpttNfB9h9fh3QRHN637f1h2YJdj2XopwTafWX4JRXFiCTXKu1NKvKVMotLpQYgUtMicvW5g2vUlazDmDRu1Zm4cA4HAWAtB2qdW6poN0T4zYW2MLdZODFfRQSWgEUm-1wK5CRHNDw1x5Y22ltLVc-pJ7Vw5nXXCDdt7hRoMQegdAYHnXgTIRBtBzYm1QafdBf5cS-R1NsMcyZgjFHcIXCkntSbFBAqqLwi8q4-zEn-GhG86Fbx5m6fW2gk78LSmneepxZwFFpP9aWsRC4hHyLxBIr0ohUzHColCQD2Y1U0awQgqBOqJWgR1MAGAo4xxfPHROPc04uxgn3OClIThhEOPNQogFoJYgpJEPI0RqGeLqhgHxfizwwKCQUno5F9Lvm7mgoxaxZyWUZl-QojMvBBEgnsXinlK4UmyjkjWXj8m+IEEUwJAy-EH2SifBYJlU5rEXp7f061LjUjgqiE4bTogdJTNSfItJrjISNGojxfS8mlP8cUjAYCIGwCgWwuBCCkG8MieKVEw5SS6guIzTEWpZbBBJKTC4w87gj16bXfppzhmKQwEwlhATYEXXudw5BfCpln19CqQCoinZD3XHqTi80XYBCyhcF2uKqbrhBevOqrp5AyH0U8xA88cT+GcbiLEjNVytK4muFypM3KUz1NSClAD9oSF0FdYwkJaCyF+KoEwwJ6UIHcsSPIjsyhSznIXIe-cZolDyJ9GanghWc0kGCZQcgcYDTBFK0Yfw5UKupGqP2DlQxhlEVIp+WqiUApJg5bBqZVFh1gLYZg9gABuul9ZY3RrITGyK+zDXFCGPwKZQw4lZdiwh6wfp-VCK7RC0FELWS2kGkQYaI0G0UNGmQQtqkJsHMmkovgkTxAzdOT6JJ-r3CXFiWxmp9krxLSGwQ4a9YGyfJoU1hgIgAGkFUM0DI2tNLaCGFydktCxrsP5LkXv6txJpB1ltHYi4EZg-hxumefRNLyU1NvTSupUnlCUEpVq7C4CRd0HMDcGw9kbzYnr+LoOdSaF2pubeklU04PqErnIypxGJVTrWLd+4d5bj2ntUEZQxdb-zXsXWB1tXE10NNdg5RCk9VRIdLSho9cr+pAdw6Bu9EGuLZv9I2ooP0wwUcNMwQJ8B5iMneMycgQm2RtFYOwLgPBmD8GWF8c+8aZnpDuCSfiVwPqol8NORZJJxajh+gkD6vlRNvEoMJ+THQpPdDkxyWAkA53QT8BcWmaIMlrinEqdafhrJOOKJPXIIMA0mZZMF1o4g52RClKOPUWIk1aaVNLeZiYnZLlmoKoLZmWisjIOyQYdmIBzudVlZiAFghjmwdOG+S1VzolVJNTyrMMvNDIBF7wqnELqbi4-AkUsSRO28FERJi8EhGrrvQZ0Cr54hmnlEEjOz3Ljyfssr2Fl3OlG-nu1eGi8myR1hpW8zYwC4FQLwAkWGlPrF5eqDNsQ4IxFdpBDJgYwyRBAl2woo3+m7dhpeeg141KkUuZAhzYYSQmOISqECBcuKXFSXUk4QYNifZ2zDeS+3SLQuICDz2XgsgQ98GGR7Q4VTxBWnqGkrjP1VX-sa6G3MiKxQB3eDSc78jZABQkZWKZbI01OETG+tiEL9t-kc0FKP6fhUZ9FO8rO0S8UXO5WUupbhtJtuu5MWRbHbFRMjwB320fNRUidKX8UdIOfJAuoeg21yxFJk5U4k086xFdmSXXod9dHRakzi5hBwGQNN4lOddxfqXxDHqLw7LM3eAcguCUM0iZBjd1DD34VDdRXUpjgPYAg+hiylTMPupfDrSjyGX6aIlmhiXNERrm31G5L16jz3Rvve3Icx9fw5JEKJOss5brDLbhRdphkSe01EkfpXnX45DeJcKWOkzhzdjZws27z9GkfeZzyilPEaWnlNQvQpEnrmh1wohOz7Wi7pJ4i6abdse2hn3ZDw7YvOCxf0Q64DdT7b0-j-4AVScYkJMEsFM0s6+88pIWws4-E4GqsH+W29eoc9CaOp+CqTshKViwQ00WISy0OBIEo02r2IEhBJUXgh+rAiBO8LcbcvAUU9qa4ZwQM-0WqP0Xghc8eC4wQKok8RQzmG2VOcBU+CB2iFBfu1ysKXUKB1IM2WIUQKSGIHmuB5wgYnk2wBQHk9wpB7iFoICUKxAzCrCZ0-QCq2wnsGIoYq4L2ZQNsE8tizKCoKykBvBE+oulKgC5BF4k202NwOCpM1w+CzGuBlwfgqIuISIFkjMJwGh4KsKQSyB5+l6DK2w-g88rsbmvaOBDKsQUWjBL+LMGIwuhy6sYugCUR5ypy9YKBFwKIgk0QiycYJeY4WUb0c4nS1wNefBk+RRocJRIyQOohrecRvosQhKIEVechr2YENMQ4i87kIYk8OIeokRgyZyIymOYhhhAxf4y2aIuCWok044kxqSNIU2i8LseQixhS0RrOLkIxWoYxBa3gkEqIhKYElCz+gQpBCq1wryWQ8oZQ4QVeq6TKdwD8Wq2CoQlOThhRCmF6voc43x7yfxXyeoq6ueY4-m6ImowR+RX6VG4aEUsAAA1rwIwIoGgMSagOeqikxEPH4P9NENZBKKSANhPNkMGDNKcRZHqIarAQeihviUSSSWSYwIBhsQ9JkbSXsAyZicyQ+r8rOKiPxCYvcNyZtryXiYpISeSU+BwCaCwBEASQ5uuPQfSUuNKYTk-MUK5I5jqMPjbMUJRkOnie1PgIIMpJSQImKTScacEKaUyeaQSLvtdrSOXlBJfg6WWqdC6cpCKedvEZdkaXST6YyS6ukQgB9FKKyg0uVD2iEOGXyc6a6WAJhiih6WnOKd6VKX6amXEgur4NsDEGuCAePluGqUEgWcpFIBeAlIaRKSacmTKfNJPCiO8mNPPO5huDychuGnOuBCBresuv4YgDxKTEiLZP7O5rmaohIfCb8Z8lXotgSAALSzgLiLxEED6MFxCVCVBAA */
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
