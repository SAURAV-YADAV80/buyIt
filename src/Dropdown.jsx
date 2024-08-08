import React from "react";
import { memo } from 'react';

function Dropdown({handleSortChange, sort}) {
  return (
    <div>
      <select className="text-xs py-1 pl-1 rounded-md shrink" name="sort" id="def-sorting" onChange={handleSortChange} value={sort}>
        <option value="default">Default sorting</option>
        <option value="title">Sort by Name</option>
        <option value="price+">price: low to high</option>
        <option value="price-">price: high to low</option>
      </select>
    </div>
  );
}
const newDrop = memo(Dropdown);
export default newDrop;