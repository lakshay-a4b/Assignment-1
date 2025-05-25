import {
  addToCartService,
  getCartService,
  removeFromCartService,
} from "../services/cartService.js";
import { getProductById } from "../repositories/ProductRepository.js";

export const addToCart = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { productId, quantity, price } = req.body;

  if (!productId || !quantity || quantity <= 0 || !price || price <= 0) {
    return res.status(400).json({
      success: false,
      message: "Valid product ID, quantity, and price are required",
    });
  }

  try {
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await addToCartService(userId, { productId, quantity, price });
    return res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to add product to cart",
    });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const cart = await getCartService(userId);
    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to fetch cart",
    });
  }
};

export const removeFromCart = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  const productId = parseInt(req.params.productId);

  if (!productId || isNaN(productId)) {
    return res.status(400).json({
      success: false,
      message: "Valid product ID is required",
    });
  }

  try {
    const cart = await removeFromCartService(userId, productId);
    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Failed to remove product from cart",
    });
  }
};
