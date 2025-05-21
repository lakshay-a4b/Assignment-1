import {
  addToCartService,
  getCartService,
  removeFromCartService
} from '../services/cartService.js';
import { getProductByIdSync } from './productController.js';

export const addToCart = (req, res) => {
  const userId = req.user.user_id;
  const { productId, quantity } = req.body;

  const product = getProductByIdSync(productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const cart = addToCartService(userId, productId, quantity);
  res.status(200).json({ message: 'Product added to cart', cart });
};

export const getCart = (req, res) => {
  const userId = req.user.user_id;
  const cart = getCartService(userId);
  res.status(200).json({ cart });
};

export const removeFromCart = (req, res) => {
  const userId = req.user.user_id;
  const productId = parseInt(req.params.productId);

  const cart = removeFromCartService(userId, productId);
  res.status(200).json({ message: 'Product removed from cart', cart });
};
