import express from "express";

const routes = express();

import { addProduct } from "../controllers/product.controller";

routes.post("/", (req, res) => {
  addProduct(req, res);
});

export default routes;
