const express = require('express');
const { register, login } = require('../controllers/auth');
const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', register);

// Route for user login
authRouter.post('/login', login);

module.exports = authRouter;