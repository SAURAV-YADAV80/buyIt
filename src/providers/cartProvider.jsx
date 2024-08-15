import { useState, useEffect } from "react";
import { CartContext } from "../Contexts";
import { withUser } from "../withProvider";
import { saveCart, getCart, getProductsByIds } from "../api";

function CartProvider({ isLoggedIn, children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (isLoggedIn) {
      getCart().then((cart) => {
        setCart(cart);
        setLoading(false);
      });
    } else {
      const savedData = JSON.parse(localStorage.getItem("cart") || "{}");
      getProductsByIds(Object.keys(savedData)).then((products) => {
        const savedCart = products.map((p) => ({
          product: p,
          quantity: savedData[p.id],
        }));
        setCart(savedCart);
        setLoading(false);
      });
    }
  }, [isLoggedIn]);

  function updateCart(newCart) {
    setCart(newCart);
    setDirty(false);
    if (!isLoggedIn) {
      const cartString = JSON.stringify(
        newCart.reduce((acc, curr) => ({ ...acc, [curr.product.id]: curr.quantity }), {})
      );
      localStorage.setItem("cart", cartString);
    } else {
      saveCart(newCart);
    }
  }

  function addToCart(productId, newCount) {
    if (!isLoggedIn) {
      // Non-logged in user
      const newCart = [...cart];
      const product = newCart.find((p) => p.product.id === productId);
      if (product) {
        product.quantity = newCount;
      } else {
        getProductsByIds([productId]).then((products) => {
          newCart.push({
            product: products[0],
            quantity: newCount,
          });
          updateCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        });
      }
    } else {
      // Logged in user
      console.log('logged in baale ne add kia');
      getProductsByIds([productId]).then((products) => {
        const newCart = [...cart];
        const product = newCart.find((p) => p.product.id === productId);
        if (product) {
          console.log('same prod');
          product.quantity = newCount;
        } else {
          console.log('newPRod');
          newCart.push({
            product: products[0],
            quantity: newCount,
          });
        }
        console.log('newcart after changes',newCart);
        saveCart(newCart); 
        updateCart(newCart);
      });
    }
  }

  function removeFromCart(productId) {
    const newCart = cart.filter((item) => item.product.id !== productId);
    updateCart(newCart);
  }

  function handleChange(newVal, productId) {
    setDirty(true);
    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: newVal };
      }
      return item;
    });
    updateCart(newCart);
  }

  const countCart = cart.reduce((prev, curr) => prev + curr.quantity, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{ cart, countCart, updateCart, addToCart, removeFromCart, handleChange }}>
      {children}
    </CartContext.Provider>
  );
}

export default withUser(CartProvider);