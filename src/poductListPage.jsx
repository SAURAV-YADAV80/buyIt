import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from "./Header";
import Product from "./Product";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Pageno from "./Pageno";
import SearchBar from "./SearchBar";
import ProductList from "./productList";
import { getProductList } from './api';
import NoMatching from './NoMatching';
import Loading from './loader';

function ProductListPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    getProductList().then(products => {
      setAllProducts(products);
      setLoading(false);
    });
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "price+") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [allProducts, query, sort]);

  const handleChange = useCallback((event) => setQuery(event.target.value), []);
  const handleSortChange = useCallback((event) => setSort(event.target.value), []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-6xl grow mx-auto px-[10%] my-16 py-16 bg-white shadow-2xl">
      <div className="flex flex-col items-start sm:justify-between sm:flex-row flex-wrap gap-y-4 mb-4">
        <SearchBar handleChange={handleChange} query={query} />
        <Dropdown handleSortChange={handleSortChange} sort={sort} />
      </div>
      {filteredAndSortedProducts.length > 0 ? (
        <ProductList products={filteredAndSortedProducts} />
      ) : (
        <NoMatching />
      )}
      <div className="flex gap-x-1 mt-8">
        <Pageno no="1" />
        <Pageno no="2" />
        <Pageno no="→" />
      </div>
    </div>
  );
}

export default ProductListPage;