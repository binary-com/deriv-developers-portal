import { createEffect, onCleanup } from 'solid-js';
import { send } from './stateSignal';
import { devices } from './devices';

const checkWidth = () => {
    if (window.outerWidth >= devices.desktopScreen4k) {
        send("GO_SCREEN4K");
    }
    if (window.outerWidth >= devices.desktopLaptopL && window.outerWidth < devices.desktopScreen4k) {
        send("GO_LAPTOP_L");
    }
    if (window.outerWidth >= devices.desktopLaptopM && window.outerWidth < devices.desktopLaptopL) {
        send("GO_LAPTOP");
    }
    if (window.outerWidth >= devices.mobileTablet && window.outerWidth < devices.desktopLaptopM) {
        send("GO_TABLET");
    }
    if (window.outerWidth >= devices.mobileL && window.outerWidth < devices.mobileTablet) {
        send("GO_MOBILE_L");
    }
    if (window.outerWidth >= devices.mobileM && window.outerWidth < devices.mobileL) {
        send("GO_MOBILE_M");
    }
    if (window.outerWidth >= devices.mobileS && window.outerWidth < devices.mobileM) {
        send("GO_MOBILE_S");
    }
};
createEffect(
    () => {
        checkWidth();
        window.addEventListener("resize", checkWidth);
    });

onCleanup(() => {
    window.removeEventListener("resize", checkWidth);
});
