import axios from 'axios'
export function getProductData(id){
  return axios.get("https://dummyjson.com/products/"+id).then(res=>res.data)
}

export function getProductList(){
  return axios.get("https://dummyjson.com/products").then(response => response.data.products);
}