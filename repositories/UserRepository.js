import { users } from '../models/userModel.js';

export const findByUserId = async (user_id) => {
  return users.find(user => user.user_id === user_id);
};

export const createUser = async (user) => {
  users.push(user);
  return user;
};
