const express = require("express");
const router = express.Router();

const channelController = require("../controllers/channelController");

router.get("/schedule/:channelId", channelController.getChannelSchedule)
router.get("/:channelId", channelController.getChannelById);
router.get("", channelController.getAllChannels);
router.post("", channelController.addChannelToFavorites)

module.exports = router;