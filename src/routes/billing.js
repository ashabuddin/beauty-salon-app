const express = require("express");
const {
  createPayment,
  paymentSuccess,
  getBillingHistory,
} = require("../controllers/billing");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const billingRouter = express.Router();

// Route to create a payment intent
billingRouter.post(
  "/create-payment",
  authMiddleware,
  roleMiddleware("Customer"),
  createPayment
);

// Route to handle successful payment
billingRouter.post(
  "/payment-success",
  authMiddleware,
  roleMiddleware("Customer"),
  paymentSuccess
);

// Route to get billing history
billingRouter.get(
  "/billing-history",
  authMiddleware,
  roleMiddleware("Customer"),
  getBillingHistory
);

module.exports = billingRouter;
