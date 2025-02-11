const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { hashPassword, isPassMatched } = require("../utils/hashPass");

// Controller for user registration
exports.register = async (req, res) => {
  const { name, email, password,role } = req.body;
  try {
    const hashedPassword =await hashPassword(password);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      // role:role
     
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Invalid login credentials' });
    }
    const isMatch = await isPassMatched(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};