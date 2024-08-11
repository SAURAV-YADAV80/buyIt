import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import ProductList from "./productList";
import { getProductList } from "./api";
import NoMatching from "./NoMatching";
import Loading from "./loader";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";

function ProductListPage() {
  const [allProducts, setAllProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  let [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);

  let { page, query, sort } = params;

  page = +page || 1;
  query = query || "";
  sort = sort || "default";

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
    setSearchParams({ ...params, query: event.target.value, page: 1 }, { replace: false });

  const handleSortChange = (event) =>
    setSearchParams({ ...params, sort: event.target.value }, { replace: false });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl flex flex-col items-center mx-auto px-4 sm:px-6 my-16 py-12 bg-white shadow-2xl rounded-lg">
      <div className="w-full flex flex-col sm:flex-row sm:justify-end items-center mb-8">
        <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 sm:justify-end">
          <div className="flex-grow sm:w-1/2">
            <SearchBar handleChange={handleChange} query={query} />
          </div>
          <div className="flex-grow sm:w-1/2 mt-4 sm:mt-0">
            <Dropdown handleSortChange={handleSortChange} sort={sort} />
          </div>
        </div>
      </div>
      <div className="flex-grow w-full min-h-[60vh] flex items-center justify-center">
        {allProducts?.data.length > 0 ? (
          <ProductList products={allProducts.data} />
        ) : (
          <NoMatching />
        )}
      </div>
      <div className="flex justify-center gap-x-1 mt-8">
        {range(1, allProducts.meta.last_page + 1).map((pageNo) => (
          <Link
            key={pageNo}
            to={"?" + new URLSearchParams({ ...params, page: pageNo })}
            className={`px-3 py-1 rounded ${
              pageNo === page ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            } transition-colors duration-150`}
          >
            {pageNo}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;