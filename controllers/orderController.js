import {
  createOrderService,
  fetchUserOrders,
} from "../services/orderService.js";

export const createOrder = async (req, res) => {
  const userId = req?.user?.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const order = await createOrderService(userId);
    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(`Error creating order (userId: ${userId}):`, error);
    res
      .status(400)
      .json({ message: error.message || "Failed to create order" });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  if (page <= 0 || limit <= 0) {
    return res
      .status(400)
      .json({ message: "Page and limit must be positive integers" });
  }

  try {
    const result = await fetchUserOrders(userId, page, limit);
    res.status(200).json(result);
  } catch (error) {
    console.error(`Error fetching orders (userId: ${userId}):`, error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const updateUserOrder = async (req, res) => {
  const userId = req.user.userId;
  const orderId = parseInt(req.params.id);
  const { status } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (!req.params.id || isNaN(orderId)) {
    return res
      .status(400)
      .json({ message: "Valid numeric order ID is required" });
  }

  if (!status) {
    return res.status(400).json({ message: "Order status is required" });
  }

  try {
    const order = await updateOrderService(userId, orderId, status);
    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error(
      `Error updating order (userId: ${userId}, orderId: ${orderId}):`,
      error
    );
    res
      .status(400)
      .json({ message: error.message || "Failed to update order" });
  }
};
