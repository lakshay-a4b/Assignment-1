import pool from '../config/db.js';

export const getCartByUserId = async (userId) => {
  try {
    const query = 'SELECT * FROM cart WHERE "userId" = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Database error in getCartByUserId (userId: ${userId}):`, error);
    throw new Error("Failed to retrieve cart from database");
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
    console.error(`Database error in createOrUpdateCart (userId: ${userId}):`, error);
    throw new Error("Failed to create or update cart");
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
    console.error(`Database error in updateCartProducts (userId: ${userId}):`, error);
    throw new Error("Failed to update cart products");
  }
};

export const deleteCart = async (userId, client = null) => {
  try {
    const query = 'DELETE FROM cart WHERE "userId" = $1 RETURNING *';
    
    const { rows } = client 
      ? await client.query(query, [userId])
      : await pool.query(query, [userId]);
    
    return rows[0] || null;
  } catch (error) {
    console.error(`Database error in deleteCart (userId: ${userId}):`, error);
    throw new Error("Failed to delete cart");
  }
};