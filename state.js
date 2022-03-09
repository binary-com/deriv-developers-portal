import { createMachine, interpret } from 'xstate';
import {
    createEffect,
    createSignal,
  } from "solid-js";

const stateMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QDkwHcAEBZAhgYwAsBLAOzADoAnOABwHsTYiA3MAYgHEB5AfQBkAggAUAKlyH9EoekwAuRBlJAAPRAE4AHACZyarRoBsARgAsWgKwGNRoxoA0IAJ6IAtFqMBmXQZM2ADB5aAOzmJhpBWgC+kQ6omLiEpBTUsPSMLOzc-MJiQkoyRPKKSCrq2rr6xmaW1rYOzgguBt4mfgYeHn5+JsZGakbRsejY+MRkVLQMTKycvADKAMIASgCiK8gmANL5dHIKJEqqCJo6eoamFlY29k6u+qc+fhomHkaXrUGDIHEjieMpaWmmV4WC4ACEAJJ8FaSEoFIoHEpHE4Vc7VK51W4IAw6ALmNRBQJaPzmIJhMlfH4JMbJSbpGZZUGQ6E8LA7PbFUDI8pnKqXWo3BqeIzkPEE56EgxdCKU4bUpITVJTDKzVngqEwubswr7Q5lU6VC41a71VymEwtTztaodDwaWXxUYKgHKhm8EQCMHQkTahF6448w3ogWmxohFp+NQnUwErQGB2-GkTKBEWCySg4BHkAA2dCgMAgPDoAFdZGw+FwOBDkL7dUjEBYwuR8XGPIT8TY1KHXhaxScPCZND2E-L-mAU2mM1nc-nIDxSMnU7IwJQeLIcAAjcgAMzo2Ygc93lAAtmwxBwOCyAGJcJZsuG7HWc0oIGxGPy6DSBYwacwaL9+EEoZGOYtjkB4BhqK8RgRB45jmBYI5OmOE7ppm+w5nmBbziQi5piua6buQxYkLu+6HnQJ7kLAxYbsehTyCQUA8NQqFThhuY4BApDMaxS7sQwbAQAwFCkMwdAANYUFSyG0mx6EMJhs6FgufH4au65biRZEHoWR7HtRtH0bIjG8eO-EKbhnHcUxLHmZOlkIGJdB4JZADafgALq1s+RxGD4IqgSYoHmBBTwmEEgqIDB+jgZB+gRJGLyITE3xyrJeFodOWFzqp9nLhpRHaXuuk8Pphl0QxPF2fJ2VcdValZfsbArpQlHkDQ2aZuVMl-HJFnZcpOGZQRmnEaRJUUVRNGVSZDX5QJVl0PVtmNYtTkkOJrkIh53kPhyiJctFAXNqYIVhRKUWvtoOiGHoxiQRFEFIX1mWLUp2F5aho1FRN5F6ZRBkzcZpk1QNzULBWcwwqsVZzCIKxLDwAAiEICBWHA+YdL6eIY4FmDidqgR0zzAQYpJxXoVM4mSPgvUma2WR9uW4Y1P1aX9pX6WelaXjCN53lj-paPc5C2I8hJBG0wUGMBWitJTrz4kEUp+H09POgtTMzp9rP5ez406VNp5zAAqmCWAQiIPCwxC8NLAIIgQlwNb7U+2NHO4BjNJ4aiDlBoE4uTwEeFBivdD0UFkgMqW9QzWuDbrI2FRu5aVlwps+m7fr1ggFiBM2wUq1B7QgR0wGhBo5B3Vo-RqDi-lRhrKHg4pOss8nhGp1gAjIAIHAwuefM8B6YJC7nOJqKKnRvs8JhmO4wEhFXEF6FLpJhOY3TN-1DmJx3x44CQOAwF3mErVAAg0DQsDnzZUBCSJ5DOVJ5Bx5rtUcTlKm4Yfx+n2NayPEr43zvjxDaW13JeXHkdPOfhTgITaH+DQUYEJWGAj0KuNcCRBBAmEO0O83ra2-sNP+J8wBnyAUxEBt8qEP1au1Tq3VAZv3Sq9Rm+8f7kDIQAoidCaFgKYhAlyUC9rSEfDnWBxJzC6EQS8cIERCRwRDlGaukFAhtk6JgjwhCOFfyGguHhFDAHLXvgIsAx4aCyEcGwW28NEYj15iyUeMCXyE2nmreCd1IqAQweESmwQyShWsHBXRCd9FJyMZQ0xwDr6wFVGIHgKwsCiAAJo8Hho7FYrijguDeHFboA5-DdEJCLCuCtsF9AbpBNQYTP5txIYYo+5Cz4HmzGAUyIDBFQGRmAdpy5H7jBftJNh8d6lLQMb-ZpvCtxtI6bEmg3Ten9LAMI7a+xdo5OikEKeLwfB-laF0ImHhgKeBkcSYIFgghS0KXU1uEzInTOMUROZnTr5LL6R09gDDKAdS6rIHqoyP73OZlwqJY1XkLI+SstZoitmvh2eQPZwVnhdACL+E5WI3jdHIBcmpIQt5-h0bHIFLc94RIPk8rutiVhwwRkjIezjPTwvcQETxf5II+KAli+CIpV61yqV7JuJLHTsPCQ0yZ3CqWaTYFeFYIgFgAAkeDCAkHwO2WdxEHX9G4WKIT4LGCeK8L8V0QKxX5XXapwqhiirGSC9uYLpWbjYMjFY3oYSqvhbqrBZzLDvi-LYO0pymzGADh0CIoQtDEptYmYF5KJWPP-s81OWRTZCGRlktUrqWVRo8SBDl4pfFYg5dPfEEpLnwJMHc+NDyO7FhoBATMFDjx0APMRBtTaul0NNh2gZwkhmbUkiM21camoJrrb25traKD1sbcuLtMSmI9rnas5y6yGCbOznWWBNhCRi0MK0AtkUjChjUAhZsYU4IhHJmez4IrY1krHbWrhs6m08BbW219873ndsnS1SgbVflMIBSw9+j73oOuGl+qdn7J0LovsuptsKdrQK3b5aKMEvDi0Pd46wwF4GBTCpGaOhran3tHLvJ9oKoOTvfdOtgZsLZWxtrSjVDsnYu3hSBeu4EbDVH-J4QC5hQxlovWWiKFa4zVqo5B0gaduCZ3hfnHQoRSTqNLqFTFQpjC3XUdLdecY70xoo0QzhOE2A9z7gPRxF4mVjzQx7Vwg4dD3ECP5GKIVuVCjeCKTscFw2NijdEVKJBp3wBKGB2kSp6QUC6lYugNA+Bce46KUK+ICRhGCoOUMbgbARjUF0cm4R7TkYyi6GLOYcDxZoMl-EqW4JRjJM8UIXYsQuAtPXXwJIN61FsOYMJ0WgTUTwNQMAJATASVq1PEkDWMvNey21-QH5OvSxJE8KCA4BuAgyNwugG4iDtKSw5-0Ng6szfS01rLrWGg+FLVBJKOJ5b-i266CgLb9vtPvFq92J2Uvnca5llrIcvBigMLTCIxgXsVfewdsAWpju51O9NtLAP5vXbNGYS0-knhPCDv10rYrBs7c0v0qb9WLuA4Ww0Fwe7OsXEjAcwkMdjNlbpECeFZ6q68iNBiK6LgIJBAjCgywXjNDSYgyQkssglPexkb+bQ2g2zS0sBXUKis3giztK0eMBO7U1uo19JcBsjYAxPPClBOhBz-muf5uCoQMEqwvarKNxIwfi+IZKtmKdDaTVN0DIyVVVriqWhfMGNauO+AtOTUCfQBzhHnqayKOgpZxlsJzhC7uzOG-UmfYq-0yosOBoHsy4zTP7B4DRPAeA4Dhe+5InGBWp4p-gf+KwOJfxL06OHMkuD3yBEzxSrhXvc+c2NhVEG81S96IYDwH5XHG-kGb-oQwhh9DCaxTsqe-LrAy2uDrlnYrS+yb1t9b3eeuaF4D3NIPpe8C5lgHOafJAeDcRwDOLjJ0grnSlJdMmdXV6vBEjzwwQD7jpD76xn6j5+7j7F5h5PpcYQQ6ADhxhRq-ieBa4VwRDq4oLXJM5RC66joS6e4QEj4m4F5m4I47okz4woFEzoGkxYqdAryQQ44DjwLLygHPrDTD6aTm5WBIqaAKK27wQmCnJg6Ky+BRiRgHqcEG5TJJrRIXwCJ0Jerviig7K2BxiRiaE7KiGMFhwBCqxlp+yDhGZpQjrgYe6JotImJKFxLkAWJWINB17bovhRoihW5+ztBQQa7248qY53SvAiyoHa6yHH5SoKG2FmL2GV7V6wC14gDwiuFHChyC7PCGYJS3rhAO4fiBEwQ4J4JVoEGWFZ7yE2F8KLqXz2Fz6UEvipHVwEwRDhBZFebRStAiiBEvBRjuChxhGNJlEzLdI0JeoQQFIvC+DvglKBAhxPDTxSiBBdDzzIF9GSrgovKfJvKLJ0LLJfKqFIFSjjHFJPRlJYr+S9hhSkhqz-hmDRrmEPqUZEHWGDGQrULvKxE147HLjwr+aihrxJSFamCmqeCC4XK0wBAwSmArFPHJrkAvFVGLI-KfFgDfFq6RjBD-FtCAlyxtC4rsHEhqxg61xQmUqRHrH9ILIjHNBhSHGTHHH4Y4i4nBCgSRRbzBBFEH564yb9ERHlEbheoWC3S+qGoBomqnpxiMnXJg5RgvCkjEkvq0YfozpwY-qVGIZfG1HIgUxW5CGaYiGnrWCKxg5dChR+wlYcmEFWETorp0awYrpdLvHxFqnIkanRRK6L4dC1wJTez1zo7HChBO4khSiaHey3GRZl5gE0bWmKntp2nvI-JOkIFSzumBBnAqyQSQT4a5qhTzFoqBDWD753EmZP5yExlvrRnQYgIc4dACHW7tgdB6lYjNEBnGDXIgQaDwJymRllnToc6Rg1k6n1l+ENDExib-iWBSxnRmmFms5H79FeqBy4qK5eweb+ShhmBVwo42BWDEwkicHzkKyubLkRqrlYjywiiGGVryxRhg5TmRbzm3aHnubHmyxtbzzLaPDtDwRtAkggTBaRBAA */
createMachine({
  id: "New Machine",
  type: "parallel",
  states: {
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
          target: "#New Machine.responsive.laptopL",
        },
        GO_LAPTOP: {
          target: "#New Machine.responsive.laptop",
        },
        GO_SCREEN4K: {
          target: "#New Machine.responsive.screen4k",
        },
        GO_MOBILE_L: {
          target: "#New Machine.responsive.mobileL",
        },
        GO_MOBILE_M: {
          target: "#New Machine.responsive.mobileM",
        },
        GO_MOBILE_S: {
          target: "#New Machine.responsive.mobileS",
        },
        GO_TABLET: {
          target: "#New Machine.responsive.tablet",
        },
      },
    },
    registration: {
      initial: "logged_out",
      states: {
        logged_out: {
          on: {
            LOGIN: {
              target: "#New Machine.registration.logged_in",
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
                        "#New Machine.registration.logged_in.register_tab.unfolded_form",
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
                                  "#New Machine.registration.logged_in.register_tab.unfolded_form.submitting_registration.registration_success",
                              },
                            ],
                            onError: [
                              {
                                target:
                                  "#New Machine.registration.logged_in.register_tab.unfolded_form.submitting_registration.registration_error",
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
                            "#New Machine.registration.logged_in.register_tab.unfolded_form.submitting_registration.closed_registration_dialog",
                        },
                      },
                    },
                  },
                  on: {
                    TOGGLE_FORM: {
                      target:
                        "#New Machine.registration.logged_in.register_tab.folded_form",
                    },
                    SUBMIT_REGISTRATION: {
                      target:
                        "#New Machine.registration.logged_in.register_tab.unfolded_form.submitting_registration",
                    },
                  },
                },
              },
              on: {
                LOGOUT: {
                  target: "#New Machine.registration.logged_out",
                },
                MANAGE_TOGGLE_TAB: {
                  target: "#New Machine.registration.logged_in.manage_tab",
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
                              "#New Machine.registration.logged_in.manage_tab.loadingApps.success",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#New Machine.registration.logged_in.manage_tab.loadingApps.error",
                          },
                        ],
                      },
                    },
                    empty: {
                      on: {
                        REGISTER_TOGGLE_TAB: {
                          target:
                            "#New Machine.registration.logged_in.register_tab",
                        },
                      },
                    },
                    success: {},
                    error: {},
                  },
                  on: {
                    GO_TO_EMPTY_STATE: {
                      target:
                        "#New Machine.registration.logged_in.manage_tab.loadingApps.empty",
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
                              "#New Machine.registration.logged_in.manage_tab.deletingApp.successDelete",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#New Machine.registration.logged_in.manage_tab.deletingApp.errorDelete",
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
                  target: "#New Machine.registration.logged_in.register_tab",
                },
                FETCH_APP_LIST: {
                  target:
                    "#New Machine.registration.logged_in.manage_tab.loadingApps",
                },
                DELETE_APP: {
                  target:
                    "#New Machine.registration.logged_in.manage_tab.deletingApp",
                },
                GO_UPDATE_MODE: {
                  target: "#New Machine.registration.logged_in.update_mode",
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
                              "#New Machine.registration.logged_in.update_mode.updateApp.successUpdate",
                          },
                        ],
                        onError: [
                          {
                            target:
                              "#New Machine.registration.logged_in.update_mode.updateApp.errorUpdate",
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
                  target:
                    "#New Machine.registration.logged_in.update_mode.updateApp",
                },
              },
            },
          },
          on: {
            LOGOUT: {
              target: "#New Machine.registration.logged_out",
            },
            MANAGE_TOGGLE_TAB: {
              target: "#New Machine.registration.logged_in.manage_tab",
            },
          },
        },
      },
    },
  },
});

