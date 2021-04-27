const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");

router.get("/channels", favoriteController.getAllFavoriteChannels);
router.get("/programs", favoriteController.getAllFavoritePrograms);

module.exports = router;

