import { body } from "express-validator";

export const validateUser = [
   body("name").notEmpty().withMessage("Name is required"),
   body("email")
      .notEmpty().withMessage("email is required")
      .isEmail().withMessage("email is invalid"),
   body("password").isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
] 