import express from 'express';
import { signupUser, loginUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
