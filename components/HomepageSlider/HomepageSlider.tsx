import { useState, useEffect } from 'react';
import { useOnWindowResize } from '../../custom_hooks/useOnWindowResize';
import styles from "./HomepageSlider.module.scss";
import Slide from './Slide';

export default function HomepageSlider() {
    const slide_amount = 2 // starts at 0
    const [slide_size, setSlideSize] = useState(0);
    const [slide_distance, setSlideDistance] = useState(0);
    const [slide_position, setSlidePosition] = useState(0);
    const [slide_card, setSlideCard] = useState(false);
    const [mouse_down_start, setMouseDownStart] = useState(0);
    const window_resize = useOnWindowResize();

    const nextOrPrevSlide = (direction:string) => {
        if (direction === "previous" && !(slide_position <= 0)) {
            setSlidePosition(slide_position - 1);
        }
        if (direction === "next" && !(slide_position >= slide_amount)) {
            setSlidePosition(slide_position + 1);
        }
    }

    const slideCard = (mouse_x:number) => {
        const mouse_moves_right = (mouse_x >= (mouse_down_start + 10));
        const mouse_moves_left = (mouse_x <= (mouse_down_start - 10));
        const slide_right = slide_card && mouse_moves_right && !(slide_position <= 0);
        const slide_left = slide_card && mouse_moves_left && !(slide_position >= slide_amount);
        if (slide_right) {
            setSlidePosition(slide_position - 1);
            setSlideCard(false);
        } else if (slide_left) {
            setSlidePosition(slide_position + 1);
            setSlideCard(false);
        } else {
            return;
        }
    }

    useEffect(() => {
        setSlideDistance(slide_size * slide_position);
    }, [slide_size, slide_position])

    useEffect(() => {
        if (window_resize && slide_distance !== 0) {
            setSlideDistance(0);
            setSlidePosition(0);
        }
    }, [window_resize])

    return (
        <div id="slider" className={`${styles.slider} loaded`}>
            <div className={`${styles.sliderWrapper} wrapper`}>
                <div 
                    id="slides"
                    className={`${styles.slides}`}
                    style={{left: slide_distance}}
                    onMouseUp={() => setSlideCard(false)}
                    onMouseDown={(event) => {
                        setSlideCard(true)
                        setMouseDownStart(event.clientX);
                        setSlideSize((event.target as HTMLElement).clientWidth * -1);
                    }}
                    onMouseMove={(event) => slideCard(event.clientX)}
                    onTouchEnd={() => setSlideCard(false)}
                    onTouchStart={(event) => {
                        setSlideCard(true);
                        setMouseDownStart(event.targetTouches[0].clientX);
                        setSlideSize((event.target as HTMLElement).clientWidth * -1);
                    }}
                    onTouchMove={(event) =>  slideCard(event.targetTouches[0].clientX)}
                >
                    <Slide 
                        content={<span>To be honest, Deriv's API is one of the best APIs in the trading market.</span>} 
                        author={<span><b>Alessandro</b>, CEO | Italy</span>}
                    />
                    <Slide 
                        content={<span>Probably the best API for making your business successful in trading derivatives out there.</span>} 
                        author={<span><b>Thiago</b>, entrepreneur | Brazil</span>}
                    />
                    <Slide 
                        content={<span>I have been using the Deriv API for 13 years to build successful apps in and I find the support I get from Deriv as a business partner second to none. I look forward to 13 more successful years to come.</span>} 
                        author={<span><b>Josh</b>, trader | Australia</span>}
                    />
                </div>
            </div>
            <div 
                id="prev"
                className="control prev"
                onClick={(event) => {
                    setSlideSize((event.target as HTMLElement).parentElement.children[0].clientWidth * -1);
                    nextOrPrevSlide("previous")
                }} 
            />
            <div 
                id="next"
                className="control next"
                onClick={(event) => {
                    setSlideSize((event.target as HTMLElement).parentElement.children[0].clientWidth * -1);
                    nextOrPrevSlide("next")
                }} 
            />
        </div>
    );
}
