import { signup, login, deleteUserService, updateUserService } from '../services/userService.js';

export const signupUser = async (req, res) => {
  try {
    const { userId, password, email, role } = req.body;

    if (!userId || !password || !email || !role) {
      return res.status(400).json({ message: 'userId, password, and email are required' });
    }

    const result = await signup({ userId: userId, password, email, role });
    res.status(201).json(result);
  } catch (error) {
    console.error('Signup Controller Error:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password ) {
      return res.status(400).json({ message: 'userId and password are required' });
    }

    const result = await login({ userId, password });
    res.status(200).json(result);
  } catch (error) {
    console.error('Login Controller Error:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    if (!userId || !updates) {
      return res.status(400).json({ message: 'userId and updates are required' });
    }

    const result = await updateUserService(userId, updates);
    res.status(200).json(result);
  } catch (error) {
    console.error('Update User Controller Error:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    await userRepo.deleteUserService(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete User Controller Error:', error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
};