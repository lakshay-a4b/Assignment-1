import pool from "../config/db.js";

export const getAllProducts = async () => {
  try {
    const query = "SELECT * FROM products";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error: getAllProducts failed:", error);
    throw new Error("Failed to fetch all products from database");
  }
};

export const getPaginatedProducts = async (limit, offset) => {
  try {
    const query = 'SELECT * FROM products ORDER BY "productId" LIMIT $1 OFFSET $2';
    const { rows } = await pool.query(query, [limit, offset]);
    return rows;
  } catch (error) {
    console.error('Database error: getPaginatedProducts failed:', error);
    throw new Error('Failed to fetch paginated products');
  }
};


export const getTotalProductCount = async () => {
  try {
    const query = 'SELECT COUNT(*) FROM products';
    const { rows } = await pool.query(query);
    return parseInt(rows[0].count, 10);
  } catch (error) {
    console.error('Database error: getTotalProductCount failed:', error);
    throw new Error('Failed to count products');
  }
};

export const getProductById = async (id) => {
  try {
    const query = 'SELECT * FROM products WHERE "productId" = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Database error: getProductById(${id}) failed:`, error);
    throw new Error("Failed to fetch product by ID");
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
    console.error("Database error: createProduct failed:", error);
    throw new Error("Failed to create product");
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
    const { rows } = await pool.query(query, [
      name,
      description,
      image,
      price,
      id,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Database error: updateProduct(${id}) failed:`, error);
    throw new Error("Failed to update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    const query = 'DELETE FROM products WHERE "productId" = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  } catch (error) {
    console.error(`Database error: deleteProduct(${id}) failed:`, error);
    throw new Error("Failed to delete product");
  }
};
