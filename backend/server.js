import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import Stripe from 'stripe';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB Atlas");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/payments', paymentRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});