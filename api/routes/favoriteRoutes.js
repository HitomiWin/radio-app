const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.get("/channels", favoriteController.getAllFavoriteChannels);
router.get("/programs", favoriteController.getAllFavoritePrograms);
router.delete("/channels",favoriteController.deleteFavoriteChannel);
router.delete("/programs",favoriteController.deleteFavoriteProgram);

module.exports = router;

