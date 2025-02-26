import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js"; // Import Admin model

// Middleware to check if user is authenticated
export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token; // Try to get token from cookies

        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // If token is not in cookies, try to get it from Authorization header
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user is in the User collection
        let user = await User.findById(decoded.id).select("-password");

        // If not found in User, check in Admin collection
        let admin = await Admin.findById(decoded.id).select("-password");

        if (!user && !admin) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user || admin; // Assign whichever is found
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
};

// Middleware to check if user is an admin
export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
};
