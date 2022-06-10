export const homeSliderMachine = () => ({
    id: 'homepage_slider',
    initial: 'alessandro',
    on: { 
        DRAG_LEFT: 'josh',
        DRAG_RIGHT: 'thiago',
        CLICK_LEFT: 'josh',
        CLICK_RIGHT: 'thiago',
    },
    states: {
        alessandro: {
            on: { 
                DRAG_LEFT: 'josh',
                DRAG_RIGHT: 'thiago',
                CLICK_LEFT: 'josh',
                CLICK_RIGHT: 'thiago',
            },
        },
        josh: { 
            on: { 
                DRAG_LEFT: 'thiago', 
                DRAG_RIGHT: 'alessandro', 
                CLICK_LEFT: 'thiago',
                CLICK_RIGHT: 'alessandro',
            },
        },
        thiago: {
            on: { 
                DRAG_LEFT: 'alessandro', 
                DRAG_RIGHT: 'josh',
                CLICK_LEFT: 'alessandro',
                CLICK_RIGHT: 'josh',
            },
        },
    }
})