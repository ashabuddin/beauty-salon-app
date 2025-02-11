const mongoose = require("mongoose");

// Define the service schema
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  }, // Reference to the salon owner
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
