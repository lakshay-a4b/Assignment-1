import * as ProductRepository from "../repositories/ProductRepository.js";
import redisClient from "../config/redisClient.js";

export const fetchPaginatedProducts = async (page = 1, limit = 5) => {
  try {
    const offset = (page - 1) * limit;
    const cacheKey = `product:${page}:${limit}`;

    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
      return JSON.parse(cachedProduct);
    }

    const [products, total] = await Promise.all([
      ProductRepository.getPaginatedProducts(limit, offset),
      ProductRepository.getTotalProductCount(),
    ]);

    if (products) {
      await redisClient.setEx(
        cacheKey,
        3600,
        JSON.stringify({
          products,
          total,
          page,
          limit,
        })
      );
    }

    return {
      products,
      total,
      page,
      limit,
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
    const cacheKey = `product:1:2`;
    await redisClient.del(cacheKey);
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