const [windowWidth, setWindowWidth] = createSignal();
  
  // select element body
  const body = document.querySelector("body");
  
  const interpreter = interpret(stateMachine).onTransition(
    (state) => {
      const joinedState = state.toStrings().join(' ');
      body.setAttribute("data-state", joinedState);
    }
  ).start();
  
  const { send } = interpreter;
  
  const screenSizesEnum = {
    screen4k: {
      width: 2560,
      name: 'screen4k',
    },
    laptopL: {
      width: 1440,
      name: 'laptopL',
    },
    laptop: {
      width: 1024,
      name: 'laptop',
    },
    tablet: {
      width: 768,
      name: 'tablet',
    },
    mobileL: {
      width: 425,
      name: 'mobileL',
    },
    mobileM: {
      width: 375,
      name: 'mobileM',
    },
    mobileS: {
      width: 320,
      name: 'mobileS',
    },
  };

const checkWidth = () => {
    if (window.innerWidth >= screenSizesEnum.screen4k.width) {
      setWindowWidth(screenSizesEnum.screen4k.name);
    }
    if (window.innerWidth >= screenSizesEnum.laptopL.width && window.innerWidth < screenSizesEnum.screen4k.width) {
      setWindowWidth(screenSizesEnum.laptopL.name);
    }
    if (window.innerWidth >= screenSizesEnum.laptop.width && window.innerWidth < screenSizesEnum.laptopL.width) {
      setWindowWidth(screenSizesEnum.laptop.name);
    }
    if (window.innerWidth >= screenSizesEnum.tablet.width && window.innerWidth < screenSizesEnum.laptop.width) {
      setWindowWidth(screenSizesEnum.tablet.name);
    }
    if (window.innerWidth >= screenSizesEnum.mobileL.width && window.innerWidth < screenSizesEnum.tablet.width) {
      setWindowWidth(screenSizesEnum.mobileL.name);
    }
    if (window.innerWidth >= screenSizesEnum.mobileM.width && window.innerWidth < screenSizesEnum.mobileL.width) {
      setWindowWidth(screenSizesEnum.mobileM.name);
    }
    if (window.innerWidth >= screenSizesEnum.mobileS.width && window.innerWidth < screenSizesEnum.mobileM.width) {
      setWindowWidth(screenSizesEnum.mobileS.name);
    }
  };
  createEffect(
    () => {
      if (windowWidth() === screenSizesEnum.screen4k.name) {
        send("GO_SCREEN4K");
      }
      if (windowWidth() === screenSizesEnum.laptopL.name) {
        send("GO_LAPTOP_L");
      }
      if (windowWidth() === screenSizesEnum.laptop.name) {
        send("GO_LAPTOP");
      }
      if (windowWidth() === screenSizesEnum.tablet.name) {
        send("GO_TABLET");
      }
      if (windowWidth() === screenSizesEnum.mobileL.name) {
        send("GO_MOBILE_L");
      }
      if (windowWidth() === screenSizesEnum.mobileM.name) {
        send("GO_MOBILE_M");
      }
      if (windowWidth() === screenSizesEnum.mobileS.name) {
        send("GO_MOBILE_S");
      }
    });
  
  checkWidth();
  window.addEventListener("resize", checkWidth);