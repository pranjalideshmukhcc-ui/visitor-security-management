const express = require("express");
const Settings = require("../models/Settings");

const router = express.Router();

// Get system settings
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch settings",
      error: error.message,
    });
  }
});

// Update system settings
router.put("/", async (req, res) => {
  try {
    const {
      organizationName,
      visitorPassValidity,
      notifications,
      autoApproval,
      autoCheckout,
    } = req.body;

    let settings = await Settings.findOne();

    // Create settings if none exist
    if (!settings) {
      settings = new Settings();
    }

    if (organizationName !== undefined) {
      settings.organizationName = organizationName;
    }

    if (visitorPassValidity !== undefined) {
      settings.visitorPassValidity = visitorPassValidity;
    }

    if (notifications !== undefined) {
      settings.notifications = notifications;
    }

    if (autoApproval !== undefined) {
      settings.autoApproval = autoApproval;
    }

    if (autoCheckout !== undefined) {
      settings.autoCheckout = autoCheckout;
    }

    const updatedSettings = await settings.save();

    res.status(200).json({
      message: "Settings updated successfully",
      settings: updatedSettings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update settings",
      error: error.message,
    });
  }
});

module.exports = router;