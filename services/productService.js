import * as ProductRepository from '../repositories/ProductRepository.js';

export const fetchPaginatedProducts = async (page = 1, limit = 5) => {
  try {
    const offset = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductRepository.getPaginatedProducts(limit, offset),
      ProductRepository.getTotalProductCount()
    ]);

    return {
      products,
      total,
      page,
      limit
    };
  } catch (error) {
    console.error("Service error: fetchPaginatedProducts failed:", error);
    throw new Error("Failed to fetch paginated products");
  }
};

export const fetchProductById = async (id) => {
  try {
    const product = await ProductRepository.getProductById(id);
    return product;
  } catch (error) {
    console.error("Error in fetchProductById:", error);
    throw new Error("Failed to fetch product");
  }
};

export const createProduct = async (product) => {
  try {
    return await ProductRepository.createProduct(product);
  } catch (error) {
    console.error("Error in createProduct:", error);
    throw new Error("Failed to create product");
  }
};

export const updateProduct = async (id, product) => {
  try {
    return await ProductRepository.updateProduct(id, product);
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    return await ProductRepository.deleteProduct(id);
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    throw new Error("Failed to delete product");
  }
};