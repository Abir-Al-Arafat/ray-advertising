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

export { addProduct };
