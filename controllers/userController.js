import { signup, login } from '../services/userService.js';

export const signupUser = async (req, res) => {
  try {
    const { user_id, password, email } = req.body;
    const result = await signup({ user_id, password, email });
    res.status(201).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { user_id, password } = req.body;
    const result = await login({ user_id, password });
    res.json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
