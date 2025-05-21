import * as ProductService from '../services/productService.js';

export const getAllProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const result = ProductService.fetchPaginatedProducts(page, limit);
  res.json(result);
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = ProductService.fetchProductById(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

export const getProductByIdSync = (id) => {
  const product = ProductService.fetchProductById(id);

  if (!product) {
    return null;
  }
  return product;
}
