import { products } from "../models/productModel.js";

export const getAllProducts = () => products;

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const createProduct = (product) => {
  const newProduct = { id: products.length + 1, ...product };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, product) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return null;
  }
  products[index] = { ...products[index], ...product };
  return products[index];
};

export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return null;
  }
  const deletedProduct = products.splice(index, 1);
  return deletedProduct[0];
};