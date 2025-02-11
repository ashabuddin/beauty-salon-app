const mongoose = require("mongoose");

// Define the photo schema
const photoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
