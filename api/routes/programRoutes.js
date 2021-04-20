const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("",programController.getAllPrograms);
router.get("/:channelId",programController.getProgramsByChannelId);
// router.get("/categories",programController.getAllCategories);
// router.get("/allprograms/:categoryId",programController.getAllCategories);

module.exports = router;
