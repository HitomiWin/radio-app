const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
router.get("",categoryController.getAllCategories);
router.get("/:categoryId",categoryController.getProgramsByCategories);

module.exports = router;