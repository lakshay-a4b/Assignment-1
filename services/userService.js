import * as userRepo from '../repositories/UserRepository.js';
import { hashPassword, comparePasswords } from '../utils/hashUtil.js';
import { generateToken } from '../utils/tokenUtil.js';

export const signup = async ({ userId, password, email, role }) => {
  
  try {
    const existingUser = await userRepo.findByUserId(userId);
    if (existingUser) {
      const error = new Error('User already exists');
      error.status = 400;
      throw error;
    }

    const hashedPassword = hashPassword(password);
    const newUser = { userId, email, password: hashedPassword, role };
    await userRepo.createUser(newUser);

    return { message: 'User registered successfully' };
  } catch (err) {
    console.error('Signup Error:', err);
    throw {
      status: err.status || 500,
      message: err.message || 'An unexpected error occurred during signup'
    };
  }
};

export const login = async ({ userId, password }) => {
  try {
    const user = await userRepo.findByUserId(userId);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const isPasswordValid = comparePasswords(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    const token = generateToken({ userId: user.userId, role: user.role });
    return { message: 'Login successful', token };
  } catch (err) {
    console.error('Login Error:', err);
    throw {
      status: err.status || 500,
      message: err.message || 'An unexpected error occurred during login'
    };
  }
};

export const updateUserService = async (userId, updates) => {
  try {
    const user = await userRepo.findByUserId(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    const updatedUser = await userRepo.updateUser(userId, updates);
    return { message: 'User updated successfully', user: updatedUser };
  } catch (err) {
    console.error('Update User Error:', err);
    throw {
      status: err.status || 500,
      message: err.message || 'An unexpected error occurred during user update'
    };
  }
};

export const deleteUserService = async (userId) => {
  try {
    const user = await userRepo.findByUserId(userId);
    if (!user) {
      const error = new Error('User not found');
      error.status = 404;
      throw error;
    }

    await userRepo.deleteUser(userId);
    return { message: 'User deleted successfully' };
  } catch (err) {
    console.error('Delete User Error:', err);
    throw {
      status: err.status || 500,
      message: err.message || 'An unexpected error occurred during user deletion'
    };
  }
};