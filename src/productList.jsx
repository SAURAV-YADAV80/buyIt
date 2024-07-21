import React, { useState } from 'react';
import Header from "./Header";
import Product from "./Product";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Pageno from "./Pageno";
import Allproducts from "./products";
import SearchBar from "./SearchBar";
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