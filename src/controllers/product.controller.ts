import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";
const addItem = async (req: Request, res: Response) => {
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

const getAllItems = async (req: Request, res: Response) => {
  try {
    // Read products from items.json
    const filePath = path.join(__dirname, "../database/items.json");
    const data = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(data);

    // Respond with all products
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getItemById = async (req: Request, res: Response) => {
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

const updateItemById = async (req: Request, res: Response) => {
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

const deleteItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Simulate deleting product by ID from database
    // Respond with a success message
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { addItem, getAllItems, getItemById, updateItemById, deleteItemById };
