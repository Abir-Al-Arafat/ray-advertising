import express from "express";
import { Request, Response } from "express";
const routes = express();

import { itemValidator } from "../middlewares/validation";

import {
  addItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/item.controller";

routes.post("/", itemValidator.create, (req: Request, res: Response) => {
  addItem(req, res);
});

routes.get("/", (req, res) => {
  getAllItems(req, res);
});

routes.get("/:id", itemValidator.id, (req: Request, res: Response) => {
  getItemById(req, res);
});

routes.put("/:id", itemValidator.update, (req: Request, res: Response) => {
  updateItemById(req, res);
});

routes.delete("/:id", itemValidator.id, (req: Request, res: Response) => {
  deleteItemById(req, res);
});

export default routes;
