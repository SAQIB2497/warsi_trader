import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { authMiddleware, adminMiddleware } from "../midlewares/authMiddleware.js";

const router = express.Router();

// Admin registration
router.post("/register", registerAdmin);

// Admin login (Fix: Add this line)
router.post("/login", loginAdmin);

// Protected admin route (only accessible if logged in)
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: "Welcome, Admin!", admin: req.user });
});

export default router;
