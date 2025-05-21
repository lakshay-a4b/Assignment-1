import * as ProductRepository from '../repositories/ProductRepository.js';

export const fetchPaginatedProducts = (page = 1, limit = 5) => {
  const allProducts = ProductRepository.getAllProducts();
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

export const fetchProductById = (id) => {
  return ProductRepository.getProductById(id);
};

export const createProduct = (product) => {
  return ProductRepository.createProduct(product);
}

export const updateProduct = (id, product) => {
  return ProductRepository.updateProduct(id, product);
}

export const deleteProduct = (id) => {
 return ProductRepository.deleteProduct(id);
}