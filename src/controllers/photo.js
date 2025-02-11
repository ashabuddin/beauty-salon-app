const Photo = require("../models/Photo");

// Controller to upload a photo
exports.uploadPhoto = async (req, res) => {
  const { description, serviceId } = req.body;
  const { path } = req.file;
  try {
    const photo = new Photo({
      url: path,
      description,
      uploadedBy: req.user.id,
      service: serviceId,
    });
    await photo.save();
    res.status(201).json({ message: "Photo uploaded successfully", photo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get photos for a service
exports.getServicePhotos = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const photos = await Photo.find({ service: serviceId }).populate(
      "uploadedBy",
      "username"
    );
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
