import * as userRepo from '../repositories/UserRepository.js';
import { hashPassword, comparePasswords } from '../utils/hashUtil.js';
import { generateToken } from '../utils/tokenUtil.js';

export const signup = async ({ user_id, password, email }) => {
  const existingUser = await userRepo.findByUserId(user_id);
  if (existingUser) {
    const error = new Error('User already exists');
    error.status = 400;
    throw error;
  }

  const hashedPassword = hashPassword(password);
  const newUser = { user_id, email, password: hashedPassword };
  await userRepo.createUser(newUser);

  return { message: 'User registered successfully' };
};

export const login = async ({ user_id, password }) => {
  const user = await userRepo.findByUserId(user_id);
  if (!user || !comparePasswords(password, user.password)) {
    const error = new Error('Invalid credentials');
    error.status = 401;
    throw error;
  }

  const token = generateToken({ user_id: user.user_id });
  return { message: 'Login successful', token };
};
