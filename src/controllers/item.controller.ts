import { Request, Response } from "express";
import { validationResult } from "express-validator";
import HTTP_STATUS from "../constants/statusCodes";
import { success, failure } from "../utilities/response";

import { readItems, writeItems } from "../utilities/helpers";

import { IItem } from "../interfaces/item.interface";

const addItem = async (req: Request, res: Response) => {
  try {
    const validation = validationResult(req).array();

    if (validation.length > 0) {
      return res
        .status(HTTP_STATUS.OK)
        .send(failure("Failed to add data", validation[0].msg));
    }
    const { name, price, description } = req.body;

    const items: IItem[] = await readItems();
    const newItem = {
      id: items.length ? Math.max(...items.map((i: any) => i.id)) + 1 : 1,
      name,
      price,
      description,
    };
    items.push(newItem);
    await writeItems(items);

    return res
      .status(HTTP_STATUS.CREATED)
      .send(success("item added successfully", newItem));
  } catch (error: any) {
    console.error("Error adding item:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
  }
};

const getAllItems = async (req: Request, res: Response) => {
  try {
    const items: IItem[] = await readItems();
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
    const validation = validationResult(req).array();

    if (validation.length > 0) {
      return res
        .status(HTTP_STATUS.OK)
        .send(failure("Failed to add data", validation[0].msg));
    }
    const { id } = req.params;
    const items: IItem[] = await readItems();
    const item: IItem | undefined = items.find(
      (item) => item.id === Number(id)
    );
    if (!item) {
      return res.status(HTTP_STATUS.NOT_FOUND).send(failure("item not found"));
    }
    return res
      .status(HTTP_STATUS.OK)
      .send(success<IItem>("item fetched successfully", item));
  } catch (error: any) {
    console.error("Error fetching item:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
  }
};

const updateItemById = async (req: Request, res: Response) => {
  try {
    const validation = validationResult(req).array();

    if (validation.length) {
      return res
        .status(HTTP_STATUS.OK)
        .send(failure("Failed to update data", validation[0].msg));
    }
    const { id } = req.params;
    const { name, price, description } = req.body;
    const items: IItem[] = await readItems();
    const index = items.findIndex((item: IItem) => item.id === Number(id));
    if (index === -1) {
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .send(failure("Product not found"));
    }
    items[index] = {
      ...items[index],
      name: name ? name : items[index].name,
      price: price ? price : items[index].price,
      description: description ? description : items[index].description,
    };
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
    const validation = validationResult(req).array();

    if (validation.length) {
      return res
        .status(HTTP_STATUS.OK)
        .send(failure("Failed to delete data", validation[0].msg));
    }
    const { id } = req.params;
    const items: IItem[] = await readItems();
    const index = items.findIndex((item: any) => item.id === Number(id));
    if (index === -1) {
      return res.status(HTTP_STATUS.NOT_FOUND).send(failure("item not found"));
    }
    items.splice(index, 1);
    await writeItems(items);
    return res
      .status(HTTP_STATUS.OK)
      .send(success("item deleted successfully"));
  } catch (error: any) {
    console.error("Error deleting item:", error);
    return res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .send(failure("Internal Server Error", error));
  }
};

export { addItem, getAllItems, getItemById, updateItemById, deleteItemById };
