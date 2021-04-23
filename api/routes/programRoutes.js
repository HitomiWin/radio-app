const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("/allprogram",programController.getAllPrograms);
router.get("/:channelId",programController.getProgramsByChannelId);
router.get("/allprogram/:programId",programController.getProgramById);


module.exports = router;
