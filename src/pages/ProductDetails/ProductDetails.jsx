import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../../hooks';
import './ProductDetails.scss';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FaStarHalf, FaStar } from "react-icons/fa";
import Button from "../../components/Button"
import ReviewsSection from './RewiewsSection/Reviews';
import { toast } from 'react-toastify';

function ProductDetails() {
  const { id } = useParams();
  const { data = [] } = useProducts();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [stars, setStars] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const handleAddStorage = () => {
    try {
      let products = localStorage.getItem("products") || "[]";
      products = JSON.parse(products);

      const existingProductIndex = products.findIndex(p => p.id === product.id);

      if (existingProductIndex !== -1) {
        products[existingProductIndex].quantity += quantity;
      } else {
        products.push({
          ...product,
          quantity
        });
      }

      localStorage.setItem("products", JSON.stringify(products));
    } catch (error) {
      toast.error(error.message);
    }
  };


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


  const handleIncrease = () => setQuantity(prev => prev + 1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  useEffect(() => {
    window.scroll(0, 0)
  }, [id])



  useEffect(() => {
    if (data.length > 0) {
      const found = data.find((item) => String(item.id) === id);
      setProduct(found);
      generateStars();
      setMainImage(found?.images?.[0]);
    }
  }, [data, id, product]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div className='product-details container'>
      <div className='product-gallery'>
        <div className='thumbnails'>
          {product.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx}`}
              onClick={() => setMainImage(img)}
              className={mainImage === img ? 'active' : ''}
            />
          ))}
        </div>
        <div className='main-image'>
          <img src={mainImage} alt={product.title} />
        </div>
      </div>

      <div className='product-info'>
        <h1>{product.title}</h1>
        <div className='rating'>
          <span>{stars} {product.rating}</span> /5
        </div>
        <div className='price'>
          <span className='current-price'>${product.price}</span>
          {product.oldPrice && <span className='old-price'>${product.oldPrice}</span>}
          {product.oldPrice && (
            <span className='discount'>
              -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
            </span>
          )}
        </div>
        <p className='description'>{product.description}</p>

        <div className='color-select'>
          <p>Select Colors</p>
          <div className='colors'>
            <label className='color-option'>
              <input type='radio' name='color' value='green' />
              <span className='circle green'></span>
            </label>
            <label className='color-option'>
              <input type='radio' name='color' value='navy' />
              <span className='circle navy'></span>
            </label>
            <label className='color-option'>
              <input type='radio' name='color' value='black' />
              <span className='circle black'></span>
            </label>
          </div>
        </div>



        <div className='size-select'>
          <p>Choose Size</p>
          <div className='sizes'>
            {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
              <div
                key={size}
                className={`small-div ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className='cart-section'>
          <div className='quantity'>
            <FaMinus size={18} onClick={handleDecrease} style={{ cursor: "pointer" }} />
            <span>{quantity}</span>
            <FaPlus size={18} onClick={handleIncrease} style={{ cursor: "pointer" }} />
          </div>
          <Link to={"/basket"} onClick={handleAddStorage} className='add-card-wrapper'>
            <Button size={"full"}>Add to Cart</Button>
          </Link>
        </div>

      </div>

      <div className='product-details container'>
        <ReviewsSection />
      </div>
    </div>
  );
}

export default ProductDetails;
