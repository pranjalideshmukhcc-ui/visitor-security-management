const express = require("express");
const router = express.Router();
const Host = require("../models/Host");

// GET all hosts
router.get("/", async (req, res) => {
  try {
    const hosts = await Host.find().sort({ createdAt: -1 });
    res.status(200).json(hosts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hosts" });
  }
});

// GET single host
router.get("/:id", async (req, res) => {
  try {
    const host = await Host.findById(req.params.id);

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }

    res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch host" });
  }
});

// POST add host
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, department, status } = req.body;

    const existingHost = await Host.findOne({ email });

    if (existingHost) {
      return res.status(400).json({ message: "Host already exists" });
    }

    const host = new Host({
      name,
      email,
      phone,
      department,
      status,
    });

    const savedHost = await host.save();

    res.status(201).json(savedHost);
  } catch (error) {
    res.status(500).json({ message: "Failed to add host" });
  }
});

// PUT update host
router.put("/:id", async (req, res) => {
  try {
    const host = await Host.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }

    res.status(200).json(host);
  } catch (error) {
    res.status(500).json({ message: "Failed to update host" });
  }
});

// DELETE host
router.delete("/:id", async (req, res) => {
  try {
    const host = await Host.findByIdAndDelete(req.params.id);

    if (!host) {
      return res.status(404).json({ message: "Host not found" });
    }

    res.status(200).json({ message: "Host deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete host" });
  }
});

module.exports = router;