import React, { useEffect, useState } from 'react';
import { FaStarHalf, FaStar } from "react-icons/fa";

import "./Card.scss"
import { Link } from 'react-router';

const Card = ({ product }) => {
    const [stars, setStars] = useState([]);    
    useEffect(() => {
        generateStars();
    }, [product]);

    const generateStars = () => {
        const starsArray = [];

        for (let i = 0; i < Math.floor(product?.rating || 0); i++) {
            starsArray.push(
                <FaStar
                    color="gold"
                    key={`full-${i}`}
                    className="raiting"
                    size={18}
                />
            );
        }

        if ((product?.rating % 1) > 0.4) {
            starsArray.push(
                <FaStarHalf
                    color="gold"
                    key="half"
                    className="raiting"
                    size={18}
                />
            );
        }
        setStars(starsArray);
    };

    if (!product) return null;


    return (
        <div className='card'>
            <div className='image-wrapper'>
                <Link to={`/productDetail/${product.id}`}>
                    <img style={{ width: "295px" }} src={product.images?.[0]} alt={product.title} />
                </Link>
            </div>
            <h2 className='title'>
                {product.title}
            </h2>
            <div className='range-wrapper'>
                <div className='stars-container'>
                    {stars}
                </div>
                <p>{product.rating}/5</p>
            </div>
            <div className='price-wrapper'>
                <h3 className='now-price'>${product.price}</h3>
                <p className='old-price'> ${product.oldPrice} </p>
            </div>
        </div>
    );
    
};

export default Card;
