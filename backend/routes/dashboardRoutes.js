const express = require("express");

const {
  getDashboardStats,
  getRecentVisitors,
} = require("../controllers/dashboardController");

const router = express.Router();

// Dashboard statistics
router.get("/stats", getDashboardStats);

// Recent visitors
router.get("/recent-visitors", getRecentVisitors);

module.exports = router;
