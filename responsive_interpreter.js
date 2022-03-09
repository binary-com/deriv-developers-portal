import {
  createEffect,
  createSignal,
} from "https://cdn.skypack.dev/solid-js";
import { createMachine, interpret } from "https://unpkg.com/xstate@4/dist/xstate.web.js";

export const responsiveStateMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGNawMoBcCGmwFltkALASwDswBiAcQHkB9AGQEEAFAFTrecVAAcA9rFKZSg8nxAAPRAFoATAHYAzADoAbABYFGgKx6AnAA4tegAw6ANCACe8lZbUBGc2+N6tz50ZV6lAL4BNqgYOHiEJBTU9MzsXGxSQiJiElKyCHLOKgouOW4azsaGKoZKWjb2mY5aLj56GgoqprrmKkEhaFi4BERklLSM6ADCAEoAouMAcloA0knCouKSSDLyWioaakoaSs5NKireh8YalQ76mnoeSgfKWlrGHSCh3RF90YMM+HQAQgCSTHGvFWySWaVWGW8hm25gUFlUhk8jXMxnOmQUhi2hnMGkOhkMWiU102z1e4V6UQGsR+AKB3wWKWW6UQ8OcakMPkMygUziUSg86LkR3ZpX24pMDUsZK6FMi-RijFpgOB6EZ4JWoAyOj0aiJCmMhq0nJKSjKQvyagsSJMZr85mJMrCPXln1iHBYvyBHHVqU1awQ6lcj10vP0Oix5j0FuctV2BR2RNupOe5EEEDgUnJLo+lDUABtsPxMIJ+ExfczIfJdOpPJtk7teXyKnZqwpcs5CZy3AYzV5AsEXrKc1SwAWiyX+BWIVr5PtdTjjM0DBoSm4VEL2+oBZ3Cvsm3pnE63pSFWpYMgAE5gMDkLQAa2n-oyci0Do5eNx+g8fIdLaqijtnqYYlMYqKNlGx5yrmY4ALaCAARqQ+ZgOWoKLH6LIILG6g6D4RI6Foq7ZJu2RqKiqh6JsPI7BoTyDtm7yjmo8FISh+BPlhBq1EUxgGs0pRGNcpEwsSBp6E0iZ7DoUEjmerHIWAaroUyM4BhsShqCo-LlPsdFIpsm4KOYahNMYSi4sSZpLrcslMWeOAIShmCcVWCC1Ji+wPAoZhmBodE+EZxguMYzjEQS+ynOZdmntErmzpkREmTsewHCKJxnK2iUWJoxpmKFxnmK42lBEEQA */
  createMachine(
    {
  id: "cssStateMachine",
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
      target: "#cssStateMachine.laptopL",
    },
    GO_LAPTOP: {
      target: "#cssStateMachine.laptop",
    },
    GO_SCREEN4K: {
      target: "#cssStateMachine.screen4k",
    },
    GO_MOBILE_L: {
      target: "#cssStateMachine.mobileL",
    },
    GO_MOBILE_M: {
      target: "#cssStateMachine.mobileM",
    },
    GO_MOBILE_S: {
      target: "#cssStateMachine.mobileS",
    },
    GO_TABLET: {
      target: "#cssStateMachine.tablet",
    },
  },
},
  );

const [windowWidth, setWindowWidth] = createSignal();

// select element body
const body = document.querySelector("body");

const interpreter = interpret(responsiveStateMachine).onTransition(
  (state) => {
    const joinedState = state.toStrings().join(' ');
    body.setAttribute("data-view", joinedState);
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
