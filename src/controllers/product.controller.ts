import { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes";

import { readItems, writeItems } from "../utilities/helpers";

const addItem = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: "Name and price are required" });
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

    return res.status(HTTP_STATUS.CREATED).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await readItems();
    if (!items || !items.length) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "No items found" });
    }
    return res.status(HTTP_STATUS.OK).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const items = await readItems();
    const product = items.find((item: any) => item.id === Number(id));
    if (!product) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    return res.status(HTTP_STATUS.OK).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const updateItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const items = await readItems();
    const index = items.findIndex((item: any) => item.id === Number(id));
    if (index === -1) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    items[index] = { ...items[index], name, price, description };
    await writeItems(items);
    return res.status(HTTP_STATUS.OK).json(items[index]);
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const deleteItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const items = await readItems();
    const index = items.findIndex((item: any) => item.id === Number(id));
    if (index === -1) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    items.splice(index, 1);
    await writeItems(items);
    return res
      .status(HTTP_STATUS.OK)
      .json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export { addItem, getAllItems, getItemById, updateItemById, deleteItemById };
