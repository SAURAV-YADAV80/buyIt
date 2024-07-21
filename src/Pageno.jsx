import React from "react";

function Pageno(data){
  return (
    <button class="flex h-8 w-8 bg-red-600 justify-center items-center text-xs text-white border-2 border-red-600 hover:bg-white hover:text-red-600">
      {data.no}
    </button>
  );
}

export default Pageno;