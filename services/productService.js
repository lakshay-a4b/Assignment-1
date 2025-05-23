import * as ProductRepository from '../repositories/ProductRepository.js';

export const fetchPaginatedProducts = async (page = 1, limit = 5) => {
  const allProducts = await ProductRepository.getAllProducts();
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginated = allProducts.slice(startIndex, endIndex);

  return {
    products: paginated,
    total: allProducts.length,
    page,
    limit
  };
};

export const fetchProductById = async (id) => {
  return await ProductRepository.getProductById(id);
};

export const createProduct = async (product) => {
  return await ProductRepository.createProduct(product);
}

export const updateProduct = async (id, product) => {
  return await ProductRepository.updateProduct(id, product);
}

export const deleteProduct = async (id) => {
 return await ProductRepository.deleteProduct(id);
}