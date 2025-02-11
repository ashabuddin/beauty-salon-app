const User = require("../models/User");
const Booking = require("../models/Booking");
const Revenue = require("../models/Revenue");
const Salon = require("../models/Salon");

// Controller to get user activity report
exports.getUserActivityReport = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const revenueCount = await Revenue.countDocuments();

    res.json({
      userCount,
      bookingCount,
      revenueCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get revenue report
exports.getRevenueReport = async (req, res) => {
  try {
    const revenue = await Revenue.aggregate([
      {
        $group: {
          _id: "$type",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get booking report
exports.getBookingReport = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$bookingDate" },
            month: { $month: "$bookingDate" },
          },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get salon report
exports.getSalonReport = async (req, res) => {
  try {
    const salonCount = await Salon.countDocuments();
    const activeSalons = await Salon.find({
      status: "Active",
    }).countDocuments();

    res.json({
      salonCount,
      activeSalons,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
