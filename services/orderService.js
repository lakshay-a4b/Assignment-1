import { addOrder, getOrdersByUser } from "../repositories/OrderRepository.js";
import {
  getCartByUserId,
  clearUserCart,
} from "../repositories/CartRepository.js";
import { fetchProductById } from "./productService.js";
import { processPayment } from "./paymentService.js";

let orderIdCounter = 1;

export const createOrderSync = async (userId) => {
  const cartItems = getCartByUserId(userId);
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  const items = cartItems.map((item) => {
    const product = fetchProductById(item.productId);
    return {
      productId: product.id,
      name: product.name,
      image: product.imageURL,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const paymentResult = processPayment({ userId, cartItems, totalAmount });

  const order = {
    id: orderIdCounter++,
    userId,
    items,
    totalAmount,
    status:
      paymentResult.status === "success" ? "Payment Success" : "Payment Failed",
    transactionId: paymentResult.transactionId,
    createdAt: new Date(),
  };

  addOrder(order);
  clearUserCart(userId);

  return order;
};

export const fetchUserOrders = (userId, page, limit) => {
  const userOrders = getOrdersByUser(userId);
  const start = (page - 1) * limit;
  const paginated = userOrders.slice(start, start + limit);

  return {
    orders: paginated,
    total: userOrders.length,
    page,
    limit,
  };
};
