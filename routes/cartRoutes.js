import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', authenticateToken, addToCart);
router.get('/', authenticateToken, getCart);
router.delete('/:productId', authenticateToken, removeFromCart);

export default router;
