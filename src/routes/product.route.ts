import express from "express";

const routes = express();

import {
  addItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
} from "../controllers/product.controller";

routes.post("/", (req, res) => {
  addItem(req, res);
});

routes.get("/", (req, res) => {
  getAllItems(req, res);
});

routes.get("/:id", (req, res) => {
  getItemById(req, res);
});

routes.put("/:id", (req, res) => {
  updateItemById(req, res);
});

routes.delete("/:id", (req, res) => {
  deleteItemById(req, res);
});

export default routes;
