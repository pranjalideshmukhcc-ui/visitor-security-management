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

// Get visitor by ID
router.get("/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: visitor,
    });
  } catch (error) {
    console.error("Get Visitor By ID Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch visitor",
      error: error.message,
    });
  }
});

// Update visitor
router.put("/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Update Visitor Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update visitor",
      error: error.message,
    });
  }
});

// Check-in visitor
router.post("/:id/check-in", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    visitor.checkInTime = new Date();
    visitor.status = "checked-in";

    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Visitor checked in successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Check-in Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to check in visitor",
      error: error.message,
    });
  }
});

// Check-out visitor
router.post("/:id/check-out", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    visitor.checkOutTime = new Date();
    visitor.status = "checked-out";

    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Visitor checked out successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Check-out Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to check out visitor",
      error: error.message,
    });
  }
});


module.exports = router;