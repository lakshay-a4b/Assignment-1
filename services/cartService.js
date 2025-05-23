import {
  getCartByUserId,
  createOrUpdateCart,
  updateCartProducts,deleteCart
} from '../repositories/CartRepository.js';

export const addToCartService = async (userId, product) => {
  try {
    const { productId, quantity } = product;

    if (!productId || !quantity || quantity < 1) {
      throw new Error("Invalid product ID or quantity");
    }

    const cart = await getCartByUserId(userId);
    let updatedProducts = [];

    if (cart) {
      updatedProducts = [...cart.productInfo];
      const existingProductIndex = updatedProducts.findIndex(
        (p) => p.productId === productId
      );

      if (existingProductIndex >= 0) {
        updatedProducts[existingProductIndex].quantity += quantity;
      } else {
        updatedProducts.push({ productId, quantity });
      }
    } else {
      updatedProducts = [{ productId, quantity }];
    }

    return await createOrUpdateCart(userId, updatedProducts);
  } catch (error) {
    console.error(`Error in addToCartService (userId: ${userId}):`, error);
    throw new Error("Failed to add product to cart");
  }
};

export const removeFromCartService = async (userId, productId) => {
  try {
    const cart = await getCartByUserId(userId);
    if (!cart) throw new Error("Cart not found");

    let updatedProducts = [...cart.productInfo];
    const productIndex = updatedProducts.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex === -1) throw new Error("Product not found in cart");

    if (updatedProducts[productIndex].quantity > 1) {
      updatedProducts[productIndex].quantity -= 1;
    } else {
      updatedProducts.splice(productIndex, 1);
    }

    return await updateCartProducts(userId, updatedProducts);
  } catch (error) {
    console.error(`Error in removeFromCartService (userId: ${userId}, productId: ${productId}):`, error);
    throw new Error("Failed to remove product from cart");
  }
};

export const getCartService = async (userId) => {
  try {
    return await getCartByUserId(userId);
  } catch (error) {
    console.error(`Error in getCartService (userId: ${userId}):`, error);
    throw new Error("Failed to retrieve cart");
  }
};

export const clearUserCart = async (userId) => {
  try {
    return await deleteCart(userId);
  } catch (error) {
    console.error(`Error in clearUserCart (userId: ${userId}):`, error);
    throw new Error("Failed to clear user cart");
  }
};