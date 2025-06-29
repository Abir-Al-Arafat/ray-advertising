import express from "express";

const routes = express();

import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteItemById,
} from "../controllers/product.controller";

routes.post("/", (req, res) => {
  addProduct(req, res);
});

routes.get("/", (req, res) => {
  getAllProducts(req, res);
});

routes.get("/:id", (req, res) => {
  getProductById(req, res);
});

routes.put("/:id", (req, res) => {
  updateProductById(req, res);
});

routes.delete("/:id", (req, res) => {
  deleteItemById(req, res);
});

export default routes;
