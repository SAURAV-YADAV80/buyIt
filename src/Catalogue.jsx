import React, { useEffect, useState, useContext } from 'react';
import LogueItem from './LogueItem';
import Billing from './Billing';
import BackButton from './BackButton';
import {getProductData} from './api';
import Loading from './loader';
import {AlertContext} from './App';

function Catalogue({ cart,updateCart}) {
  
  const {setAlertVisible, setAlertType, setAlertMessage} = useContext(AlertContext);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [localCart, setLocalCart] = useState(cart);
  const productIds = Object.keys(cart);
  
  useEffect(() => {
    setLoading(true);
    const myProductPromise = productIds.map(id => getProductData(id));
    Promise.all(myProductPromise).then(products => {
      setProducts(products);
      setLoading(false);
    });
  }, [cart]);

  useEffect(function (){
    setLocalCart(cart);
  }, [cart]);
  
  if(loading){
    return <Loading/>
  }
  function handleUpdate(){
    updateCart(localCart);
    setAlertMessage('cart updated sauccessfully!');
    setAlertType('success');
    setAlertVisible(true);
    setDirty(false);
  }
  let classText = ' text-gray-200 bg-red-200 ';
  if (dirty){
    classText = ' text-white bg-red-500 '
    console.log('cart needs to be updated');
  }
  const newTotal = products.reduce((acc, p) => acc + cart[p.id] * p.price, 0);
  return (
    <div className='w-11/12 bg-white overflow-auto'>
      <div className='h-[70vh] flex flex-col items-end'>
        <div className='self-start ml-1/20 mt-10'>
          <BackButton/>
        </div>
        <div className='w-90p mx-1/20 mt-4 border-gray-300 border-l border-r'>
          <header className='flex justify-between bg-gray-300 py-2 font-bold text-gray-600'>
            <span className='w-40p sm:w-50p text-center'>Product</span>
            <span className='w-20p text-center'>Price</span>
            <span className='w-20p text-center hidden sm:block'>Quantity</span>
            <span className='w-20p text-center pr-4 sm:hidden'>Qty.</span>
            <span className='w-20p text-center  hidden sm:block'>Subtotal</span>
          </header>
          <div className='border-collapse'>
            {products.map(function(p){
              return <LogueItem key={p.id} id={p.id} loading={loading} setLoading={setLoading} title={p.title} no={localCart[p.id]} price={p.price} cart={cart} updateCart={updateCart} localCart={localCart} setLocalCart={setLocalCart}
                       setDirty={setDirty}/>
            })}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-b">
            <div className='self-start'>
              <input type="text" className="m-2 max-w-28 p-2 border border-gray-300 rounded" placeholder="Coupon Code" />
              {console.log('this is apllied',{classText})}
              <button className="m-2 px-8 py-2 bg-red-500 rounded-md text-white font-bold">APPLY COUPON</button>
            </div>
            <button onClick={handleUpdate} className={"m-2 px-8 py-2 rounded-md font-bold self-start" + classText}
>UPDATE CART</button>
          </div>
        </div>
        <Billing newTotal={newTotal} />
      </div>
    </div>
  );
}

export default Catalogue;