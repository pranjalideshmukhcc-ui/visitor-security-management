const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const dashboardRoutes = require("./routes/dashboardRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const approvalRoutes = require("./routes/approvalRoutes");
const logRoutes = require("./routes/logRoutes");
const hostRoutes = require("./routes/hostRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Visitor routes
app.use("/api/visitors", visitorRoutes);

// Approval routes
app.use("/api/approvals", approvalRoutes);

// Log routes
app.use("/api/logs", logRoutes);

// Host routes
app.use("/api/hosts", hostRoutes);

// User routes
app.use("/api/users", userRoutes);

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/hosts", hostRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Visitor & Security Management API is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
