const Salon = require("../models/Salon");
const Service = require("../models/Service");
const Booking = require("../models/Booking");

// Controller to register a new salon
exports.registerSalon = async (req, res) => {
  const { name, address, phone } = req.body;
  try {
    const newSalon = new Salon({
      name,
      address,
      phone,
      owner: req.user.id,
    });
    await newSalon.save();
    res
      .status(201)
      .json({ message: "Salon registered successfully", newSalon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to add a new service to a salon
exports.addService = async (req, res) => {
  const { name, description, price, duration, salonId } = req.body;
  const userId = req.user.id;
  console.log("Id:",userId);
  try {
    const newService = new Service({
      name,
      description,
      price,
      duration,
      createdBy: req.user.id,
    });
    const service = await newService.save();
    const salon = await Salon.findById(salonId);
    console.log(salon)
    salon.services.push(service._id);
    await salon.save();
    res.status(201).json({ message: "Service added successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all services of a salon
exports.getSalonServices = async (req, res) => {
  try {
    const salon = await Salon.findById(req.params.salonId).populate("services");
    res.json(salon.services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to manage appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Booking.find({
      service: { $in: req.user.services },
    })
      .populate("service")
      .populate("customer");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get service history
exports.getServiceHistory = async (req, res) => {
  try {
    const history = await Booking.find({ service: { $in: req.user.services } })
      .populate("service")
      .populate("customer");
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
