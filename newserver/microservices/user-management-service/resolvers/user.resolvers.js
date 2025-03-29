
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const resolvers = {
    Query: {
        // Fetch all users
        users: async () => await User.find(),

        // Fetch a user by ID
        user: async (_, { id }) => await User.findById(id),
    },

    Mutation: {
        // Register a new user
        registerUser: async (_, { username, email, password, role }) => {
            const existingUser = await User.findOne({ username });
            if (existingUser) throw new Error("User already exists");

            if (!password) throw new Error("Password is required");

            const hashedPassword = await bcrypt.hash(password.trim(), 10);

            const user = new User({ username, email, password: hashedPassword, role });
            await user.save();

            return user;
        },

        // Login user and set JWT cookie
        loginUser: async (_, { username, password }, { res }) => {
            const user = await User.findOne({ username });
            if (!user) throw new Error("User not found");

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) throw new Error("Invalid credentials");

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000
            });

            return { message: "Logged in successfully", user };
        },

        // Logout user (clear JWT cookie)
        logoutUser: (_, __, { res }) => {
            res.clearCookie('token');
            return { message: "Logged out successfully" };
        },
    }
};

module.exports = resolvers;
