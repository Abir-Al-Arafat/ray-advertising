import { Request, Response } from "express";
import path from "path";
import fs from "fs/promises";

import { readItems, writeItems } from "../utilities/helpers";

const addItem = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const items = await readItems();
    const newProduct = {
      id: items.length ? Math.max(...items.map((i: any) => i.id)) + 1 : 1,
      name,
      price,
      description,
    };
    items.push(newProduct);
    await writeItems(items);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await readItems();
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const items = await readItems();
    const product = items.find((item: any) => item.id === Number(id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
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
