const express = require("express");
let router = express.Router();

const RefController = require("../controllers/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.post("/login/", RefController.performLogin);
router.post("/register/", RefController.performRegistration);
router.get("/profile/", authenticateToken, RefController.getProfileDetails);

module.exports = router;