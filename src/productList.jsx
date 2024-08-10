import React from 'react';
import Product from "./Product";

function ProductList({ products }) {
  return (
    <div className="md:grid grid-cols-3 gap-2 drop-shadow-lg space-y-2 md:space-y-0">
      {products.map((item) => (
        <Product
          key={item.id}
          title={item.title}
          category={item.category}
          thumbnail='https://www.invoicera.com/wp-content/uploads-webpc/uploads/2023/11/default-image.jpg.webp'
          price={item.price}
          id={item.id}
        />
      ))}
    </div>
  );
}

export default ProductList;