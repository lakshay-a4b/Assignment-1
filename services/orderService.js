import { addOrder, getOrdersByUser } from "../repositories/OrderRepository.js";
import {
  getCartByUserId,
  deleteCart,
} from "../repositories/CartRepository.js";
import { fetchProductById } from "./productService.js";
import { createPayment } from "./paymentService.js";
import pool from "../config/db.js";

export const createOrderService = async (userId) => {
  const client = await pool.connect();
  
  try {
    
    const cartItems = await getCartByUserId(userId);
    if (!cartItems || cartItems.length === 0 || !cartItems.productInfo || cartItems.productInfo.length === 0) {
      throw new Error("Cart is empty");
    }
    
    const items = await Promise.all(
      cartItems.productInfo.map(async (item) => {
        const product = await fetchProductById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }
        return {
          productId: product.productId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: item.quantity,
        };
      })
    );
    
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    await client.query('BEGIN');
    
    const paymentResult = await createPayment({ userId, totalAmount }, client);
    if (!paymentResult || !paymentResult.transactionId) {
      throw new Error("Payment processing failed");
    }

    const order = {
      paymentId: paymentResult.transactionId,
      userId,
      items,
      status: paymentResult.status === "success" ? "Order-Accepted" : "Payment Failed",
    };

    await addOrder(order, client);

    await deleteCart(userId, client);

    await client.query('COMMIT');
    
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Service error: createOrderService failed:", error);
    throw new Error(error.message || "Failed to create order");
  } finally {
    client.release();
  }
};

export const fetchUserOrders = async (userId, page = 1, limit = 5) => {
  try {
    const userOrders = await getOrdersByUser(userId);

    const start = (page - 1) * limit;
    const paginated = userOrders.slice(start, start + limit);

    return {
      orders: paginated,
      total: userOrders.length,
      page,
      limit,
    };
  } catch (error) {
    console.error("Service error: fetchUserOrders failed:", error);
    throw new Error("Failed to fetch user orders");
  }
};