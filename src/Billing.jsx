import React from 'react';

function Billing({ newTotal }) {
  return (
    <div className='w-80 sm:mr-1/20 mt-10 mb-10 border border-gray-300 self-center sm:self-end'>
      <div className='p-2 font-bold text-gray-600 border-b border-gray-300 border-collapse bg-gray-300'>
        Cart totals
      </div>
      <div className='flex flex-col px-2 font-semibold text-gray-600 mt-3 mb-3 gap-y-3'>
        <div>
          <div className='flex'>
            <p className='pl-2 w-1/2'>Subtotal</p>
            <p>${newTotal.toFixed(2)}</p>
          </div>
          <hr />
        </div>
        <div>
          <div className='flex'>
            <p className='pl-2 w-1/2'>Total</p>
            <p>${newTotal.toFixed(2)}</p>
          </div>
          <hr />
        </div>
        <button className="m-2 px-8 py-2 bg-red-500 rounded-md text-white font-bold">PROCEED TO CHECKOUT</button>
      </div>
    </div>
  );
}

export default Billing;