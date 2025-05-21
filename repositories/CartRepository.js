import { cartStore } from '../models/cartModel.js';

export const getCartByUserId = (userId) => {
  return cartStore.get(userId) || [];
};

export const saveCart = (userId, cart) => {
  cartStore.set(userId, cart);
};

export const clearUserCart = (userId) => {
  cartStore.delete(userId);
}

