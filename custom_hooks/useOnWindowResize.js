import { useState, useEffect } from "react";

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

export const useOnWindowResize = () => {
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {  
        const debounceHandleResize = debounce(() => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }, 250)
        window.addEventListener('resize', debounceHandleResize);
        return () => {
            window.removeEventListener('resize', debounceHandleResize);
        }
    }, [])
    return dimensions;
}
