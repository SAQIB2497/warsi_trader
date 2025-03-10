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
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.set("trust proxy", 1);
app.use(
    cors({
        origin: "https://warsi-trader.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // ✅ This is important!
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);


// Add this after CORS setup
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Authorization");
    next();
});

app.use(express.json());
app.use(cookieParser());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");
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

app.get("/", (req, res) => res.send("Backend Running"));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));