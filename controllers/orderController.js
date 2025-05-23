import {createOrderService, fetchUserOrders} from '../services/orderService.js';

export const createOrder = async (req, res) => {
  const userId = req.user.userId;  

  try {
    const order = await createOrderService(userId);
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.userId;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const result = await fetchUserOrders(userId, page, limit);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

export const updateUserOrder = async (req, res) => {
  const userId = req.user.userID;
  const orderId = parseInt(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const order = await createOrderSync(userId, orderId, status);
    res.status(200).json({
      message: 'Order updated successfully',
      order
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}