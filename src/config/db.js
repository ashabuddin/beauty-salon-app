const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
// process.env.MONGO_URI

// Function to connect to MongoDB
const connectDb = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connected! ");
    })

    .catch((err) => {
      console.error(`Failed to connect database: ${err}`);
    });
};

module.exports = connectDb;
