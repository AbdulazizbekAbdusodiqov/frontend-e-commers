import React, { useEffect, useState } from 'react';
import { useProducts } from '../../../../hooks';
import Card from '../../../../components/Card';

import './TopSelling.scss';

function TopSelling() {
  const { data = [], isLoading } = useProducts();
  const [topSelling, setTopSelling] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setTopSelling(data); 
    }
  }, [data]);

  const displayedProducts = showAll ? topSelling : topSelling.slice(0, 4);

  return (
    <div className='container'>
      <div className='top-selling-h2'>
        <h2>Top Selling</h2>
      </div>

      <div className='item-cards'>
        {isLoading ? (
          <p>Loading top selling products...</p>
        ) : (
          displayedProducts.map(product => (
            <Card key={product.id} product={product} />
          ))
        )}
      </div>

      {!showAll && (
        <div className='view-all-container'>
          <button className='view-btn' onClick={() => setShowAll(prev => !prev)}>
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>

      )}
    </div>
  );
}

export default TopSelling;
