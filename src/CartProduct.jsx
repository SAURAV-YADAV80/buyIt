import React, { useState, useEffect, useMemo } from 'react';
import { getProductData } from './api';

const CartProduct = React.memo(({ id, data }) => {
  const [prod, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      const response = await getProductData(id);
      setProduct(response);
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    if (prod) {
      const itemPrice = prod.price * data;
      const storedData = JSON.parse(localStorage.getItem('cartData')) || {};
      storedData[id] = itemPrice;
      localStorage.setItem('cartData', JSON.stringify(storedData));
    }
  }, [prod, data, id]);

  const totalPrice = useMemo(() => {
    return prod ? (prod.price * data).toFixed(2) : '0.00';
  }, [prod, data]);

  if (!prod) {
    return null;
  }

  return (
    <tr className="border border-gray-300">
      <td className="px-1 py-2">
        <div className="flex items-center">
          <button className="p-4">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
              <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
            </svg>
          </button>
          <img className="w-20 h-16" src={prod.thumbnail} alt={prod.title} />
          <div>
            <p className="hidden sm:block pl-20 text-red-600 font-bold">{prod.title}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-2 font-bold text-gray-600 text-center">${prod.price}</td>
      <td className="px-4 py-2 text-center">
        <input className="w-8 border border-gray-300 text-center" type="text" value={data} readOnly />
      </td>
      <td className="px-4 py-2 font-bold text-gray-600 text-center">
        ${totalPrice}
      </td>
    </tr>
  );
});

export default CartProduct;