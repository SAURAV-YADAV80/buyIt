import React,{useContext} from 'react';
import {AlertContext} from './App';

function LogueItem({ id,price,no,title,cart,updateCart,setLocalCart,localCart,setDirty }){
  const {setAlertVisible,setAlertType,setAlertMessage} = useContext(AlertContext);

  function handleRemove(productId){
    console.log('item remove', productId);
    let newCart = {...cart};
    delete newCart[productId];
    setAlertMessage('Item removed from cart');
    setAlertType('warning');
    setAlertVisible(true);
    setLocalCart(newCart);
    updateCart(newCart);
  }

  function handleChange(newVal, productId){
    setDirty(true);
    const newLocalCart = {...localCart, [productId]: newVal};
    setLocalCart(newLocalCart);
  }
  return(
    <div className='flex justify-between items-center bg-white sm:bg-white border-gray-300 border-b border-collapse'>
      <span className='flex items-center w-40p sm:w-50p text-center'>
        <button className="p-4" onClick={function (){
            handleRemove(id);
            }}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
            <path d="M 25 2 C 12.309534 2 2 12.309534 2 25 C 2 37.690466 12.309534 48 25 48 C 37.690466 48 48 37.690466 48 25 C 48 12.309534 37.690466 2 25 2 z M 25 4 C 36.609534 4 46 13.390466 46 25 C 46 36.609534 36.609534 46 25 46 C 13.390466 46 4 36.609534 4 25 C 4 13.390466 13.390466 4 25 4 z M 32.990234 15.986328 A 1.0001 1.0001 0 0 0 32.292969 16.292969 L 25 23.585938 L 17.707031 16.292969 A 1.0001 1.0001 0 0 0 16.990234 15.990234 A 1.0001 1.0001 0 0 0 16.292969 17.707031 L 23.585938 25 L 16.292969 32.292969 A 1.0001 1.0001 0 1 0 17.707031 33.707031 L 25 26.414062 L 32.292969 33.707031 A 1.0001 1.0001 0 1 0 33.707031 32.292969 L 26.414062 25 L 33.707031 17.707031 A 1.0001 1.0001 0 0 0 32.990234 15.986328 z"></path>
          </svg>
        </button>
        <img className="w-20 h-16 py-[4px]" src='https://www.invoicera.com/wp-content/uploads-webpc/uploads/2023/11/default-image.jpg.webp' alt={title} />
        <p className="hidden w-[50%] sm:block pl-20 text-red-600 font-bold">{title}</p>
      </span>
      <span className='w-20p text-center flex items-center justify-center'>${price}</span>
      <div className='w-20p flex justify-center'>
        <input  className='w-10 h-6 text-center flex justify-center items-center border-gray-200 border' type="number" value={no} onChange={function (event){
          handleChange(+event.target.value, id)
          }}/>
      </div>
      <span className='w-20p text-center flex items-center justify-center  hidden sm:block'>${(price*no).toFixed(2)}</span>
    </div>
  )
}

export default LogueItem;