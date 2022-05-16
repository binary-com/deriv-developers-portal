import React from 'react';
import { useOnWindowResize } from '../../custom_hooks/useOnWindowResize';
import { devices } from '../../devices';
import styles from "./HomepageSlider.module.scss";
import Slide from './Slide';

export default function HomepageSlider() {
    const window_resize = useOnWindowResize();
    const NEXT = 'next';
    const PREVIOUS = 'previous';
    const LAST_SLIDE = 'last_slide';
    const FIRST_SLIDE = 'first_slide';
    const slide_amount = 4; // starts at 0
    const slide_size = { small: 70, big: 33 };
    const [is_holding_card, setIsHoldingCard] = React.useState(false);
    const [in_slide_transition, setInSlideTransition] = React.useState(false);
    const [enable_slide_animation, setEnableSlideAnimation] = React.useState(true);
    const [slide_distance, setSlideDistance] = React.useState(0);
    const [mouse_down_position, setMouseDownPosition] = React.useState(0);
    const [slide_position, setSlidePosition] = React.useState(1);
    
    React.useEffect(() => {
        if (window_resize.width >= devices.desktopLaptopM) {
            setSlideDistance((slide_size.big * slide_position) * -1);
        } else if (window_resize.width <= devices.desktopLaptopM) {
            setSlideDistance((slide_size.small * slide_position) * -1);
        }
    }, [slide_position, window_resize, devices, slide_size])

    const FirstSlide = () => {
        return (
            <Slide 
                content={<span>To be honest, Deriv's API is one of the best APIs in the trading market.</span>} 
                author={<span><b>Alessandro</b>, CEO | Italy</span>}
            />
        );
    }

    const LastSlide = () => {
        return (
            <Slide 
                content={<span>I have been using the Deriv API for 13 years to build successful apps in and I find the support I get from Deriv as a business partner second to none. I look forward to 13 more successful years to come.</span>} 
                author={<span><b>Josh</b>, trader | Australia</span>}
            />
        );
    }

    const SlidePortal = ({ portal_entry }) => {
        if (portal_entry === FIRST_SLIDE) {
            return (
                <FirstSlide />
            );
        }
        if (portal_entry === LAST_SLIDE) {
            return (
                <LastSlide />
            );
        }
    }

    const slidingTo = (direction:string) => {
        // slide_position is lagging a number behind, as the previous value is always being read.
        let portal_slide:boolean;

        if (direction === PREVIOUS) {
            portal_slide = slide_position === 1
            setSlidePosition(slide_position - 1);
        } else if (direction === NEXT) {
            portal_slide = slide_position === slide_amount - 1;
            setSlidePosition(slide_position + 1);
        }
        setInSlideTransition(true);
        setTimeout(() => {
            setIsHoldingCard(false);
            setInSlideTransition(false);
            if (portal_slide) {
                setEnableSlideAnimation(false);
                if (direction === PREVIOUS) {
                    setSlidePosition(slide_amount - 1);
                } else if (direction === NEXT) {
                    setSlidePosition(1);
                }
            }
        }, 500)
    }

    const nextOrPrevSlide = (direction:string) => {
        const previous_slide = !!(direction === PREVIOUS && !(slide_position < 0) && !in_slide_transition);
        const next_slide = !!(direction === NEXT && !(slide_position > slide_amount) && !in_slide_transition);
        if (!enable_slide_animation) setEnableSlideAnimation(true);
        if (previous_slide) {
            slidingTo(PREVIOUS);
        } else if (next_slide) {
            slidingTo(NEXT);
        }
    }

    const slideCard = (mouse_x:number) => {
        const mouse_moves_right = (mouse_x >= (mouse_down_position + 10));
        const mouse_moves_left = (mouse_x <= (mouse_down_position - 10));
        const slide_right = !!(mouse_moves_right && is_holding_card && !(slide_position <= 0) && !in_slide_transition);
        const slide_left = !!(mouse_moves_left && is_holding_card && !(slide_position >= slide_amount) && !in_slide_transition);
        if (!enable_slide_animation && is_holding_card) setEnableSlideAnimation(true);
        if (slide_right) {
            setIsHoldingCard(false);
            slidingTo(PREVIOUS);
        } else if (slide_left) {
            setIsHoldingCard(false);
            slidingTo(NEXT);
        }
    }

    type sliderEvent = React.MouseEvent<HTMLElement>|React.TouchEvent<HTMLElement>;

    const enableSliding = (event_type:string, event:sliderEvent):void => {
        setIsHoldingCard(true)
        if (event_type === "mouse" && "clientX" in event) {
            setMouseDownPosition(event.clientX);
        } else if (event_type === "touch" && "targetTouches" in event) {
            setMouseDownPosition(event.targetTouches[0].clientX);
        }
    }

    return (
        <div id="slider" className={`${styles.slider} loaded`}>
            <div className={`${styles.sliderWrapper} wrapper`}>
                <div 
                    id="slides"
                    className={styles.slides}
                    style={{ left: `${slide_distance}vw`, transition: enable_slide_animation ? "left 0.5s" : "none" }}
                    onMouseUp={() => setIsHoldingCard(false)}
                    onMouseDown={(event) => enableSliding("mouse", event)}
                    onMouseMove={(event) => slideCard(event.clientX)}
                    onTouchEnd={() => setIsHoldingCard(false)}
                    onTouchStart={(event) => enableSliding("touch", event)}
                    onTouchMove={(event) => slideCard(event.targetTouches[0].clientX)}
                >
                    <SlidePortal portal_entry={LAST_SLIDE}/>
                    <FirstSlide />
                    <Slide 
                        content={<span>Probably the best API for making your business successful in trading derivatives out there.</span>} 
                        author={<span><b>Thiago</b>, entrepreneur | Brazil</span>}
                    />
                    <LastSlide />
                    <SlidePortal portal_entry={FIRST_SLIDE}/>
                </div>
            </div>
            <div 
                id="prev"
                className="control prev"
                onClick={() => nextOrPrevSlide(PREVIOUS)} 
            />
            <div 
                id="next"
                className="control next"
                onClick={() => nextOrPrevSlide(NEXT)} 
            />
        </div>
    );
}
