import * as ProductService from "../services/productService.js";

export const getAllProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const result = ProductService.fetchPaginatedProducts(page, limit);
  res.json(result);
};

export const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  const product = ProductService.fetchProductById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

export const getProductByIdSync = (id) => {
  const product = ProductService.fetchProductById(id);

  if (!product) {
    return null;
  }
  return product;
};

export const createProduct = async (req, res) => {
  const { name, imageURL, description, price } = req.body;

  if (!name || !imageURL || !price || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = await ProductService.createProduct({
      name,
      imageURL,
      description,
      price,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, imageURL, description, price } = req.body;

  if (!name || !price || !imageURL || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedProduct = ProductService.updateProduct(id, {
      name,
      imageURL,
      description,
      price,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedProduct = ProductService.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};