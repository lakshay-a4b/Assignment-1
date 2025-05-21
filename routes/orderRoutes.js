// routes/order.routes.js
import express from 'express';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticateToken, createOrder);
router.get('/', authenticateToken, getUserOrders);

export default router;
