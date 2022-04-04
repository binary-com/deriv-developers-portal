import { useState, useEffect } from 'react';
import styles from "./HomepageSlider.module.scss";
import Slide from './Slide';

export default function HomepageSlider() {
    // If a new author (slide) has to be added, add a new author name to the 'authors' list here.
    // When adding a new slide component, make sure it is in the same order as the authors list.
    // When a new slide is added, add in the CSS for the author name a new slide value.
    const authors = ["alessandro", "thiago", "josh"];
    const [slide_position, setSlidePosition] = useState(0);
    const [mouse_down_start, setMouseDownStart] = useState(0);
    const [slide_class, setSlideClass] = useState("alessandro");
    const [slide_card, setSlideCard] = useState(false); 

    const nextOrPrevSlide = (direction:string) => {
        if (direction === "previous" && !(slide_position <= 0)) {
            setSlidePosition(slide_position - 1);
        }
        if (direction === "next" && !(slide_position >= (authors.length - 1))) {
            setSlidePosition(slide_position + 1);
        }
    }

    const slideCard = (mouse_x:number) => {
        const mouse_moves_right = (mouse_x >= (mouse_down_start + 10));
        const mouse_moves_left = (mouse_x <= (mouse_down_start - 10));
        const slide_right = slide_card && mouse_moves_right && !(slide_position <= 0);
        const slide_left = slide_card && mouse_moves_left && !(slide_position >= (authors.length - 1));
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
        setSlideClass(authors[slide_position]);
    }, [slide_position]);
    
    return (
        <div id="slider" className={`${styles.slider} loaded`}>
            <div className={`${styles.sliderWrapper} wrapper`}>
                <div 
                    id="slides"
                    className={`${styles.slides} ${slide_class}`}
                    onMouseUp={() => setSlideCard(false)}
                    onMouseDown={(event) => {
                        setSlideCard(true)
                        setMouseDownStart(event.clientX);
                    }}
                    onMouseMove={(event) => slideCard(event.clientX)}
                    onTouchEnd={() => setSlideCard(false)}
                    onTouchStart={(event) => {
                        setSlideCard(true);
                        setMouseDownStart(event.targetTouches[0].clientX);
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
            <div id="prev" className="control prev" onClick={() => nextOrPrevSlide("previous")} />
            <div id="next" className="control next" onClick={() => nextOrPrevSlide("next")} />
        </div>
    );
}