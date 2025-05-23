import pool from "../config/db.js";

export const addOrder = async (orderData, client = null) => {
  const { paymentId, userId, items, status } = orderData;
  
  try {
    const query = `
      INSERT INTO orders ("paymentId", "userId", "productInfo", "status")
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const params = [paymentId, userId, items, status];

    const { rows } = client 
      ? await client.query(query, params)
      : await pool.query(query, params);
    
    return rows[0];
  } catch (error) {
    console.error("Database error in addOrder:", error);
    throw new Error("Failed to add order to the database");
  }
};
export const getOrdersByUser = async (userId) => {
  try {
    const query = 'SELECT * FROM orders WHERE "userId" = $1 ORDER BY "createdAt" DESC';
    const { rows } = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error(`Database error in getOrdersByUser (userId: ${userId}):`, error);
    throw new Error("Failed to fetch orders for user");
  }
};
