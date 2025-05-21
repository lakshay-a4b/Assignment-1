import express from 'express';
import { createOrder, getUserOrders, updateUserOrder } from '../controllers/orderController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/create', authenticateToken, createOrder);
router.get('/', authenticateToken, getUserOrders);
router.put('/update/:id', authenticateToken, updateUserOrder);

export default router;
