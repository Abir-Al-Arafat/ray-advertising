import { Request, Response } from "express";
const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;

    // Validate required fields
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Simulate adding product to database
    const newProduct = { id: Date.now(), name, price, description };

    // Respond with the created product
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    // Simulate fetching all products from database
    const products = [
      { id: 1, name: "Product 1", price: 10, description: "Description 1" },
      { id: 2, name: "Product 2", price: 20, description: "Description 2" },
      { id: 3, name: "Product 3", price: 30, description: "Description 3" },
    ];

    // Respond with all products
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Simulate fetching product by ID from database
    const product = {
      id: 1,
      name: "Product 1",
      price: 10,
      description: "Description 1",
    };

    // Respond with the product
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    // Simulate updating product by ID in database
    // Respond with the updated product
    return res.status(200).json({ id, name, price, description });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export { addProduct, getAllProducts, getProductById, updateProductById };
