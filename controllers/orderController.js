import {createOrderSync, fetchUserOrders} from '../services/orderService.js';

export const createOrder = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const order = await createOrderSync(userId);
    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  const userId = req.user.user_id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const result = await fetchUserOrders(userId, page, limit);
    console.log(result);
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

