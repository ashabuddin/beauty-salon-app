const Revenue = require("../models/Revenue");

// Controller to add a new revenue record
exports.addRevenue = async (req, res) => {
  const { salonId, type, amount } = req.body;
  try {
    const revenue = new Revenue({
      salon: salonId,
      type,
      amount,
    });
    await revenue.save();
    res.status(201).json({ message: "Revenue recorded successfully", revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Controller to get revenue records for a salon
exports.getRevenueBySalon = async (req, res) => {
  const { salonId } = req.params;
  try {
    const revenue = await Revenue.find({ salon: salonId });
    res.json(revenue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all revenue records
exports.getAllRevenue = async (req, res) => {
    try {
      const revenue = await Revenue.find().populate('salon', 'name');
      res.json(revenue);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  