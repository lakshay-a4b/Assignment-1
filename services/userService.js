import * as userRepo from '../repositories/UserRepository.js';
import { hashPassword, comparePasswords } from '../utils/hashUtil.js';
import { generateToken } from '../utils/tokenUtil.js';

export const signup = async ({ userID, password, email }) => {
  const existingUser = await userRepo.findByUserId(userID);
  if (existingUser) {
    const error = new Error('User already exists');
    error.status = 400;
    throw error;
  }

  const hashedPassword = hashPassword(password);
  
  const newUser = { userID, email, password: hashedPassword };
  await userRepo.createUser(newUser);

  return { message: 'User registered successfully' };
};

export const login = async ({ userId, password }) => {
  const user = await userRepo.findByUserId(userId);  
  
  if (!user || !comparePasswords(password, user.password)) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const token = generateToken({ userId: user.userId });
  return { message: 'Login successful', token };
};
