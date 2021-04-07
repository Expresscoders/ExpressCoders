const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Survey = mongoose.model("Survey");
const surveyController = require("../controllers/survey");

router.get("/", surveyController.index);

router.get("/user", surveyController.userSurveys);

router.post("/", surveyController.create);

router.post("/:id/participate", surveyController.participate);

router.get("/:id", surveyController.find);

module.exports = router;