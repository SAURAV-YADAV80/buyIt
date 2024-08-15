import React, { useEffect, useState } from "react";
import LogueItem from "./LogueItem";
import BackButton from "./BackButton";
import { withCart } from "./withProvider";

function CatalogueList({ cart, updateCart }) {
  const [quantityMap, setQuantityMap] = useState([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    // Create a map with product, id, and quantity from cart
    const map = cart.map((cartItem) => ({
      id: cartItem.product.id,
      product: cartItem.product,
      quantity: cartItem.quantity,
    }));
    setQuantityMap(map);
  }, [cart]);

  const handleRemove = (productId) => {
    const newQuantityMap = quantityMap.filter((item) => item.id !== productId);
    setQuantityMap(newQuantityMap);
    updateCart(newQuantityMap);
  };

  const handleChange = (newQuantity, productId) => {
    setDirty(true);
    const newQuantityMap = quantityMap.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setQuantityMap(newQuantityMap);
  };

  const handleUpdate = () => {
    updateCart(quantityMap);
    setDirty(false);
  };

  const classText = dirty ? " text-white bg-red-500 " : " text-gray-200 bg-red-200 ";

  return (
    <div className="w-90p mx-1/20 mt-4">
      <BackButton />
      <header className="flex justify-between bg-gray-300 py-2 mt-4 font-bold text-gray-600">
        <span className="w-40p sm:w-50p text-center">Product</span>
        <span className="w-20p text-center">Price</span>
        <span className="w-20p text-center hidden sm:block">Quantity</span>
        <span className="w-20p text-center pr-4 sm:hidden">Qty.</span>
        <span className="w-[15%] text-start hidden sm:block">Subtotal</span>
      </header>
      <div className="border-collapse">
        {quantityMap.map((cartItem) => (
          <LogueItem
            key={cartItem.id}
            quantity={cartItem.quantity}
            product={cartItem.product}
            onRemove={handleRemove}
            onChange={handleChange}
          />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center border">
        <div className="self-start">
          <input
            type="text"
            className="m-2 max-w-28 p-2 border border-gray-300 rounded"
            placeholder="Coupon Code"
          />
          <button className="m-2 px-8 py-2 bg-red-500 rounded-md text-white font-bold hover:bg-red-600">
            APPLY COUPON
          </button>
        </div>
        <button
          onClick={handleUpdate}
          className={"m-2 px-8 py-2 rounded-md font-bold self-start" + classText}
        >
          UPDATE CART
        </button>
      </div>
    </div>
  );
}

export default withCart(CatalogueList);