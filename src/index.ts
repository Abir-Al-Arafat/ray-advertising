import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.status(200).send({
    name: "API Developer Skill Test",
    developer: "Abir",
    version: "1.0.0",
    description: "Backend server for Skill Test",
    status: "success",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
