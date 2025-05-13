import React from 'react';
import CategoryDetails from './CategoryDetails';
import Card from '../../components/Card';
import { useProducts } from '../../hooks/'

import "./CategoryPage.scss"

const CategoryPage = () => {

  const { data = [] } = useProducts();

  return (
    <div className='category-page container'>
      <div className='hr-line' />
      <div className='category-content'>
        <CategoryDetails />
        <div className='product-listing'>
          <div className='header'>
            <h2>Casual</h2>
            <div className='info'>
              <p className='title'>Showing 1–10 of 100 Products</p>
              <div className='option-wrapper'>
                <p >Sort by:</p>
                <select>
                  <option className='Most-Popular'>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className='cards'>
            {data.slice(0, 9).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>


          <div className='hr-botom' />

          <div className='pagination'>
            <div className='pages'>
              <h4 className='active'>1</h4>
              <h3>2</h3>
              <h3>3</h3>
              <h3>...</h3>
              <h3>8</h3>
              <h3>9</h3>
              <h3>10</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CategoryPage;
