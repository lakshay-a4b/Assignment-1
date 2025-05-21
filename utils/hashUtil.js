import bcrypt from 'bcryptjs';

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const comparePasswords = (plain, hash) => bcrypt.compareSync(plain, hash);
