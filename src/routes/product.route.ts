import express from "express";

const routes = express();

import { addProduct, getAllProducts } from "../controllers/product.controller";

routes.post("/", (req, res) => {
  addProduct(req, res);
});

routes.get("/", (req, res) => {
  getAllProducts(req, res);
});

export default routes;
