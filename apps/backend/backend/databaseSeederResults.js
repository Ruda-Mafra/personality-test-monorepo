const router = require("express").Router();
const Result = require("./models/Result");
const results = require("./data/Results");
const AsyncHandler = require("express-async-handler");

router.get(
  "/results",
  AsyncHandler(async (req, res) => {
    await Result.deleteMany({});
    const resultSeeder = await Result.insertMany(results);
    res.send({ resultSeeder });
  })
);

module.exports = router;
