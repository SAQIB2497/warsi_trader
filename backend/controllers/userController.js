import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const assignedRole = role === "admin" ? "admin" : "user";

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role: assignedRole });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            domain: process.env.NODE_ENV === "production"
                ? "warsitrader-production.up.railway.app" // Exact production domain
                : undefined, // Remove domain for localhost
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        console.log("✅ Token set in cookie:", token);

        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Logout User
export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            domain: process.env.NODE_ENV === "production"
                ? "warsitrader-production.up.railway.app"
                : undefined,
            expires: new Date(0)
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Get Current User
export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({ message: "Not authenticated" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("🔵 Token expiry time:", new Date(decoded.exp * 1000)); // Debugging

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({ message: "Token expired" });
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error: error.message });
    }
};
