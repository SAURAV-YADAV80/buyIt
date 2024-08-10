import React, { useEffect, useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import ProdDet from "./ProdDet";
import ProductListPage from "./poductListPage";
import Catalogue from "./Catalogue";
import NotFound from './NotFound';
import LogIn from './LogIn';
import ForgotPassword from './Forgot-Password';
import SignUp from "./SignUp";;
import { useMemo } from 'react';
import axios from 'axios';
import Loading from './loader';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import {createContext} from 'react';
import Alert from './Alert';

export const UserContext = createContext();
export const AlertContext = createContext();
function App() {
  const savedData = JSON.parse(localStorage.getItem("cart")||"{}");
  const [cart, setCart] = useState(savedData);
  const [user,setUser] = useState();
  const [loadingUser,setLoadingUser] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMessage, setAlertMessage] = useState('');
  function handleAddToCart(productId, Count){
    const oldCount = cart[productId] || 0;
    if(oldCount>Count){
      setAlertType("warning");
      setAlertMessage("product removed from cart");
    } else if(oldCount<Count){
        setAlertType("success");
        setAlertMessage("product added from cart");
      }
    else{
      setAlertType("info");
      setAlertMessage("product remain same");
    }
    setAlertVisible(true);
    const newCart = {...cart, [productId]: Count};
    updateCart(newCart);
  }

  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token){
      axios.get("https://myeasykart.codeyogi.io/me",{headers:{Authorization:token,
        },}).then((Response) => {
           setUser(Response.data);
        setLoadingUser(false);
        }).catch(()=>{
        localStorage.removerItem("token");
        setLoadingUser(false);
        });
    } else{
      setLoadingUser(false);
    }
  },[]);
  function updateCart(newCart){
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);  
  }

  function handleClose() {
    setAlertVisible(false);
  }
  
  let count = useMemo(() => {
    return Object.keys(cart).reduce((prev, curr) => prev + cart[curr], 0);
  }, [cart]);
  if(!user){
    count=0;
  }

  if(loadingUser){
    return(
      <div className='flex justify-center items-center h-[100vh]'>
        <Loading/>
      </div>
    )
  }
  return (
    <div className="bg-gray-200 grow flex flex-col min-h-screen">
      <UserContext.Provider value={{user,setUser}}>
        <AlertContext.Provider value={{alertVisible,alertType,alertMessage,setAlertMessage,setAlertVisible,setAlertType}}>
      <Header count = {count}/>
        <div className="p-4">
          {alertVisible && (
            <Alert
              type={alertType}
              message={alertMessage}
              onClose={handleClose}
            />
          )}
        </div>
      <div className="grow flex justify-center mt-8">
        <Routes>
            <Route index element={<UserRoute><ProductListPage /></UserRoute>} />
            <Route path="/ProdDet/:id" element={<UserRoute ><ProdDet onAddToCart= { handleAddToCart } cart={cart} /></UserRoute>} />
            <Route path="/Catalogue" element={<UserRoute><Catalogue cart={cart} updateCart={updateCart}  /></UserRoute>} />
            <Route path="/LogIn" element={<AuthRoute><LogIn /></AuthRoute>} />
            <Route path="/Forgot-Password" element={<ForgotPassword/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
      <Footer />
        </AlertContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
