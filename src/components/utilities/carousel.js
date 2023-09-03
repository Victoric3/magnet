import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css'; 

const ReviewCarousel = ({ images }) => {
  return (
    <Carousel
      showStatus={false}
      showThumbs={false}
      showArrows
      infiniteLoop
      autoPlay
      interval={3000}
      transitionTime={500} 
    >
      {images.map((image, index) => (
        <div key={index}>
          <img src={image} alt={`Review ${index}`} style={{
            marginBottom: '100px',
            marginTop: '50px',
            borderRadius: '10px'
          }}/>
        </div>
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
