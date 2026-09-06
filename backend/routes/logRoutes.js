const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

// GET all logs
router.get("/", async (req, res) => {
  try {
    const { action, performedBy } = req.query;

    const filter = {};

    if (action) {
      filter.action = {
        $regex: action,
        $options: "i",
      };
    }

    if (performedBy) {
      filter.performedBy = {
        $regex: performedBy,
        $options: "i",
      };
    }

    const logs = await Log.find(filter).sort({
      timestamp: -1,
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch logs",
      error: error.message,
    });
  }
});

// GET single log
router.get("/:id", async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);

    if (!log) {
      return res.status(404).json({
        message: "Log not found",
      });
    }

    res.status(200).json(log);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch log",
      error: error.message,
    });
  }
});

// ADD a new log
router.post("/", async (req, res) => {
  try {
    const log = new Log(req.body);

    const savedLog = await log.save();

    res.status(201).json(savedLog);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create log",
      error: error.message,
    });
  }
});

module.exports = router;