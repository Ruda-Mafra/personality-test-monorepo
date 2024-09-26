const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

mongoose
  .connect(process.env.MONGOOSEDB_URL)
  .then(() => console.log("db connected"))
  .then((err) => {
    err;
  });

const databaseSeederQuestions = require("./databaseSeederQuestions");
const databaseSeederResults = require("./databaseSeederResults");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/seed", databaseSeederQuestions);
app.use("/api/seed", databaseSeederResults);

const questionRoutes = require("./routes/Questions");
const resultRoutes = require("./routes/Result");

app.use("/api/questions", questionRoutes);
app.use("/api/result", resultRoutes);

app.get("/", (req, res) => {
  res.send("app is f running");
});

app.listen(PORT || 9000, () => {
  console.log(`server is running on ${PORT}`);
});
