import React from 'react';
import { Link } from 'react-router-dom';
import ProdDet from './ProdDet';

function Product({ thumbnail, category, title, price,id }) {
  return (
    <div className="flex flex-col bg-white gap-y-1 p-3 max-w-xs">
      <div className="w-full aspect-square">
        <img src={thumbnail} className="w-full h-full object-cover" alt="prod-img" />
      </div>
      <h2 className="text-gray-500 text-xs md:text-sm lg:text-md mt-3">{category}</h2>
      <h1 className="text-black text-xs md:text-sm lg:text-md font-semibold">{title}</h1>
      <div className="flex shrink">
        <img className="h-4" src="https://img.freepik.com/free-vector/golden-star-3d_1053-79.jpg?size=626&ext=jpg" alt="star"/>
        <img className="h-4" src="https://img.freepik.com/free-vector/golden-star-3d_1053-79.jpg?size=626&ext=jpg" alt="star"/>
        <img className="h-4" src="https://img.freepik.com/free-vector/golden-star-3d_1053-79.jpg?size=626&ext=jpg" alt="star"/>
        <img className="h-4" src="https://img.freepik.com/free-vector/golden-star-3d_1053-79.jpg?size=626&ext=jpg" alt="star"/>
        <img className="h-4" src="https://img.freepik.com/free-vector/golden-star-3d_1053-79.jpg?size=626&ext=jpg" alt="star"/>
      </div>
      <div className="text-xs font-semibold">$ {price}</div>
      <Link to={`/ProdDet/${id}`} className="text-xs text-blue-600">View Details...</Link>
    </div>
  );
}
export default Product;