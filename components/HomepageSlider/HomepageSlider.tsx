import { useState, useEffect } from 'react';
import Slide from './Slide';

export default function HomepageSlider() {
    const authors = ["alessandro", "thiago", "josh"];
    const [slide_position, setSlidePosition] = useState(1);
    const [slide_class, setSlideClass] = useState("alessandro");

    const nextOrPrevSlide = (direction) => {
        if (direction === "previous" && !(slide_position <= 0)) {
            setSlidePosition(slide_position - 1);
        }
        if (direction === "next" && !(slide_position >= (authors.length - 1))) {
            setSlidePosition(slide_position + 1);
        }
    }

    useEffect(() => {
        setSlideClass(authors[slide_position]);
    }, [slide_position]);
    
    return (
        <div id="slider" className="slider loaded">
            <div className="wrapper">
                <div id="slides" className={`slides ${slide_class}`}>
                    <Slide 
                        content={<span>asdf</span>} 
                        author={<span>asdfaewfawef</span>}
                    />
                    <Slide 
                        content={<span>asdf</span>} 
                        author={<span>asdfaewfawef</span>}
                    />
                    <Slide 
                        content={<span>asdf</span>} 
                        author={<span>asdfaewfawef</span>}
                    />
                    {/* <div className="slide">
                        <blockquote className="content">
                            To be honest, Deriv’s API is one of the best APIs in the trading market.
                        </blockquote>
                        <hr className="blockquote-separator" />
                        <p className="blockquote-author"><b>Alessandro</b>, CEO | Italy</p>
                    </div>
                    <div className="slide">
                        <blockquote className="content">
                            Probably the best API for making your business successful in trading derivatives out there.
                        </blockquote>
                        <hr className="blockquote-separator" />
                        <p className="blockquote-author"><b>Thiago</b>, entrepreneur | Brazil</p>
                    </div>
                    <div className="slide">
                        <blockquote className="content">
                            I have been using the Deriv API for 13 years to build successful apps in and I find the support I get from Deriv as a business partner second to none. I look forward to 13 more successful years to come.
                        </blockquote>
                        <hr className="blockquote-separator" />
                        <p className="blockquote-author"><b>Josh</b>, trader | Australia</p>
                    </div> */}
                </div>
            </div>
            <div id="prev" className="control prev" onClick={() => nextOrPrevSlide("previous")} />
            <div id="next" className="control next" onClick={() => nextOrPrevSlide("next")} />
        </div>
    );
}