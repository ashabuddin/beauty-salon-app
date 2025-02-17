const Service = require("../models/Service");
const Booking = require("../models/Booking");
const redisClient = require("../config/redis");

// Controller to create services

// Controller to get all services
// exports.getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find().populate('createdBy', 'email');
//     res.json(services);
//   } catch (error) {

//     res.status(500).json({ error: error.message });
//   }
// };
exports.getAllServices = async (req, res) => {
  redisClient.get("services", async (err, services) => {
    if (err) throw err;

    if (services) {
      res.json(JSON.parse(services));
    } else {
      const services = await Service.find().populate("createdBy", "username");
      redisClient.setex("services", 3600, JSON.stringify(services));
      res.json(services);
    }
  });
};

// Controller to book a service
exports.bookService = async (req, res) => {
  const { serviceId, bookingDate } = req.body;
  try {
    const booking = new Booking({
      service: serviceId,
      customer: req.user.id,
      bookingDate,
    });
    await booking.save();
    res.status(201).json({ message: "Service booked successfully", booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get customer bookings
exports.getCustomerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ customer: req.user.id }).populate(
      "service"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
