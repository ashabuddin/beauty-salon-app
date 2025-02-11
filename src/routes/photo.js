const express = require("express");
const { uploadPhoto, getServicePhotos } = require("../controllers/photo");
const { authMiddleware, roleMiddleware } = require("../middleware/auth");
const upload = require("../config/multer");
const photoRouter = express.Router();

// Route to upload a photo
photoRouter.post(
  "/upload",
  authMiddleware,
  roleMiddleware("Owner"),
  upload.single("photo"),
  uploadPhoto
);

// Route to get photos for a service
photoRouter.get("/service/:serviceId", authMiddleware, getServicePhotos);

module.exports = photoRouter;
