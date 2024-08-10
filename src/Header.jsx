import React from "react";
import { Link } from "react-router-dom";
import {memo} from 'react';
import withUser from "./withUser";

function Header({ count,user,setUser}) {
  function handleLogout(){
    localStorage.removeItem("token");
    
    setUser(undefined);
  }
  console.log('header',user);
  return (<div className="z-10 fixed w-full bg-white px-4 py-1">
    <div className="flex max-w-6xl mx-auto justify-between items-center bg-white">
      <div className="flex flex-col md:flex-row">
        <Link to="/" className="text-gray-500 text-sm"><img class="h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20220213013322" alt="amazon-icon"/></Link>
        {user && <h1 className="md:ml-4 text-xl text-gray-600">Hey, {user.full_name}</h1>}
      </div>
      <div className="flex items-center">
        {!user && <Link to="/SignUp" className="bg-gray-500 rounded-md p-2">SignUp/LogIn</Link>}
        {user && <button onClick={handleLogout} className="bg-gray-500 rounded-md p-2 ml-4">Logout</button>}
        <Link to='/Catalogue'>
              <div className="relative">
                  <svg className="w-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512                   512"><path d="M351.9        329.506H206.81l-3.072-12.56H368.16l26.63-116.019-217.23-26.04-9.952-58.09h-50.4v21.946h31.894l35.233 191.246a32.927 32.927 0 1 0 36.363 21.462h100.244a32.825 32.825 0 1 0 30.957-21.945zM181.427 197.45l186.51 22.358-17.258 75.195H198.917z" data-name="Shopping Cart"/></svg>
          <p className="absolute bottom-9 right-4 text-black" >{count}</p>
        </div>
            </Link>
      </div>
    </div>
  </div>
  );
}
const newHeader = memo(Header);
export default withUser(newHeader);