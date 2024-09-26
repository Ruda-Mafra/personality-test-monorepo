const router = require("express").Router();
const mongoose = require("mongoose");
const Question = require("./models/Question");
const questions = require("./data/Questions");
const AsyncHandler = require("express-async-handler");

router.get(
  "/questions",
  AsyncHandler(async (req, res) => {
    await Question.deleteMany({});
    const QuestionSeeder = await Question.insertMany(questions);
    res.send({ QuestionSeeder });
  })
);

module.exports = router;
