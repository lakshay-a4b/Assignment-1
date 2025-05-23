import { signup, login } from '../services/userService.js';

export const signupUser = async (req, res) => {
  try {
    const { userID, password, email } = req.body;
    const result = await signup({ userID, password, email });
    
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const result = await login({ userId, password });
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
