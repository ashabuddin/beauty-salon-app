const Billing = require("../models/Billing");
const { createPaymentIntent } = require("../utils/payment");

// Controller to create a payment intent
exports.createPayment = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await createPaymentIntent(amount);
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to handle successful payment
exports.paymentSuccess = async (req, res) => {
  const { paymentIntentId, customerId } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const billing = new Billing({
      customer: customerId,
      amount: paymentIntent.amount,
      paymentIntentId,
      status: paymentIntent.status,
    });
    await billing.save();
    res.status(201).json({ message: "Payment recorded successfully", billing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to get billing history
exports.getBillingHistory = async (req, res) => {
    try {
      const billingHistory = await Billing.find({ customer: req.user.id });
      res.json(billingHistory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };