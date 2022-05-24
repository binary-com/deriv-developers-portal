import { useEffect } from "react";

let lastScrollTop = 0;

function debounce(func, milliseconds) {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            func.apply(this, arguments)
        }, milliseconds)
    };
}

export const useOnScrollObject = (ref) => {

    const ref_current = ref?.current;

    const debounceHandleScroll = debounce(() => {
        const st = ref_current.scrollTop;
        lastScrollTop = st <= 0 ? 0 : st;
        console.log(lastScrollTop);
    }, 100)

    useEffect(() => {
        // currently causes error because the ref value is initially null.
        ref_current.addEventListener("scroll", debounceHandleScroll, false);
        return () => {
            ref_current.removeEventListener("scroll", debounceHandleScroll);
        };
    });
}