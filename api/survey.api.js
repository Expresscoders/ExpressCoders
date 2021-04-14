const express = require("express");
let router = express.Router();

const RefController = require("../controllers/survey.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

router.get("/list/", RefController.getUserSurvey);
router.post("/save/", authenticateToken, RefController.createSurvey);
router.get("/get/personal/", authenticateToken, RefController.getPersonalCreatedSurveys);
router.get("/get/:_id", RefController.getSurvey);
router.get("/delete/personal/:_id", authenticateToken, RefController.deletePersonalSurvey);
router.post("/attended/save/:_id", RefController.saveAttendedSurvey);

module.exports = router;