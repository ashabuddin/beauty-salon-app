const Booking = require("../models/Booking");
const { sendSMS } = require("../utils/sms");

// Controller to notify customer about booking confirmation
exports.notifyBookingConfirmation = async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findById(bookingId).populate("customer");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Send SMS notification
    const message = `Dear ${booking.customer.username}, your booking for ${booking.bookingDate} has been confirmed.`;
    await sendSMS(booking.customer.phone, message);

    res.json({
      message: "Booking confirmation notification sent successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to send SMS reminders one day before the booking date
exports.sendReminder = async (req, res) => {
  const { bookingId } = req.body;
  try {
    const booking = await Booking.findById(bookingId).populate("customer");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const bookingDate = new Date(booking.bookingDate);
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 1);

    if (bookingDate.toDateString() === reminderDate.toDateString()) {
      const message = `Reminder: Dear ${
        booking.customer.username
      }, you have a booking scheduled for tomorrow at ${bookingDate.toLocaleTimeString()}.`;
      await sendSMS(booking.customer.phone, message);
      res.json({ message: "Reminder sent successfully" });
    } else {
      res
        .status(400)
        .json({ message: "No bookings for tomorrow to send reminders" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
