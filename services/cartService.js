import {
  getCartByUserId,
  saveCart
} from '../repositories/CartRepository.js';

export const addToCartService = (userId, productId, quantity) => {
  const cart = getCartByUserId(userId);
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(userId, cart);
  return cart;
};

export const getCartService = (userId) => {
  return getCartByUserId(userId);
};

export const removeFromCartService = (userId, productId) => {
  const cart = getCartByUserId(userId);
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCart(userId, updatedCart);
  return updatedCart;
};
