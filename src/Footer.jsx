import React from "react";
import {memo} from 'react';
function Footer(){
  return (
    <div className="w-full bg-gray-400 px-4 py-2">
      <div class="flex bg-gray-400 mx-auto max-w-6xl py-4 justify-between text-xs text-black">
        <h1>
          Copyright © 2022 | Saurav
        </h1>
        <h1>
          Powered by Saurav Yadav
        </h1>
      </div>
    </div>
  );
}
const newFooter = memo(Footer);
export default newFooter;