import React, { useEffect, useState } from 'react';
import { useProducts } from '../../../../hooks';
import Card from '../../../../components/Card';

import './NewArrivals.scss';

function NewArrivals() {
  const { data = [], isLoading } = useProducts();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (data.length > 0) {
      setProducts(data.slice(1, 5));
    }
  }, [data]); 
    
  return (
    <div className='container'>
      <div className='new-arrivals-item'>
        <h2>NEW ARRIVALS</h2>
      </div>
      
      <div className='item-cards'>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <Card key={product.id} product={product} />
          ))
        )}
      </div>
      
      <div className='view-all-container'>
        <button className='view-btn'>View All</button>
      </div>
      
      <hr />
    </div>
  );
}

export default NewArrivals;