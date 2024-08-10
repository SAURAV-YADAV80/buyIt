import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Pageno from "./Pageno";
import SearchBar from "./SearchBar";
import ProductList from "./productList";
import { getProductData, getProductList } from "./api";
import NoMatching from "./NoMatching";
import Loading from "./loader";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";

function ProductListPage() {
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  let {page, query, sort} = params;

  page = +page || 1;
  query = query|| "";
  sort  = sort || "default";

  useEffect(() => {
    let sortType;
    let sortBy;
    if (sort === "title") {
      sortBy = "title";
    } else if (sort === "lowToHigh") {
      sortBy = "price";
    } else if (sort === "highToLow") {
      sortBy = "price";
      sortType = "desc";
    }

    getProductList(sortBy, query, page, sortType).then((products) => {
      setAllProducts(products);
      setLoading(false);
    });
  }, [sort, query, page]);

  const handleChange = (event) => 
    setSearchParams({ ...params, query: event.target.value,page:1 }, { replace: false });

  const handleSortChange = (event) => 
    setSearchParams({ ...params, sort: event.target.value }, { replace: false });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl grow px-[10%] my-16 py-16 bg-white shadow-2xl">
      <div className="flex flex-col items-start sm:justify-between sm:flex-row flex-wrap gap-y-4 mb-4">
        <SearchBar handleChange={handleChange} query={query} />
        <Dropdown handleSortChange={handleSortChange} sort={sort} />
      </div>
      {allProducts.data.length > 0 ? (
        <ProductList products={allProducts.data} />
      ) : (
        <NoMatching />
      )}
      <div className="flex gap-x-1 mt-8">
        {range(1, allProducts.meta.last_page + 1).map((pageNo) => (
          <Link
            key={pageNo}
            to={"?" + new URLSearchParams({ ...params, page: pageNo })}
            className={"px-2 " + (pageNo === page ? "bg-red-500" : "bg-blue-600")}
          >
            {pageNo}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;