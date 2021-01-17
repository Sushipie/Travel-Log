const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const middlewares = require("./middlewares");

const logs = require("./api/logs");
const logEntry = require("./models/LogEntry");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  const entries = await logEntry.find();
  res.json(entries);
});

app.use("/api/logs", logs);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
