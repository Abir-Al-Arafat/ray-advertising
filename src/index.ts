import express, { Request, Response, NextFunction } from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send({
    name: "API Developer Skill Test",
    developer: "Abir",
    version: "1.0.0",
    description: "Backend server for Skill Test",
    status: "success",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
