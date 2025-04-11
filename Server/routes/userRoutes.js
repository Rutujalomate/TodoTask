const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ data: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// REGISTER a new user
router.post("/", async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        const userExist = await User.findOne({ userEmail });
        if (userExist) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        const newUser = new User({
            userName,
            userEmail,
            userPassword: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: "User registered successfully", data: savedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LOGIN a user
router.post("/login", async (req, res) => {
    const { userEmail, userPassword } = req.body;

    try {
        const user = await User.findOne({ userEmail });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(userPassword, user.userPassword);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ user: { id: user._id } }, 'secretekey', { expiresIn: "1d" });

        res.json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// UPDATE a user by ID
router.put("/:id", async (req, res) => {
    const { userName, userEmail, userPassword } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userName) user.userName = userName;
        if (userEmail) user.userEmail = userEmail;
        if (userPassword) {
            const saltRounds = 10;
            user.userPassword = await bcrypt.hash(userPassword, saltRounds);
        }

        const updatedUser = await user.save();
        res.json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
