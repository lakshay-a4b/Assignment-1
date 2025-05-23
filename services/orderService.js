import { addOrder, getOrdersByUser } from "../repositories/OrderRepository.js";
import {
  getCartByUserId,
  deleteCart,
} from "../repositories/CartRepository.js";
import { fetchProductById } from "./productService.js";
import { processPayment } from "./paymentService.js";

export const createOrderService = async (userId) => {
  const cartItems = await getCartByUserId(userId);
  
  if (!cartItems || cartItems.length === 0 || !cartItems.productInfo || cartItems.productInfo.length === 0) {
    throw new Error("Cart is empty");
  }
 
  const items = await Promise.all(
    cartItems.productInfo.map(async (item) => {
      const product = await fetchProductById(item.productId);
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
  
  const paymentResult = await processPayment( {userId, totalAmount} );

  console.log(paymentResult);
  

  const order = {
    paymentId: paymentResult.transactionId,
    userId,
    items,
    status:
      paymentResult.status === "success" ? "Order-Accepted" : "Payment Failed",
  };
  
  await addOrder(order);
  await deleteCart(userId);

  return order;
};

export const fetchUserOrders = async (userId, page, limit) => {
  const userOrders = await getOrdersByUser(userId);
  
  const start = (page - 1) * limit;
  const paginated = userOrders.slice(start, start + limit);
  
  return {
    orders: paginated,
    total: userOrders.length,
    page,
    limit,
  };
};