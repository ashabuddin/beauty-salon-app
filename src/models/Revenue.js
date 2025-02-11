const mongoose = require("mongoose");

// Define the revenue schema
const revenueSchema = new mongoose.Schema({
  salon: { type: mongoose.Schema.Types.ObjectId, ref: "Salon", required: true },
  type: {
    type: String,
    enum: ["Listing", "Commission", "Subscription", "Advertisement"],
    required: true,
  },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Revenue = mongoose.model("Revenue", revenueSchema);
module.exports = Revenue;
