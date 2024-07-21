import React, { useState } from 'react';
import Header from "./Header";
import Product from "./Product";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import Pageno from "./Pageno";
import Allproducts from "./products";
import SearchBar from "./SearchBar";
import { Routes, Route } from "react-router-dom";
import ProdDet from "./ProdDet";
import ProductListPage from "./poductListPage";
import Cart from "./Cart";
import NotFound from './NotFound';
import LogIn from './LogIn';
import ForgotPassword from './Forgot-Password';
import SignUp from "./SignUp";


function App() {
  const savedData = JSON.parse(localStorage.getItem("cart")||"{}");
  const [cart, setCart] = useState(savedData);
  function handleAddToCart(productId, Count){
    const oldCount = cart[productId] || 0;
    const newCart = {...cart, [productId]: oldCount + Count};
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);
  }
  const count = Object.keys(cart).reduce(function(prev, curr){
    return prev+cart[curr];
  },0);
  return (
    <div className="bg-gray-200 flex flex-col min-h-screen">
      <Header count = {count}/>
      <div className="grow flex justify-center items-center">
        <Routes>
            <Route index element={<ProductListPage  />} />
            <Route path="/ProdDet/:id" element={<ProdDet onAddToCart= { handleAddToCart } />} />
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/LogIn" element={<LogIn/>} />
            <Route path="/Forgot-Password" element={<ForgotPassword/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
