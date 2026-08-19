const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    purpose: {
      type: String,
      required: true,
    },

    host: {
      type: String,
      required: true,
    },

    visitDateTime: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Checked-in", "Checked-out"],
      default: "Pending",
    },

    checkInTime: {
      type: Date,
    },

    checkOutTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visitor", visitorSchema);