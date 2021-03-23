const router = require("express").Router();
const wantedController = require("../../controllers/wantedController");

router.route("/")
    .get(wantedController.getAds)
    .post(wantedController.postAd)

module.exports = router;