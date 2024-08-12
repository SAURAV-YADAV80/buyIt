import {useEffect, useState} from 'react';
import {CartContext} from '../Contexts';
import {withUser} from '../withProvider';
import { saveCart,getCart } from '../api';

function CartProvider({user,children}){
  const [cart, setCart] = useState([]);

  useEffect(function(){
    if(!user){
      const savedData = JSON.parse(localStorage.getItem("cart") || "{}");
      setCart(savedData);
      } else{
        getCart().then(function(cart){
          setCart(cart);
        });
      }
  },[user])
  function updateCart(newCart) {
    setCart(newCart);
    if(!user){
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);
    } else {
      saveCart(newCart);
    }
  }

  function addToCart(productId, count) {
    const newCart = { ...cart, [productId]: count };
    updateCart(newCart);
  }
  const countCart = Object.keys(cart).reduce((prev, curr) => prev + cart[curr], 0);
  return (
    <CartContext.Provider value={{ cart, countCart, updateCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default withUser(CartProvider);