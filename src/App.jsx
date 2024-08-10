import React, { useEffect, useState, useMemo, createContext } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";
import ProdDet from "./ProdDet";
import ProductListPage from "./poductListPage";
import Catalogue from "./Catalogue";
import NotFound from './NotFound';
import LogIn from './LogIn';
import ForgotPassword from './Forgot-Password';
import SignUp from "./SignUp";
import axios from 'axios';
import Loading from './loader';
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import Alert from './Alert';

export const UserContext = createContext();
export const AlertContext = createContext();

function App() {
  const savedData = JSON.parse(localStorage.getItem("cart") || "{}");
  const [cart, setCart] = useState(savedData);
  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('info');
  const [alertMessage, setAlertMessage] = useState('');

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("https://myeasykart.codeyogi.io/me", {
        headers: { Authorization: token },
      })
        .then((response) => {
          setUser(response.data);
          setLoadingUser(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoadingUser(false);
        });
    } else {
      setLoadingUser(false);
    }
  }, [token]);

  function updateCart(newCart) {
    setCart(newCart);
    const cartString = JSON.stringify(newCart);
    localStorage.setItem('cart', cartString);
  }

  function handleAddToCart(productId, count) {
    const oldCount = cart[productId] || 0;

    if (oldCount > count) {
      triggerAlert('warning', 'Product removed from cart');
    } else if (oldCount < count) {
      triggerAlert('success', 'Product added to cart');
    } else {
      triggerAlert('info', 'Product remains the same');
    }

    const newCart = { ...cart, [productId]: count };
    updateCart(newCart);
  }

  function triggerAlert(type, message) {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
  }

  function handleClose() {
    setAlertVisible(false);
  }

  const count = useMemo(() => {
    return user ? Object.keys(cart).reduce((prev, curr) => prev + cart[curr], 0) : 0;
  }, [cart, user]);

  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-200 grow flex flex-col min-h-screen">
      <UserContext.Provider value={{ user, setUser }}>
        <AlertContext.Provider value={{ alertVisible, alertType, alertMessage, setAlertMessage, setAlertVisible, setAlertType }}>
          <Header count={count} />
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
              <Route path="/ProdDet/:id" element={<UserRoute><ProdDet onAddToCart={handleAddToCart} cart={cart} /></UserRoute>} />
              <Route path="/Catalogue" element={<UserRoute><Catalogue cart={cart} updateCart={updateCart} /></UserRoute>} />
              <Route path="/LogIn" element={<AuthRoute><LogIn /></AuthRoute>} />
              <Route path="/Forgot-Password" element={<ForgotPassword />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </AlertContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;