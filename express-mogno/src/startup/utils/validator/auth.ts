import { body } from "express-validator";

export const validateRegister = [
   body("name").notEmpty().withMessage("name is required"),
   body("email")
   .notEmpty().withMessage("email is required")
   .isEmail().withMessage("email is invalid"),
   body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
]

export const validateLogin = [
   body('email').notEmpty().withMessage('Email is required'),
   body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

