import React from 'react';
import CartProduct from './CartProduct';
import BackButton from './BackButton';
import { useMemo } from 'react';

function Cart() {
  const savedData = JSON.parse(localStorage.getItem("cart") || "{}");
  const price = JSON.parse(localStorage.getItem("cartData") || "{}");

  const totalMoney = useMemo(() => {
    return Object.keys(price).reduce((prev, curr) => prev + price[curr], 0).toFixed(2);
  }, [price]);

  return (
    <section className="my-5 bg-white mx-auto w-12/12 sm:w-11/12 p-4">
      <header className="mx-auto w-11/12">
        <BackButton/>
        <div className="overflow-scroll">
          <table className="my-8 w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(savedData).map(([key]) => (
                <CartProduct id={key} data={savedData[key]} />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="px-4 py-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <input type="text" className="m-2 max-w-28 p-2 border border-gray-300 rounded" placeholder="Coupon Code" />
                      <button className="m-2 px-8 py-2 bg-red-500 rounded-md text-white font-bold">APPLY COUPON</button>
                    </div>
                    <button className="m-2 px-8 py-2 bg-red-500 rounded-md text-gray-500 font-bold">UPDATE CART</button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <article className="mt-4 flex flex-col border-collapse w-9/12 sm:w-4/12 border border-gray-300 justify-self-end overflow-scroll">
          <header className="p-4 bg-gray-200 border border-gray-300 font-bold text-gray-600">Cart totals</header>
          <section className="flex flex-col gap-y-2 p-6 font-semibold text-gray-500">
            <div className="flex gap-x-10">
              <span>Subtotal</span>
              <span>{totalMoney}</span>
            </div>
            <hr />
            <div className="flex gap-x-16">
              <span>Total</span>
              <span>{totalMoney}</span>
            </div>
            <hr />
          </section>
          <button className="m-2 px-8 py-2 bg-red-500 rounded-md text-white font-bold">PROCEED TO CHECKOUT</button>
        </article>
      </header>
    </section>
  );
}

export default Cart;