const express = require("express");
const Visitor = require("../models/Visitor");

const router = express.Router();

// Add a new visitor
router.post("/", async (req, res) => {
  try {
    const visitor = new Visitor(req.body);

    const savedVisitor = await visitor.save();

    res.status(201).json(savedVisitor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to register visitor",
      error: error.message,
    });
  }
});

// Get visitors with optional search and filters
router.get("/", async (req, res) => {
  try {
    const { search, status, date } = req.query;

    const filter = {};

    // Search by visitor name
    if (search) {
      filter.visitorName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      filter.visitDateTime = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const visitors = await Visitor.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitors",
      error: error.message,
    });
  }
});

// Get a single visitor by ID
router.get("/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found",
      });
    }

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch visitor",
      error: error.message,
    });
  }
});

module.exports = router;