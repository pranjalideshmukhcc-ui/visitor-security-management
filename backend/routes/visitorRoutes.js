const express = require("express");
const Visitor = require("../models/Visitor");

const router = express.Router();

// Register a new visitor
router.post("/", async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    res.status(201).json({
      success: true,
      message: "Visitor registered successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Register Visitor Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to register visitor",
      error: error.message,
    });
  }
});

// Get all visitors
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors,
    });
  } catch (error) {
    console.error("Get Visitors Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
});

module.exports = router;