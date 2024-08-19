import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductData } from './api';
import Loading from './loader';
import NotFound from './NotFound';
import BackButton from './BackButton';
import { withCart } from './withProvider';

function ProdDet({ addToCart, cart }) {
  const { id } = useParams();
  const [prod, setProduct] = useState(null);
  const [count, setCount] = useState(1); // Default count
  const [loading, setLoading] = useState(true);

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

  // Set count from cart based on the product's quantity
  useEffect(() => {
    if (prod) {
      const cartItem = cart.find(item => item.product.id === +id); // Find the matching product in the cart
      const productCount = cartItem ? cartItem.quantity : 1; // Get the quantity or default to 1
      setCount(productCount);
    }
  }, [cart, prod, id]);

  function handleAddToCart() {
    addToCart(+id, count);
  }

  function incrementCount() {
    setCount(prevCount => prevCount + 1); // Ensure you're increasing the count
  }

  function decrementCount() {
    setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1)); // Ensure count doesn't go below 1
  }

  if (loading) {
    return <Loading />;
  }

  if (!prod) {
    return <NotFound />;
  }

  return (
    <div className="mt-7 self-center bg-gray-200 max-w-6xl mx-auto py-2 px-4">
      <div className="flex max-w-4xl mx-auto mt-4">
        <BackButton />
      </div>
      <div className="flex flex-col sm:flex-row bg-white rounded-md p-5 border-2 mt-3 max-w-4xl mx-auto">
        <div className="sm:w-1/2">
          <img 
            className="w-full h-auto object-cover" 
            src='https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=600' 
            alt={prod.title} 
          />
        </div>
        <div className="flex flex-col pt-5 sm:pt-0 sm:pl-5 sm:w-1/2">
          <h1 className="text-black text-xl md:text-2xl lg:text-3xl">{prod.title}</h1>
          <h2 className="text-black text-md md:text-xl lg:text-2xl font-bold">${prod.price}</h2>
          <p className="text-gray-500 text-sm sm:text-md">{prod.description}</p>
          <div className="flex flex-row items-center gap-2 mt-4">
            <div className="flex">
              <button 
                className="bg-red-300 text-white hover:bg-red-500 p-2 rounded-l-md"
                onClick={decrementCount}
              >
                -
              </button>
              <input
                className="w-16 border-2 p-1 text-center"
                type="text"
                value={count} // Displaying the count properly
                readOnly
              />
              <button 
                className="bg-red-300 text-white hover:bg-red-500 p-2 rounded-r-md"
                onClick={incrementCount}
              >
                +
              </button>
            </div>
            <button 
              className="text-white bg-red-500 px-6 py-2 rounded-md w-40 sm:w-auto" 
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 max-w-4xl mx-auto">
        {+id > 1 && (
          <Link className="text-white bg-red-500 px-3 py-1 rounded-md" to={`/ProdDet/${+id - 1}`}>
            Prev
          </Link>
        )}
        <Link className="text-white bg-red-500 px-3 py-1 rounded-md" to={`/ProdDet/${+id + 1}`}>
          Next
        </Link>
      </div>
    </div>
  );
}

export default withCart(ProdDet);