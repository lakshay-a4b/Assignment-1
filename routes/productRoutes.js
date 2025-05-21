import { Router } from 'express';
const router = Router();
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

export default router;
