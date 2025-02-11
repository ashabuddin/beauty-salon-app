const mongoose = require("mongoose");

// Define the billing schema
const billingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentIntentId: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Billing = mongoose.model("Billing", billingSchema);
module.exports = Billing;
