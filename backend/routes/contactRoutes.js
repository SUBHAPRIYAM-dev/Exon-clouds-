const express = require("express");
const { body } = require("express-validator");
const {
  createInquiry,
  getAllInquiries
} = require("../controllers/contactController");

const router = express.Router();

const inquiryValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email address is required.")
    .normalizeEmail(),
  body("serviceNeeded")
    .trim()
    .notEmpty()
    .withMessage("Service needed is required."),
  body("companyName").optional({ checkFalsy: true }).trim(),
  body("phone").optional({ checkFalsy: true }).trim(),
  body("projectBrief").optional({ checkFalsy: true }).trim()
];

router.post("/", inquiryValidationRules, createInquiry);
router.get("/", getAllInquiries);

module.exports = router;
