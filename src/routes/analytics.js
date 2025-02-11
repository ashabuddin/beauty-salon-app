const express = require("express");
const {
  getUserActivityReport,
  getRevenueReport,
  getBookingReport,
  getSalonReport,
} = require("../controllers/analytics");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const analyticsRouter = express.Router();

// Route to get user activity report
analyticsRouter.get(
  "/user-activity",
  authMiddleware,
  roleMiddleware("Admin"),
  getUserActivityReport
);

// Route to get revenue report
analyticsRouter.get(
  "/revenue",
  authMiddleware,
  roleMiddleware("Admin"),
  getRevenueReport
);

// Route to get booking report
analyticsRouter.get(
  "/bookings",
  authMiddleware,
  roleMiddleware("Admin"),
  getBookingReport
);

// Route to get salon report
analyticsRouter.get(
  "/salons",
  authMiddleware,
  roleMiddleware("Admin"),
  getSalonReport
);

module.exports = analyticsRouter;
