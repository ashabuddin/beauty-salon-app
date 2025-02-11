const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const router = require("./routes/index");
const bodyParser = require("body-parser");

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//  routes
app.use("/api/v1", router);

// Universal Error handler
app.use((error, _req, res, _next) => {
    const errorObj = {
      message: error?.message || "Somethings Went Wrong",
      status: error?.status || 500,
    };
  
    res.status(errorObj.status).json(errorObj);
  });
// Connect to MongoDB
connectDB();
// Define the port the server will listen on
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(` server is running on port : ${PORT} `);
  });



