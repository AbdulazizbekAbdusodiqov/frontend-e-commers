import React, { useEffect, useState } from 'react'
import ReactRangeSliderInput from 'react-range-slider-input'


import "react-range-slider-input/dist/style.css"
import "./CategoryDetails.scss"

const CategoryDetails = () => {
    const [priceRange, setPriceRange] = useState([0,500])
    
    useEffect(() => {
        const el = document.querySelectorAll('.range-slider__thumb');

        if(!!el[0] && !!el[1]) {
            el[0].innerHTML = `<span style="font-weight: 700;position:absolute;bottom: -20px;background-color: transparent !important;">$${priceRange[0]}</span>`;
            el[1].innerHTML = `<span style="font-weight: 700;position:absolute;bottom: -20px;background-color: transparent !important;">$${priceRange[1]}</span>`;
        }
    }, [priceRange]);

    return (
    <div>        
        <ReactRangeSliderInput
            className='hole'
            min={5}
            max={500}
            onInput={(range)=>setPriceRange(range)}
        />

    </div>
  )
}

export default CategoryDetails