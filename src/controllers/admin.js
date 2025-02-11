const User = require('../models/User');
const Salon = require('../models/Salon');
const Booking = require('../models/Booking');

// Controller to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all salons
exports.getAllSalons = async (req, res) => {
    try {
      const salons = await Salon.find().populate('owner', 'email');
      res.json(salons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Controller to approve or disapprove a salon
exports.approveSalon = async (req, res) => {
    const { salonId, approved } = req.body;
    try {
      const salon = await Salon.findById(salonId);
      if (!salon) {
        return res.status(404).json({ error: 'Salon not found' });
      }
      salon.approved = approved;
      await salon.save();
      res.json({ message: `Salon ${approved ? 'approved' : 'disapproved'} successfully`, salon });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Controller to get all bookings
exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find().populate('service customer');
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // Controller to manage payments

  