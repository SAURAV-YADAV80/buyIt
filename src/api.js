import axios from 'axios'
export function getProductData(id){
  return axios.get("https://myeasykart.codeyogi.io/product/"+id).then(res=>res.data);
}

export function getProductList(sortBy, search, page, sortType){
  let params  = {};

  if(sortBy){
    params.sortBy = sortBy;
    params.sortType = sortType;
  }
  if(search){
    params.search = search;
  }
  if(page){
    params.page = page;
  }
  return axios.get("https://myeasykart.codeyogi.io/products",{
    params,
  }).then(response => response.data);
}