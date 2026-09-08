const express = require("express");
const Visitor = require("../models/Visitor");

const router = express.Router();

// Get all pending visitor approval requests
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find({ status: "pending" })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors,
    });
  } catch (error) {
    console.error("Get Approval Requests Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch approval requests",
      error: error.message,
    });
  }
});

// Approve a visitor
router.put("/:id/approve", async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
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
      message: "Visitor approved successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Approve Visitor Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to approve visitor",
      error: error.message,
    });
  }
});

// Reject a visitor
router.put("/:id/reject", async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
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
      message: "Visitor rejected successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Reject Visitor Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to reject visitor",
      error: error.message,
    });
  }
});

module.exports = router;