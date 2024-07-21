import React, { useState } from 'react';
import Product from "./Product";
function ProductList({ products }) {
  return (
    <div className="md:grid grid-cols-3 gap-2 drop-shadow-lg space-y-2 md:space-y-0">
      {products.map((item) => (
        <Product key={item.id} {...item} />
      ))}
    </div>
  );
}

export default ProductList;