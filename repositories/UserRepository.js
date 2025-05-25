import pool from '../config/db.js';

export const findByUserId = async (userId) => {
  try {
    const query = 'SELECT * FROM users WHERE "userId" = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const { userId , email, password, role } = user;
    
    const query = `
      INSERT INTO users ("userId", email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [userId, email, password, role]);
    return rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const findByEmail = async (email) => {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
};

export const updateUser = async (userId, updates) => {
  try {
    const { email, password } = updates;
    const query = `
      UPDATE users
      SET email = $1, password = $2
      WHERE "userId" = $3
      RETURNING *
    `;
    const { rows } = await pool.query(query, [email, password, userId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const query = 'DELETE FROM users WHERE "userId" = $1 RETURNING *';
    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};