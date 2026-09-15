import { body } from "express-validator";

export const updateProfileValidation = [
  body("phone")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone must be 10 digits"),

  body("education")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Education is too long"),

  body("experience")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Experience is too long"),
];