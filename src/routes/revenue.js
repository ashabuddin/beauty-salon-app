const express = require("express");
const {
  addRevenue,
  getRevenueBySalon,
  getAllRevenue,
} = require("../controllers/revenue");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const revenueRouter = express.Router();

// Route to add a new revenue record
revenueRouter.post("/add", authMiddleware, roleMiddleware("Admin"), addRevenue);

// Route to get revenue records for a salon
revenueRouter.get(
  "/salon/:salonId",
  authMiddleware,
  roleMiddleware("Admin"),
  getRevenueBySalon
);

// Route to get all revenue records
revenueRouter.get(
  "/all",
  authMiddleware,
  roleMiddleware("Admin"),
  getAllRevenue
);

module.exports = revenueRouter;
