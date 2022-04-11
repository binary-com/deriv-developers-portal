import { createSignal, createEffect, onCleanup } from 'solid-js';
import { send } from './stateSignal';
import { devices } from './devices';

const [windowWidth, setWindowWidth] = createSignal();

const screenSizesEnum = {
    screen4k: {
        width: devices.screen4k, // 2560px
        name: 'screen4k',
    },
    laptopL: {
        width: devices.laptopL, // 1440px
        name: 'laptopL',
    },
    laptop: {
        width: devices.laptop, // 1024px
        name: 'laptop',
    },
    tablet: {
        width: devices.tablet, // 768px
        name: 'tablet',
    },
    mobileL: {
        width: devices.mobileL, // 425px
        name: 'mobileL',
    },
    mobileM: {
        width: devices.mobileM, // 375px
        name: 'mobileM',
    },
    mobileS: {
        width: devices.mobileS, // 320px
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
