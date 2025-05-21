import {
  addToCartService,
  getCartService,
  removeFromCartService
} from '../services/cartService.js';
import { getProductByIdSync } from './productController.js';

export const addToCart = async (req, res) => {
  const userId = req.user.user_id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Product ID and quantity are required' });
  }

  try {
    const product = getProductByIdSync(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await addToCartService(userId, productId, quantity);
    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const cart = await getCartService(userId);
    res.status(200).json({ cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.user_id;
  const productId = parseInt(req.params.productId);

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const cart = await removeFromCartService(userId, productId);
    res.status(200).json({ message: 'Product removed from cart', cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
