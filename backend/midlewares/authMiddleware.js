import jwt from "jsonwebtoken";

// Middleware to check if user is authenticated
export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token provided" });
        }

        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user role directly from token
        req.user = { id: decoded.id, role: decoded.role };

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