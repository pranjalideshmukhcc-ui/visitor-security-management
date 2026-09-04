const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      default: "Secure-Pass Campus",
      trim: true,
    },

    visitorPassValidity: {
      type: String,
      enum: ["1 Day", "7 Days", "30 Days"],
      default: "1 Day",
    },

    notifications: {
      type: Boolean,
      default: true,
    },

    autoApproval: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);