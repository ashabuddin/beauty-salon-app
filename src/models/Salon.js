const mongoose = require("mongoose");

// Define the salon schema
const salonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
});

const Salon = mongoose.model("Salon", salonSchema);
module.exports = Salon;
