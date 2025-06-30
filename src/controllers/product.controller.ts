import { Request, Response } from "express";
import HTTP_STATUS from "../constants/statusCodes";
import { success, failure } from "../utilities/response";

import { readItems, writeItems } from "../utilities/helpers";

const addItem = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .send(failure("Name and price are required"));
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

    return res
      .status(HTTP_STATUS.CREATED)
      .send(success("Product added successfully", newProduct));
  } catch (error: any) {
    console.error("Error adding product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
  }
};

const getAllItems = async (req: Request, res: Response) => {
  try {
    const items = await readItems();
    if (!items || !items.length) {
      return res.status(HTTP_STATUS.NOT_FOUND).send(failure("No items found"));
    }
    return res
      .status(HTTP_STATUS.OK)
      .send(success("Items fetched successfully", items));
  } catch (error: any) {
    console.error("Error fetching items:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
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
        .send(failure("Product not found"));
    }
    return res
      .status(HTTP_STATUS.OK)
      .send(success("Product fetched successfully", product));
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
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
        .send(failure("Product not found"));
    }
    items[index] = { ...items[index], name, price, description };
    await writeItems(items);
    return res
      .status(HTTP_STATUS.OK)
      .send(success("Product updated successfully", items[index]));
  } catch (error: any) {
    console.error("Error updating product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
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
        .send(failure("Product not found"));
    }
    items.splice(index, 1);
    await writeItems(items);
    return res
      .status(HTTP_STATUS.OK)
      .send(success("Product deleted successfully"));
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
  }
};

export { addItem, getAllItems, getItemById, updateItemById, deleteItemById };
