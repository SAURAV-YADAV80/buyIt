import React from 'react';
import Product from './Product';

function ProductList({ products }) {
  const isSingleProduct = products.length === 1;

  return (
    <div className={`flex ${isSingleProduct ? 'justify-center' : ''}`}>
      <div
        className={`grid gap-4 ${isSingleProduct ? 'place-items-center' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`}
      >
        {products.map((item) => (
          <Product
            key={item.id}
            title={item.title}
            category={item.category}
            thumbnail={'https://www.invoicera.com/wp-content/uploads-webpc/uploads/2023/11/default-image.jpg.webp'}
            price={item.price}
            id={item.id}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;