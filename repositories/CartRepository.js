import pool from '../config/db.js';

export const getCartByUserId = async (userId) => {
  
  try {
    const query = 'SELECT * FROM cart WHERE "userId" = $1';
    const { rows } = await pool.query(query, [userId]);
    
    return rows[0] || null;
  } catch (error) {
    console.error('Error getting cart:', error);
    throw error;
  }
};

export const createOrUpdateCart = async (userId, productInfo) => {
  try {
    const query = `
      INSERT INTO cart ("userId", "productInfo")
      VALUES ($1, $2)
      ON CONFLICT ("userId") 
      DO UPDATE SET 
        "productInfo" = EXCLUDED."productInfo",
        "updatedAt" = NOW()
      RETURNING *
    `;
    const { rows } = await pool.query(query, [userId, productInfo]);
    return rows[0];
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error;
  }
};

export const updateCartProducts = async (userId, productInfo) => {
  try {
    const query = `
      UPDATE cart
      SET 
        "productInfo" = $1,
        "updatedAt" = NOW()
      WHERE "userId" = $2
      RETURNING *
    `;
    const { rows } = await pool.query(query, [productInfo, userId]);
    return rows[0];
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const deleteCart = async (userId) => {
  try {
    const query = 'DELETE FROM cart WHERE "userId" = $1 RETURNING *';
    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  }
  catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
}