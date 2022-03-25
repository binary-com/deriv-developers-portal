import { createSignal, createEffect, onCleanup } from 'solid-js';
import { send } from './stateSignal';

const [windowWidth, setWindowWidth] = createSignal();

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
        checkWidth();
        window.addEventListener("resize", checkWidth);
    });

onCleanup(() => {
    window.removeEventListener("resize", checkWidth);
});
