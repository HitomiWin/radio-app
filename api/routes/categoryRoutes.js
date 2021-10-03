const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
router.get("/:categoryId",categoryController.getCategoryById);
router.get("",categoryController.getAllCategories);

module.exports = router;
