import { products } from "../models/productModel.js";

export const getAllProducts = () => products;

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};
