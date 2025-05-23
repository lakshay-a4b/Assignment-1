import pool from '../config/db.js';

export const getAllProducts = async () => {
  try {
    const query = 'SELECT * FROM products';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const query = 'SELECT * FROM products WHERE "productId" = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const createProduct = async (product) => {
  try {
    const { name, description, image, price } = product;
    const query = `
      INSERT INTO products (name, description, image, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name, description, image, price]);
    return rows[0];
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const { name, description, image, price } = product;
    const query = `
      UPDATE products
      SET name = $1, description = $2, image = $3, price = $4
      WHERE "productId" = $5
      RETURNING *
    `;
    const { rows } = await pool.query(query, [name, description, image, price, id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM products WHERE "productId" = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};