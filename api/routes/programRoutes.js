const express = require("express");
const router = express.Router();
const programController = require("../controllers/programController");

router.get("/allprograms",programController.getAllPrograms);
router.get("/:channelId",programController.getProgramsByChannelId);
router.get("/allprograms/:programId",programController.getProgramById);


module.exports = router;
