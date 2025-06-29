import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json()); // Parses data as JSON
app.use(express.text()); // Parses data as text
app.use(express.urlencoded({ extended: false })); // Parses data as URL-encoded

// ✅ Handle Invalid JSON Errors
app.use(
  (
    err: SyntaxError & { status?: number; body?: any },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      res.status(400).send({ message: "Invalid JSON format" });
    }
    next();
  }
);

app.get("/", (req, res) => {
  res.status(200).send({
    name: "API Developer Skill Test",
    developer: "Abir",
    version: "1.0.0",
    description: "Backend server for Skill Test",
    status: "success",
  });
});

// ✅ Handle 404 Routes
app.use((req, res) => {
  res.status(400).send({ message: "Route does not exist" });
});

// ✅ Handle Global Errors
app.use((err: SyntaxError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
