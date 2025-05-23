import pool from "../config/db.js";

export const addOrder = async (orderData) => {
  const { paymentId, userId, items, status } = orderData;
  console.log("repositories/OrderRepository.js ", paymentId);
  
  const query = `
    INSERT INTO orders ("paymentId", "userId", "productInfo", "status")
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [paymentId, userId, items, status]);
  return rows[0];
};

export const getOrdersByUser = async (userId) => {
  
  const query = 'SELECT * FROM orders WHERE "userId" = $1 ORDER BY "createdAt" DESC';
  const { rows } = await pool.query(query, [userId]);
  
  return rows;
};