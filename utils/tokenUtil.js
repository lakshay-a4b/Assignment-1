import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  return jwt.sign(payload, "your_jwt_secret", { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, "your_jwt_secret");
};
