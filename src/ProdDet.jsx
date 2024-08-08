import React, { useState, useEffect, createContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductData } from './api';
import Loading from './loader';
import NotFound from './NotFound';
import BackButton from './BackButton';
import { AlertContext } from './App'

function ProdDet({ onAddToCart, cart }) {
  const { id } = useParams();
  const [prod, setProduct] = useState(null);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);

  const {} = createContext(AlertContext);

  useEffect(() => {
    setLoading(true);
    getProductData(+id)
      .then((product) => {
        setProduct(product);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (prod) {
      setCount(cart[id] || 0);
    }
  }, [cart, prod, id]);

  function handleAddToCart() {
    onAddToCart(+id, count);
  }

  function handleCount(event) {
    setCount(+event.target.value);
  }

  if (loading) {
    return <Loading />;
  }

  if (!prod) {
    return <NotFound />;
  }

  return (
    <div className="bg-gray-200 max-w-6xl mx-auto py-2 px-4">
      <div className="flex max-w-4xl mx-auto">
        <BackButton />
      </div>
      <div className="flex bg-white rounded-md flex-col sm:flex-row p-5 border-2 mt-3 max-w-4xl mx-auto">
        <div className="sm:w-1/2">
          <img className="w-full min-h-48 aspect-square object-cover" src={prod.thumbnail} alt={prod.title} />
        </div>
        <div className="flex flex-col pt-5 sm:pt-0 sm:pl-5 min-w-2/3 gap-y-3 sm:w-1/2">
          <h1 className="text-black text-xl md:text-2xl lg:text-3xl">{prod.title}</h1>
          <h2 className="text-black text-md md:text-xl lg:text-2xl font-bold">${prod.price}</h2>
          <p className="text-gray-500 text-sm sm:text-md">{prod.description}</p>
          <div className="flex flex-row items-center gap-2">
            <input
              className="w-16 border-2 border-gray-200 p-1"
              type="number"
              value={count}
              onChange={handleCount}
            />
            <button className="text-white bg-red-500 px-6 py-2 rounded-md" onClick={handleAddToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2 max-w-4xl mx-auto">
        <div>
          {+id > 1 && (
            <Link className="text-white bg-red-500 px-3 py-1 rounded-md" to={`/ProdDet/${+id - 1}`}>
              Prev
            </Link>
          )}
        </div>
        <Link className="text-white bg-red-500 px-3 py-1 rounded-md" to={`/ProdDet/${+id + 1}`}>
          Next
        </Link>
      </div>
    </div>
  );
}

export default ProdDet;