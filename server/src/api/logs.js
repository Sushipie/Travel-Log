const { Router } = require("express");
const LogEntry = requrie("../models.LogEntry");

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "🎈",
  });
});

router.post("/", async (req, res) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
      console.log(error.constructor.name)
    next(error);
  }
});

module.exports = router;
