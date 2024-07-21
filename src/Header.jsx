import React from "react";
import { Link } from "react-router-dom";

function Header({ count }) {
  return (<div className="w-full bg-white px-4 py-3">
    <div className="flex max-w-6xl mx-auto justify-between items-center bg-white">
      <Link to="/" className="text-gray-500 text-sm"><img class="h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20220213013322" alt="amazon-icon"/></Link>
      <div className="flex items-center">
        <Link to="/SignUp">SignUp/LogIn</Link>
        <Link to='/Cart'>
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
export default Header;