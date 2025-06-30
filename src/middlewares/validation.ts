import { body, param } from "express-validator";

const itemValidator = {
  create: [
    body("name")
      .exists()
      .withMessage("name was not provided")
      .bail()
      .notEmpty()
      .withMessage("name cannot be empty")
      .bail()
      .isString()
      .withMessage("name must be a string"),
    body("price")
      .exists()
      .withMessage("price was not provided")
      .bail()
      .notEmpty()
      .withMessage("price cannot be empty")
      .bail()
      .isFloat({ min: 1 })
      .withMessage("Price must be a positive number"),
    body("description")
      .optional()
      .exists()
      .withMessage("description was not provided")
      .bail()
      .notEmpty()
      .withMessage("description cannot be empty")
      .bail()
      .isString()
      .withMessage("description must be a string"),
  ],
  update: [
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isString()
      .withMessage("name must be a string"),

    body("price")
      .optional()
      .notEmpty()
      .withMessage("price cannot be empty")
      .bail()
      .isFloat({ min: 1, max: 1000 })
      .withMessage("Price must be a positive number"),

    body("description")
      .optional()
      .notEmpty()
      .withMessage("description cannot be empty")
      .bail()
      .isString()
      .withMessage("description must be a string"),
  ],
  id: [
    param("id")
      .exists()
      .withMessage("id must be provided")
      .bail()
      .notEmpty()
      .withMessage("id cannot be empty")
      .bail()
      .isInt()
      .withMessage("id must be an integer"),
  ],
};

export { itemValidator };
