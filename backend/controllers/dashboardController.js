const Visitor = require("../models/Visitor");

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalVisitorsToday = await Visitor.countDocuments({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const checkedIn = await Visitor.countDocuments({
      status: "checked-in",
    });

    const checkedOut = await Visitor.countDocuments({
      status: "checked-out",
    });

    const pendingApprovals = await Visitor.countDocuments({
      status: "pending",
    });

    res.status(200).json({
      success: true,
      data: {
        totalVisitorsToday,
        checkedIn,
        checkedOut,
        pendingApprovals,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
    });
  }
};

// Get recent visitors
const getRecentVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "name purpose hostName checkInTime checkOutTime status createdAt"
      );

    res.status(200).json({
      success: true,
      count: visitors.length,
      data: visitors,
    });
  } catch (error) {
    console.error("Recent Visitors Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent visitors",
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentVisitors,
};