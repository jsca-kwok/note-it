import React from 'react';
import { Link } from "react-router-dom";
import './hero.scss';
import video from '../../assets/screen-capture.webm';


function Hero() {
    return(
        <div className='hero'>
            <p className='hero__catchphrase'>A web application to help students and teachers get the best out of their virtual classes.</p>
            <div className='hero__feature'>
                <video src={video} height="500px" width="800px" controls autoplay="true" ></video>
            </div>
            <Link to='/demo' ><button className='hero__cta'>DEMO NOW</button></Link>
        </div>
    )
}

export default Hero;