import React from 'react';
import VectorImg from '../../../../assets/Vector.svg'
import BrandsAd from '../BrandsAd';

import './Home.scss';
import Button from '../../../../components/Button';
import { useEffect, useRef, useState } from 'react';

function Home() {
  
  const container = useRef(null);
  const [isMedia, setIsMedia] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMedia(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='hero'>
      <div className='container' ref={container}>
        <h2>
          <span>FIND CLOTHES</span>
          <span>THAT MATCHES</span>
          <span>YOUR STYLE</span>
        </h2>

        <div className='home-p-img'>
          <p>Browse through our diverse range of meticulously crafted garments, designed <br /> to bring out your individuality and cater to your sense of style.</p>
          <img src={VectorImg} alt="This home icon StarIcon" />
        </div>

        <img className='bigStarIcon' src={VectorImg} alt="This home icon StarIcon" />

        <Button className='shop-btn' size={isMedia? "full" : "large"} px={67}>Shop Now</Button>

        <div className='nomeric-wrapper'>
          <div className='nomeric'>
            <h3>200+</h3>
            <p>International Brands</p>
          </div>
          <div className='nomeric'>
            <h3>2,000+</h3>
            <p>High-Quality Products</p>
          </div>
          <div className='nomeric last'>
            <h3>30,000+</h3>
            <p>Happy Customers</p>
          </div>
        </div>
      <div className='hero-image'/>
      </div>
      <div>
        <BrandsAd />
      </div>
    </div>
  )
}

export default Home;