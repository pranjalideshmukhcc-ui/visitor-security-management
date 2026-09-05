const express = require("express");
const router = express.Router();
const Visitor = require("../models/Visitor");

// GET all records
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

    // Filter by visit date
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      filter.visitDateTime = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const records = await Visitor.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch records",
      error: error.message,
    });
  }
});

// GET single record
router.get("/:id", async (req, res) => {
  try {
    const record = await Visitor.findById(req.params.id);

    if (!record) {
      return res.status(404).json({
        message: "Record not found",
      });
    }

    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch record",
      error: error.message,
    });
  }
});

module.exports = router;