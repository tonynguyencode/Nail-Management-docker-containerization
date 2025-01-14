import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './cardCarouselStyles.css';

import LindaCard from './Linda';
import FlowerCard from './flowerNail';
import JohnCard from './john-Nail';

{/* Card function to group them together */}
const CardCarousel = () => {
    const cards = [ 
    <FlowerCard />,
    <LindaCard />,
    <JohnCard />
    ];

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <div className="content">
            <div className="container" >
                <Slider {...settings}>
                    {cards.map((card, index) => (
                        <div className="img-body">
                            <div className='card' key={index}>{card}</div>
                        </div>
                        
                    ))}

                    
                    
                </Slider>
                
                

            </div>
        </div>
    )
}

export default CardCarousel;