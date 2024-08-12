import React, { useEffect, useState, useMemo } from 'react';
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
import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';

import Alert from './Alert';
import AlertProvider from './providers/alertProvider';
import UserProvider from './providers/userProvider';
import CartProvider from './providers/cartProvider';


function App() {
   return (
    <div className="bg-gray-200 grow flex flex-col min-h-screen">
      <UserProvider>
        <CartProvider>
        <AlertProvider>
          <Header/>
          <div className="p-4">
              <Alert/>
          </div>
          <div className="grow flex justify-center mt-8">
            <Routes>
              <Route index element={<UserRoute><ProductListPage /></UserRoute>} />
              <Route path="/ProdDet/:id" element={<UserRoute><ProdDet /></UserRoute>} />
              <Route path="/Catalogue" element={<UserRoute><Catalogue /></UserRoute>} />
              <Route path="/LogIn" element={<AuthRoute><LogIn /></AuthRoute>} />
              <Route path="/Forgot-Password" element={<ForgotPassword />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </AlertProvider>
          </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;